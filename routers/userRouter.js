import express from "express";
import { conn } from "../services/connect.js";

export const userRouter = express.Router();

userRouter.post("/user", (req, res) => {
    try {
        const user = req.body;
        let sql = `insert into user (_id, nome, email, pass) values(null, '${user.nome}', '${user.email}', MD5('${user.pass}'))`;
        conn.query(sql, (err, result) => {
            if (err) {
                console.error("Erro > ", err.message);
                return res.status(500).json({ error: "Erro ao gravar os dados!" });
            }
            return res.status(200).json({ message: "Cadastrado!", data: result });
        });
    } catch (error) {
        console.error("Erro > ", error.message);
        return res.status(500).json({ error: "Erro ao manipular os dados!" });
    }

});

userRouter.get("/user", (req, res) => {
    try {
        let sql = `select * from user where active=1`;
        conn.query(sql, (err, result) => {
            if (err) {
                console.error("Erro > ", err.message);
                return res.status(500).json({ error: "Erro ao ler os dados!" });
            }
            return res.status(200).json({ message: "Lista de Dados!", data: result });
        });
    } catch (error) {
        console.error("Erro > ", error.message);
        return res.status(500).json({ error: "Erro ao listar os dados!" });
    }
});

userRouter.get("/user/:id", (req, res) => {
    try {
        let id = req.params.id
        let sql = `select * from user where _id = ${id} and active=1`;
        conn.query(sql, (err, result) => {
            if (err) {
                console.error("Erro > ", err.message);
                return res.status(500).json({ error: "Erro ao ler os dados!" });
            }
            return res.status(200).json({ message: "Lista de Dados!", data: result });
        });
    } catch (error) {
        console.error("Erro > ", error.message);
        return res.status(500).json({ error: "Erro ao listar os dados!" });
    }
});

userRouter.put("/user/:id", (req, res) => {
    try {
        const user = req.body;
        let id = req.params.id;
        let sql = ` update user set
                    nome = '${user.nome}',
                    email = '${user.email}',
                    pass = MD5('${user.pass}')
                    where _id = ${id}
                    and active=1`;
        conn.query(sql, (err, result) => {
            if (err) {
                console.error("Erro > ", err.message);
                return res.status(500).json({ error: "Erro ao atualizar os dados!" });
            }
            if (result.affectedRows == 0) {
                return res.status(500).json({ message: "Não Atualizado!", data: result });
            } else {
                return res.status(200).json({ message: "Atualizado!", data: result });
            }
        });
    } catch (error) {
        console.error("Erro > ", error.message);
        return res.status(500).json({ error: "Erro ao manipular os dados!" });
    }
});

userRouter.delete("/user/:id", (req, res) => {
    try {
        let id = req.params.id;
        //let sql = `delete from user where _id = ${id}`;
        let sql = `update user set active = 0 where _id = ${id} and active=1`;
        conn.query(sql, (err, result) => {
            if (err) {
                console.error("Erro > ", err.message);
                return res.status(500).json({ error: "Erro ao remover os dados!" });
            }
            if (result.affectedRows == 0) {
                return res.status(500).json({ message: "Não Removido!", data: result });
            } else {
                return res.status(200).json({ message: "Removido!", data: result });
            }
        });
    } catch (error) {
        console.error("Erro > ", error.message);
        return res.status(500).json({ error: "Erro ao remover os dados!" });
    }
});