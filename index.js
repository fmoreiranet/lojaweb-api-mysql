//const express = require("express");
import express, { json } from "express";
import { userRouter } from "./routers/userRouter.js";
import { conn } from "./services/connect.js";

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routers
app.use(userRouter);
app.get("/", (req, res) => {
    res.status(200).json({ message: "Bem vindos!", data: req.headers });
});

app.listen(port, () => {
    conn.connect((err) => {
        try {
            if (err) throw err;
            console.log("Conectado...");
        } catch (error) {
            console.error("Error...:", error.message);
        }
    })
})
