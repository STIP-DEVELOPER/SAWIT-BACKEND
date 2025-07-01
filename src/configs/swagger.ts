import swaggerJsDoc, { Options } from 'swagger-jsdoc'

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Welcome to Every Toko API Documentations',
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
      name: 'PRODUCTS',
      description: 'Product-related endpoints'
    },
    {
      name: 'STORES',
      description: 'Store-related endpoints'
    },
    {
      name: 'CATEGORIES',
      description: 'Store-related endpoints'
    }
  ],
  apis: [
    './src/modules/appChek/docs/*.ts',
    './src/modules/user/docs/*.ts',
    './src/modules/product/docs/*.ts',
    './src/modules/store/docs/*.ts',
    './src/modules/category/docs/*.ts'
  ]
}

const swaggerSpec = swaggerJsDoc(options)

export default swaggerSpec
