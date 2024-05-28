import { z } from 'zod';

export default z.object({
  content: z.string({
    required_error: {
      value: "The field 'content' is required.",
      code: 'contentRequired',
    },
    invalid_type_error: "The field 'content' must be a string.",
  })
    .trim() // Supprime les espaces, tabulations et sauts de ligne au début et à la fin
    .min(1, {
      message: {
        value: "The field 'content' must be at least 1 character long.",
        code: 'contentTooShort',
      },
    }),

  roomId: z.number({
    required_error: {
      value: "The field 'roomId' is required.",
      code: 'roomIdRequired',
    },
    invalid_type_error: "The field 'roomId' must be a number.",
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
