import swaggerJsDoc, { Options } from 'swagger-jsdoc'

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Welcome to Eduapp Documentations',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [
      {
        BearerAuth: []
      }
    ]
  },
  tags: [
    {
      name: 'APP',
      description: 'App-related endpoints'
    },
    {
      name: 'USERS',
      description: 'User-related endpoints'
    },
    {
      name: 'Quiz',
      description: 'quiz-related endpoints'
    }
  ],
  apis: ['./src/docs/*.ts']
}

const swaggerSpec = swaggerJsDoc(options)

export default swaggerSpec
