import { conn } from "../services/connect.js";

export const addressService = {
    add: (address, callback) => {
        let sql = `insert into address (cep, logradouro, bairro, cidade, uf) values(?,?,?,?,?);`;

        let fieldsAddress = [address.cep, address.logradouro, address.bairro, address.cidade, address.uf];

        conn.beginTransaction((err) => {
            if (err) {
                return callback(err);
            }
            conn.query(sql, fieldsAddress, (errQuery, result) => {
                if (errQuery) {
                    return conn.rollback((err) => {
                        // if (err) throw err;
                        return callback(errQuery);
                    });
                }
                conn.commit((err) => {
                    if (err) {
                        return callback(err)
                    }
                    return callback(err, result);
                })
            });
        });
    },
    addUserAddress: async (address, callback) => {
        let sql1 = `insert into address (cep, logradouro, bairro, cidade, uf) values(?,?,?,?,?);`;
        let sql2 = `insert into user_address(_id_user, _cep, numero, complemento) values(?,?,?,?);`;

        let fieldsAddress = [address.cep, address.logradouro, address.bairro, address.cidade, address.uf];
        let fieldsUserAddress = [parseInt(address._id_user), address.cep, address.numero, address.complemento];

        conn.beginTransaction(function (err) {
            if (err) {
                return callback(err)
            }
            conn.query(sql1, fieldsAddress, (errQuery, result) => {
                if (errQuery) {
                    if (errQuery.code !== 'ER_DUP_ENTRY') {
                        return conn.rollback((err) => {
                            // if (err) throw err;
                            return callback(errQuery)
                        });
                    }
                }
                conn.query(sql2, fieldsUserAddress, (errQuery, result) => {
                    if (errQuery) {
                        return conn.rollback((err) => {
                            // if (err) throw err;
                            return callback(errQuery)
                        });
                    }
                    conn.commit((err) => {
                        if (err) {
                            return callback(err)
                        }
                        callback(err, result);
                    })
                });
            });
        });
    }
}
