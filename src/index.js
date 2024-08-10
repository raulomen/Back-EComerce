const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/orders");
const path = require("path");

// swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerSpec = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce Platform",
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`],
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permite solicitudes desde cualquier origen
app.use(express.json());
app.use('/api', productRoutes);
app.use('/api', orderRoutes);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)));

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to my API");
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

app.listen(port, () => console.log('Server listening on port', port));
