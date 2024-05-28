import { z } from 'zod';

export default z.object({
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

  birthdate: z
    .string({
      required_error: {
        value: "The field 'birthdate' is required.",
        code: 'birthdateRequired',
      },
      invalid_type_error: "The field 'birthdate' must be a string.",
    })
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
      message: {
        value: "The field 'birthdate' must be a valid date : **/**/****.",
        code: 'birthdateInvalid',
      },
    }),

  socialSecurityNumber: z
    .string({
      required_error: {
        value: "The field 'socialSecurityNumber' is required.",
        code: 'socialSecurityNumberRequired',
      },
      invalid_type_error: "The field 'socialSecurityNumber' must be a string.",
    })
    .regex(/^\d{15}$/, {
      message: {
        value: "The field 'socialSecurityNumber' must be a valid social security number.",
        code: 'socialSecurityNumberInvalid',
      },
    }),

  phoneNumber: z
    .string({
      required_error: {
        value: "The field 'phoneNumber' is required.",
        code: 'phoneNumberRequired',
      },
      invalid_type_error: "The field 'phoneNumber' must be a string.",
    })
    .regex(/^\d{10}$/, {
      message: {
        value: "The field 'phoneNumber' must be a valid phone number.",
        code: 'phoneNumberInvalid',
      },
    }),

  email: z
    .string({
      required_error: {
        value: "The field 'email' is required.",
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

  address: z
    .string({
      required_error: {
        value: "The field 'address' is required.",
        code: 'addressRequired',
      },
      invalid_type_error: "The field 'address' must be a string.",
    })
    .min(2, {
      message: {
        value: "The field 'address' must be at least 2 characters long.",
        code: 'addressTooShort',
      },
    }),

  zipCodeId: z
    .number({
      required_error: {
        value: "The field 'zipCodeId' is required.",
        code: 'zipCodeIdRequired',
      },
      invalid_type_error: "The field 'zipCodeId' must be a number.",
    })
    .min(1, {
      message: {
        value: "The field 'zipCodeId' must be at least 2 characters long.",
        code: 'zipCodeIdTooShort',
      },
    })
    .max(6500, {
      message: {
        value: "The field 'zipCodeId' must be at most 4 characters long.",
        code: 'zipCodeIdTooLong',
      },
    }),

});
