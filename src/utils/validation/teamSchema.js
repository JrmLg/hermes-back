import { z } from 'zod';

export default z.object({
  ownerId: z
    .number({
      required_error: {
        value: "The field 'ownerId' is required.",
        code: 'ownerIdRequired',
      },
    }).int({
      invalid_type_error: "The field 'ownerId' must be a int.",
    }),
  name: z
    .string({
      required_error: {
        value: "The field 'name' is required.",
        code: 'nameRequired',
      },
      invalid_type_error: "The field 'name' must be a string.",
    })
    .min(2, {
      message: {
        value: "The field 'name' must be at least 2 characters long.",
        code: 'nameTooShort',
      },
    }),
  color: z
    .string({
      invalid_type_error: "The field 'color' must be a string.",
    })
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
      message: {
        value: "The field 'color' must be in hexadecimal format including the #",
        code: 'colorInHexadecimal',
      },
    })
    .optional(),
  profilePictureUrl: z
    .string({
      invalid_type_error: "The field 'profilePictureUrl' must be a string.",
    }).url({
      message: {
        value: "The field 'profilePictureUrl' must be a valid url address.",
        code: 'profilePictureUrlInvalid',
      },
    }).optional(),
});
