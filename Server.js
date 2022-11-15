const express = require("express")
const router = require("./src/Routes")
const openAPIDocumentation=require("./src/swagger/OpenApi")
require("./src/DbConnection")
const app = express();
app.use(express.json());
app.use('/api', router);
const swaggerUi = require("swagger-ui-express");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIDocumentation))






app.listen(8080, console.log("Server is listening on 8080"))


