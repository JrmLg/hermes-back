import mongoClient from '../../models/mongoClient.js';

import teamService from './messageServices/messageTeamService.js';
import privateService from './messageServices/messagePrivateService.js';
import channelService from './messageServices/messageChannelService.js';

import getObjectIdFromTimestamp from '../../utils/formatingFunctions/getObjectIdFromTimestamp.js';
import getDateFromMongoObject from '../../utils/formatingFunctions/getDateFromMongoObject.js';

const roomService = {
  team: teamService,
  private: privateService,
  channel: channelService,

  checkInvalidRoomType(roomType) {
    if (!this[roomType]) {
      throw new Error(`Invalid room type provided: ${roomType}`);
    }
  },

  /**
   * Get messages from a room with pagination.
   *
   * @param {string} roomType The type of the room
   * @param {number} roomId The ID of the room to get the messages from
   * @param {number} page The page number to get
   * @param {number} pageSize The number of messages per page
   * @param {number} originTimestamp The timestamp to get messages before
   *
   * */
  async getMessagesWithPagination({
    roomType,
    roomId,
    page = 1,
    pageSize = 50,
    originTimestamp = Date.now(),
    timelineDirection = 'older',
  }) {
    this.checkInvalidRoomType(roomType);
    const { roomIdField } = this[roomType];

    const totalMessages = await mongoClient.message.count({
      where: {
        [roomIdField]: roomId,
      },
    });

    // Définition de la direction de la timeline, par défaut on récupère les messages plus anciens
    let direction = 'lt';

    // Si 'newer' est passé en paramètre, on récupère les messages plus récents
    if (timelineDirection === 'newer') {
      direction = 'gt';
    }

    const totalPages = Math.ceil(totalMessages / pageSize);
    const offset = (page - 1) * pageSize;
    const originObjectId = getObjectIdFromTimestamp(originTimestamp);

    let messages = await mongoClient.message.findMany({
      where: {
        [roomIdField]: roomId,
        id: {
          [direction]: originObjectId,
        },
      },
      // Pagination requires descending order
      orderBy: { id: 'desc' },
      skip: offset,
      take: pageSize,
    });

    if (messages?.length) {
      // Reverse the order to have the messages in ascending order
      messages.reverse();

      // Format messages
      messages = messages.map((message) => ({
        id: message.id,
        [roomIdField]: roomId,
        authorId: message.authorId,
        content: message.deleted ? 'This message has been deleted' : message.content,
        date: getDateFromMongoObject(message),
        deleted: message.deleted,
        updatedAt: message.updatedAt,
      }));
    }

    return {
      messages,
      pagination: {
        page,
        pageSize,
        totalPages,
        totalMessages,
        originTimestamp,
      },
    };
  },

  /**
   * Send a message to a room, this function don't check if the user can access the room
   *
   * @param {string} roomType The type of the room
   * @param {number} authorId The ID of the user sending the message
   * @param {number} roomId The ID of the room to send the message to
   * @param {string} content The content of the message
   * @returns {Promise<object>} The created message
   * */
  async createMessage({ roomType, roomId, authorId, content }) {
    this.checkInvalidRoomType(roomType);
    const { roomIdField } = this[roomType];

    const newMessage = await mongoClient.message.create({
      data: {
        [roomIdField]: roomId,
        authorId,
        content,
        deleted: false,
      },
    });

    return {
      ...newMessage,
      date: getDateFromMongoObject(newMessage),
    };
  },

  /**
   * Update a message from a room, this function don't check if the user can access the room
   *
   * @param {number} messageId The ID of the message to update
   * @param {number} authorId The ID of the author of the message
   * @param {string} content The new content of the message
   * */
  async updateMessage({ messageId, authorId, content }) {
    const message = await mongoClient.message.findFirst({
      where: {
        id: messageId,
        authorId,
      },
    });

    if (!message) {
      return null;
    }

    const updatedMessage = await mongoClient.message.update({
      where: { id: message.id },
      data: { content, updatedAt: new Date() },
    });

    return {
      ...updatedMessage,
      date: getDateFromMongoObject(updatedMessage),
    };
  },

  /**
   * Delete a message from a room, this function don't check if the user can access the room
   *
   * @param {number} messageId The ID of the message to delete
   * @param {number} authorId The ID of the author of the message
   * @returns {Promise<deletedMessage>|null}
   * */
  async deleteMessage({ messageId, authorId }) {
    const message = await mongoClient.message.findFirst({
      where: {
        id: messageId,
        authorId,
      },
    });

    if (!message) {
      return null;
    }

    const deletedMessage = await mongoClient.message.update({
      where: { id: messageId },
      data: { deleted: true, updatedAt: new Date() },
    });

    deletedMessage.content = 'This message has been deleted';

    return deletedMessage;
  },

  /**
   * Update the last message read by a user in a room
   *
   * @param {string} roomType The type of the room
   * @param {number} roomId The ID of the room
   * @param {number} userId The ID of the user reading the message
   * @param {number} messageId The ID of the last message read
   * */
  async updateLastMessageRead({ roomType, roomId, userId, messageId }) {
    this.checkInvalidRoomType(roomType);
    const { roomIdField } = this[roomType];

    const lastMessageRead = await mongoClient.lastMessageRead.findFirst({
      where: {
        [roomIdField]: roomId,
        readerId: userId,
      },
    });

    if (lastMessageRead) {
      return mongoClient.lastMessageRead.update({
        where: { id: lastMessageRead.id },
        data: { messageId },
      });
    }

    return mongoClient.lastMessageRead.create({
      data: {
        [roomIdField]: roomId,
        readerId: userId,
        messageId,
      },
    });
  },

  /**
   * Return a boolean indicating if a user can access a room
   * */
  async canAccessRoom({ roomType, roomId, userId }) {
    this.checkInvalidRoomType(roomType);
    return this[roomType].canAccessRoom({ userId, roomId });
  },

  /**
   * Get the information of a room
   *
   * @param {string} roomType The type of the room
   * @param {number} roomId The ID of the room
   * @param {number} userId The ID of the user
   * */
  async getRoomInfo({ roomType, roomId, userId }) {
    this.checkInvalidRoomType(roomType);

    const { roomIdField } = this[roomType];

    let lastMessage = await mongoClient.message.findFirst({
      where: { [roomIdField]: roomId },
      select: {
        id: true,
        [roomIdField]: true,
        content: true,
        authorId: true,
        updatedAt: true,
      },
      orderBy: { id: 'desc' },
    });

    if (lastMessage) {
      let date;
      if (lastMessage.updatedAt) {
        date = lastMessage.updatedAt;
      } else {
        date = getDateFromMongoObject(lastMessage);
      }
      lastMessage = {
        ...lastMessage,
        date,
      };
    }

    const lastMessageRead = await mongoClient.lastMessageRead.findFirst({
      where: {
        [roomIdField]: roomId,
        readerId: userId,
      },
    });

    let unreadMessagesCount = 0;
    if (lastMessageRead) {
      if (lastMessageRead.deleted) {
        lastMessage = {
          ...lastMessage,
          content: 'This message has been deleted',
        };
      }
      unreadMessagesCount = await mongoClient.message.count({
        where: {
          id: { gt: lastMessageRead.messageId },
          [roomIdField]: roomId,
        },
      });
    }

    const totalMessages = await mongoClient.message.count({
      where: { [roomIdField]: roomId },
    });

    return {
      lastMessage,
      unreadMessagesCount,
      totalMessages,
    };
  },
};

export default roomService;
