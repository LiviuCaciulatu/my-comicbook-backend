import "@/config/env";

import cors from "cors";
import express from "express";
import clientController from "@/entities/client/controllers/client-controller";
import {errorMiddleware} from "@/config/error-middleware";

const app = express();
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
    "https://www.service-app.cleancodeit.com"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET","POST","PATCH","PUT","DELETE","OPTIONS"],
    credentials: true
}));

app.options("/files/upload", cors({
    origin: allowedOrigins,
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.options("/clientRegistry/:clientId/files/upload", cors({
    origin: allowedOrigins,
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.get("/health", (_req, res) => {
    res.json({ status: "UP" });
});

// routes
app.use("/clients", clientController);

// error handler (last)
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});