export default {
  channelListWithLastMessage: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'The auto-generated id for the channel.' },
        patientId: { type: 'integer', description: 'The id of the patient associated with the channel.' },
        channelTypeId: { type: 'integer', description: 'The id of the channel type.' },
        channelType: {
          type: 'object',
          properties: {
            id: { type: 'integer', description: 'The auto-generated id for the channel type.' },
            name: { type: 'string', description: 'The name of the channel type.' },
            color: { type: 'string', description: 'The color associated with the channel type.' },
            order: { type: 'integer', description: 'The order of the channel type.' },
          },
        },
        lastMessage: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The auto-generated id for the last message.' },
            channelId: { type: 'integer', description: 'The id of the channel associated with the last message.' },
            content: { type: 'string', description: 'The content of the last message.' },
            authorId: { type: 'integer', description: 'The id of the author of the last message.' },
          },
        },
        unreadMessagesCount: { type: 'integer', description: 'The number of unread messages in the channel.' },
        totalMessages: { type: 'integer', description: 'The total number of messages in the channel.' },
      },
    },
    example: [
      {
        id: 1,
        patientId: 1,
        channelTypeId: 1,
        channelType: {
          id: 1,
          name: 'Pharmacy',
          color: '#a742f5',
          order: 1,
        },
        lastMessage: {
          id: '6617f2998d0f328652b28991',
          channelId: 1,
          content: 'Test de bob',
          authorId: 2,
        },
        unreadMessagesCount: 2,
        totalMessages: 3,
      },
      {
        id: 2,
        patientId: 1,
        channelTypeId: 2,
        channelType: {
          id: 2,
          name: 'General',
          color: '#f54242',
          order: 2,
        },
        lastMessage: {
          id: '6617f2a28d0f328652b28993',
          channelId: 2,
          content: 'Nouveau tes tde bob',
          authorId: 2,
        },
        unreadMessagesCount: 1,
        totalMessages: 2,
      },
    ],
  },
};
