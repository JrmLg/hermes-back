export default {
  patient: {
    type: 'object',
    required: ['firstname', 'lastname', 'birthdate', 'social_security_number', 'phone_number', 'email', 'address'],
    properties: {
      id: { type: 'integer', description: 'The auto-generated id for the patient.' },
      firstname: { type: 'string', description: "Patient's firstname." },
      lastname: { type: 'string', description: "Patient's lastname." },
      birthdate: { type: 'string', description: "Patient's birthdate." },
      social_security_number: { type: 'string', description: "Patient's social_security_number." },
      phone_number: { type: 'string', description: "Patient's phone number." },
      email: { type: 'string', description: "Patient's email." },
      address: { type: 'string', description: "Patient's address." },
      zip_code_id: { type: 'integer', description: "Patient's zip code id." },
      createdAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date of creation.',
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        description: 'Date of last update.',
      },
    },
    example: {
      id: 2,
      firstname: 'Jane',
      lastname: 'Doe',
      birthdate: '1990-01-01',
      social_security_number: '123456789',
      phone_number: '0601020304',
      email: 'jane@doe.com',
      address: '5 rue de la paix',
      zip_code_id: 2,
      createdAt: '2024-03-10 09:43:05.757',
      updatedAt: '2024-03-10',
    },
  },
};