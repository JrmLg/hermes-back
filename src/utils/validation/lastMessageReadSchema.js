import { z } from 'zod';

export default z.object({
  messageId: z.string({
    required_error: {
      value: "The field 'messageId' is required.",
      code: 'messageIdRequired',
    },
    invalid_type_error: "The field 'messageId' must be a string.",
  })
    .regex(/^[a-f0-9]{24}$/, {
      message: {
        value: "The field 'messageId' must contain 24 characters hexadecimal string value.",
        code: 'messageIdInvalid',
      },
    }),

  channelId: z.number({
    required_error: {
      value: "The field 'channelId' is required.",
      code: 'channelIdRequired',
    },
    invalid_type_error: "The field 'channelId' must be a number.",
  })
    .min(1, {
      message: {
        value: "The field 'channelId' must be at least 1 character long.",
        code: 'channelIdTooShort',
      },
    })
    .optional(),

  teamId: z.number({
    required_error: {
      value: "The field 'teamId' is required.",
      code: 'teamIdRequired',
    },
    invalid_type_error: "The field 'teamId' must be a number.",
  })
    .min(1, {
      message: {
        value: "The field 'teamId' must be at least 1 character long.",
        code: 'teamIdTooShort',
      },
    })
    .optional(),

  privateId: z.number({
    required_error: {
      value: "The field 'privateId' is required.",
      code: 'privateIdRequired',
    },
    invalid_type_error: "The field 'privateId' must be a number.",
  })
    .min(1, {
      message: {
        value: "The field 'privateId' must be at least 1 character long.",
        code: 'privateIdTooShort',
      },
    })
    .optional(),
});
