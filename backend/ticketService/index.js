const express = require('express')
const cors = require('cors')
const app = express()
const promBundle = require('express-prom-bundle');
const metricsMiddleware = promBundle({ includeMethod: true });
require('dotenv').config()
const cookieParser = require('cookie-parser');
const swaggerUi = require('swagger-ui-express');
app.use(cors())
app.use(metricsMiddleware);


app.use(express.json())
// const healthRoutes = require('./routes/health.route')
const ticketRoutes = require('./routes/ticket.route')
const ticketAssignment = require('./routes/ticketassignment.route')
app.use(cookieParser());

// app.use("/auth/health", healthRoutes);
app.use("/ticket/gen", ticketRoutes);
app.use("/ticket/assign", ticketAssignment)

const swaggerSpec = require("./utils/swaggerConfig");
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(process.env.PORT, () => {
  console.log(`Auth Service running at port ${process.env.PORT}`);
});
