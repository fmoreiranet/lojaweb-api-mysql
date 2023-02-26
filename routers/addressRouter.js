import express from "express";
import { addressService } from "../services/addressService.js";

export const addressRouter = express.Router();

addressRouter.post("/addressUser", async (req, res) => {
    try {
        await addressService.addUserAddress(req.body, (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao manipular os dados!" });
            }
            return res.status(200).json({ message: "Cadastrado!", data: result });
        });
    } catch (error) {
        console.error("Erro > ", error.message);
        return res.status(500).json({ error: "Erro ao manipular os dados!" });
    }

});

addressRouter.post("/address", async (req, res) => {
    try {
        await addressService.add(req.body, (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Erro ao manipular os dados!" });
            }
            return res.status(200).json({ message: "Cadastrado!", data: result });
        });
    } catch (error) {
        console.error("Erro > ", error.message);
        return res.status(500).json({ error: "Erro ao manipular os dados!" });
    }
});

