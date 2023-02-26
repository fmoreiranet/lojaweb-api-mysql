//const express = require("express");
import express from "express";
import { conn } from "./services/connect.js";


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
