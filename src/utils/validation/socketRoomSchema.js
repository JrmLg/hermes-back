import { z } from 'zod';

export default z.object({
  roomId: z.number({
    required_error: {
      value: "The field 'roomId' is required.",
      code: 'roomIdRequired',
    },
    invalid_type_error: "The field 'roomId' must be a string.",
  })
    .min(1, {
      message: {
        value: "The field 'roomId' must be at least 1 character long.",
        code: 'roomIdTooShort',
      },
    }),

  roomType: z.string({
    required_error: {
      value: "The field 'roomType' is required.",
      code: 'roomTypeRequired',
    },
    invalid_type_error: "The field 'roomType' must be a string.",
  })
    .regex(/team|private|channel/, {
      message: {
        value: "The field 'roomType' must be either 'team', 'private', or 'channel'.",
        code: 'roomTypeInvalid',
      },
    }),
});
