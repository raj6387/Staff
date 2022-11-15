const options = {
    definition: {
        openapi: '3.0.2',
        info: {
            title: 'Backend Project for mongodb',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:8080/api'
            }
        ],
        securityDefinitions: {
            bearerAuth: {
              type: 'apiKey',
              name: 'Authorization',
              scheme: 'bearer',
              in: 'header',
            },
          },

    },
    apis: ["Server.js"]
    
}
const swaggerSpec = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


/**
 * @swagger
 *     components:
 *         schema:
 *            Member:
 *                 type: object
 *                 properties:
 *                     email:
 *                         type: string
 *                     password:
 *                            type: string
 *                
 */





/**
 * @swagger
 * /member/list:
 *               get:        
 *                   security: 
 *                             - bearerAuth: []
 *                   responses:
 *                       200:
 *                           content:
 *                               application/json:
 *                                   schema:
 *                                      type: array
 *                                      
 *     
 */
