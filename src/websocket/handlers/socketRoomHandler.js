import socketRoomSchema from '../../utils/validation/socketRoomSchema.js';
import messageService from '../../services/message/messageService.js';

function joinRoom(io, socket, socketRoomId, roomName, roomArgs, callback) {
  const { user } = socket.locals;
  socket.join(socketRoomId);

  socket.to(socketRoomId).emit('userJoinRoom', {
    room: { roomName, roomArgs },
    user,
  });

  console.log(`${user.id} has join '${socketRoomId}'`);

  callback({
    success: true,
    message: `${user.id} has join '${socketRoomId}'`,
  });
}

function leaveRoom(io, socket, socketRoomId, roomName, roomArgs, callback) {
  const { user } = socket.locals;
  socket.leave(socketRoomId);

  socket.to(socketRoomId).emit('userLeaveRoom', {
    room: { roomName, roomArgs },
    user,
  });

  console.log(`${user.id} has left '${socketRoomId}'`);

  callback({
    success: true,
    message: `${user.id} has left '${socketRoomId}'`,
  });
}

export default {
  joinMessageRoom(io, socket) {
    return async (args, callback) => {
      const { user } = socket.locals;
      const { roomType, roomId } = args;

      const { success, data, error } = socketRoomSchema.safeParse({ roomType, roomId });
      if (!success) {
        if (callback) {
          callback({
            success: false,
            message: 'Schema validation error.',
            error: error.errors,
          });
        }
        return;
      }

      const canAccessRoom = await messageService.canAccessRoom({
        roomType,
        roomId,
        userId: user.id,
      });

      if (!canAccessRoom) {
        if (callback) {
          callback({
            success: false,
            message: 'You are not allowed to access this room',
          });
        }
        return;
      }

      const roomName = 'message';
      const roomArgs = data;
      const roomSocketId = `${roomName}:${roomType}:${roomId}`;

      joinRoom(io, socket, roomSocketId, roomName, roomArgs, callback);
    };
  },

  leaveMessageRoom(io, socket) {
    return ({ roomType, roomId }, callback) => {
      const { success, data, error } = socketRoomSchema.safeParse({ roomId, roomType });

      if (!success) {
        if (callback) {
          callback({
            success: false,
            message: 'Schema validation error.',
            errors: error.errors,
          });
        }
        return;
      }

      const roomName = 'message';
      const roomArgs = { data };
      const socketRoomId = `${roomName}:${roomType}:${roomId}`;
      leaveRoom(io, socket, socketRoomId, roomName, roomArgs, callback);
    };
  },

  listRooms(io, socket) {
    return () => {
      const { user } = socket.locals;

      const roomList = socket.rooms;
      console.log(`userId = ${user.id}, roomList = `, roomList);

      socket.to('roomList').emit(roomList);
    };
  },
};
