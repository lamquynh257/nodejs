import { promise, reject } from "bcrypt/promises";
import res from "express/lib/response";
import db from '../models/index';
const bcrypt = require('bcrypt');
const saltRounds = 10;

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let passhashed = await hashPass(data.password);
            await db.User.create({
                username: data.username,
                password: passhashed,
                email: data.email,
            })
            resolve("Create success!");
        } catch (error) {
            reject(error);
        }
    })
   
    //console.log(passhashed);
}


let hashPass = (password) => {
            let hashpassword = bcrypt.hashSync(password, saltRounds);
            return hashpassword;
}

let getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findAll();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

let editUser = (name, data) => {
return new Promise(async (resolve, reject) => {
    try {
        await db.User.update({ username: name }, {
            where: {
                username: name
            }
          });
        console.log(name)
        console.log(data)
    } catch (error) {
        reject(error);
    }
})
}

let getEdit = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.User.findByPk(id);
            resolve(data);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    editUser: editUser
}