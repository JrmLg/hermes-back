import { z } from 'zod';

export default z.object({
  email: z
    .string({
      required_error: {
        value: "The field'email' is required.",
        code: 'emailRequired',
      },
      invalid_type_error: "The field 'email' must be a string.",
    })
    .email({
      message: {
        value: "The field 'email' must be a valid email address.",
        code: 'emailInvalid',
      },
    }),

  firstname: z
    .string({
      required_error: {
        value: "The field'firstname' is required.",
        code: 'firstnameRequired',
      },
      invalid_type_error: "The field 'firstname' must be a string.",
    })
    .min(2, {
      message: {
        value: "The field 'firstname' must be at least 2 characters long.",
        code: 'firstnameTooShort',
      },
    }),

  lastname: z
    .string({
      required_error: {
        value: "The field 'lastname' is required.",
        code: 'lastnameRequired',
      },
      invalid_type_error: "The field 'lastname' must be a string.",
    })
    .min(2, {
      message: {
        value: "The field 'lastname' must be at least 2 characters long.",
        code: 'lastnameTooShort',
      },
    }),

  password: z
    .string({
      required_error: {
        value: "The field 'password' is required.",
        code: 'passwordRequired',
      },
      invalid_type_error: "The field 'password' must be a string.",
    })
    .regex(/[A-Z]/, {
      message: {
        value: "The field 'password' must contain at least 1 uppercase letter.",
        code: 'uppercaseRequired',
      },
    })
    .regex(/[a-z]/, {
      message: {
        value: "The field 'password' must contain at least 1 lowercase letter.",
        code: 'lowercaseRequired',
      },
    })
    .regex(/[0-9]/, {
      message: {
        value: "The field 'password' must contain at least 1 number.",
        code: 'numberRequired',
      },
    })
    .regex(/[#?!@$ %^&*-]/, {
      message: {
        value: "The field 'password' must contain a special character like [#, ?, !, @, $, %, ^, &, *, -] .",
        code: 'specialCharacterRequired',
      },
    })
    .min(8, {
      message: {
        value: "The field 'password' must be at least 8 characters long.",
        code: 'passwordTooShort',
      },
    }),

  rppsCode: z
    .string({
      invalid_type_error: "The field 'rppsCode' must be a string.",
    })
    .length(11, {
      message: {
        value: "The field 'rppsCode' must contain 11 digits.",
        code: 'rppsCodeLength',
      },
    })
    .regex(/^\d{11}$/, {
      message: {
        value: "The field 'rppsCode' must contain digits only",
        code: 'rppsCodeDigits',
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
}).strict();
