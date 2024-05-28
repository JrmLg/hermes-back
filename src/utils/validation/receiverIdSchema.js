import { z } from 'zod';

export default z.object({
  receiverId: z.number({
    required_error: {
      value: "The field 'receiverId' is required.",
      code: 'receiverIdRequired',
    },
    invalid_type_error: "The field 'receiverId' must be a number.",
  })
    .min(1, {
      message: {
        value: "The field 'receiverId' must be at least 1 character long.",
        code: 'receiverIdTooShort',
      },
    }),
});
