export const authPaths = {
  '/auth/signup': {
    post: {
      tags: ['Authentication'],
      summary: 'Creates an user',
      parameters: [
        {
          in: 'body',
          name: 'user',
          description: 'The user to be created',
          schema: {
            type: 'object',
            properties: {
              firstName: {
                type: 'string',
                required: true,
              },
              lastName: {
                type: 'string',
                required: true,
              },
              birthday: {
                type: 'string',
                format: 'date',
                required: true,
              },
              email: {
                type: 'string',
                format: 'email',
                required: true,
                uniqueItems: true,
              },
              password: {
                type: 'string',
                format: 'password',
                required: true,
                minLength: 4,
                maxLength: 20,
              },
            },
          },
        },
      ],
      responses: {
        201: {
          description: 'OK',
          schema: {
            properties: {
              id: {
                type: 'integer',
                uniqueItems: true,
              },
              firstName: {
                type: 'string',
              },
              lastName: {
                type: 'string',
              },
              birthday: {
                type: 'string',
                format: 'date-time',
              },
              email: {
                type: 'string',
                format: 'email',
                uniqueItems: true,
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
              },
            },
          },
        },
      },
    },
  },
  '/auth/signin': {
    post: {
      tags: ['Authentication'],
      summary: 'Authenticates an user',
      parameters: [
        {
          in: 'body',
          name: 'user',
          description: 'The user credentials to login',
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
                required: true,
                uniqueItems: true,
              },
              password: {
                type: 'string',
                format: 'password',
                required: true,
                minLength: 4,
                maxLength: 20,
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: 'OK',
          schema: {
            properties: {
              id: {
                type: 'integer',
                uniqueItems: true,
              },
              firstName: {
                type: 'string',
              },
              lastName: {
                type: 'string',
              },
              birthday: {
                type: 'string',
                format: 'date-time',
              },
              email: {
                type: 'string',
                format: 'email',
                uniqueItems: true,
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
              },
              token: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
};
