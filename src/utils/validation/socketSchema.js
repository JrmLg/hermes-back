import { z } from 'zod';

export default z
  .object({
    socketId: z.string({
      required_error: {
        value: "The field 'socketId' is required.",
        code: 'socketIdRequired',
      },
      invalid_type_error: "The field 'socketId' must be a string.",
    }),
  })
  .strict();
