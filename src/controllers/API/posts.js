import { json } from 'express/lib/response';
import jwt from 'jsonwebtoken';
require('dotenv').config();
import db from '../../models/index';
const bcrypt = require('bcrypt');
const saltRounds = 10;


const allPost = async (req, res) => {
    try {
        //let data = await db.User.findAll();
        let data = await db.Post.findAll();
        return res.send(data);
        
    } catch (error) {
        console.log(error);
    }
}

let getPost = async (req, res) => {
    //  console.log(req.body)
    let id = req.query.id
    let post = await db.Post.findOne({
        where:{id: id},
        raw: true
    });
        return res.send(post)
   
    //console.log(post)

}

let createUser = async (req,res) => {
    const data = req.body;
    let passhashed = await hashPass(data.password);
           let data1 = await db.User.create({
                username: data.username,
                password: passhashed,
                fullname: data.fullname,
                email: data.email,
                image: data.image,
            })
            return res.send(data1)
}

let deleteuser = async (req, res) => {
    let data = req.body
    let data1 = await db.User.findByPk(data.id);
    await data1.destroy();
    return res.send("Deleted!!!")
}

let editUser = async (req, res) => {
    let data = req.body
    let data1 = await db.User.findByPk(data.id);
    
    data1.set({
        username: data.username,
        password: data.password,
        fullname: data.fullname,
        email: data.email,
        image: data.image
    }) 
await data1.save();
//console.log(data)
 return res.send(data)
}


let login = async (req, res) => {
   
    let user = await db.User.findOne({
        where:{username: req.body.username},
        raw: true
    });
    
    if(!user){
       return res.status(404).json({
            err: 1,
            message: "Không tìm thấy user!"
        })
    }else{
        let check = await bcrypt.compare(req.body.password, user.password);
        if(!req.body.username || !req.body.password){
          return  res.status(500).json({
                message: "Chưa nhập tài khoản hoặc mật khẩu!"
            })
        }else{
            if(req.body.username === user.username && check){
                let userData = user;
                delete userData.password;
                let accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120s'})
                //console.log(accessToken)
                res.json({accessToken})
            }else{
                res.status(401).json({
                    message: "Sai tên đăng nhập hoặc mật khẩu!"
                })
            }
        }
    }
    // return res.status(200).json({
    //     message: "Login success!!!"
    // })
}



   let authenToken = (req, res, next) => {
        let authHeader = req.headers['authorization'];
        let token = authHeader.split(' ')[1];
        if(!token) return res.sendStatus(401);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            //console.log(err, data)
            if(err) return res.sendStatus(403);
        next();
        })
        
 }



let hashPass = (password) => {
    let hashpassword = bcrypt.hashSync(password, saltRounds);
    return hashpassword;
}


module.exports = {
    allPost: allPost,
    createUser:createUser,
    deleteuser:deleteuser,
    editUser:editUser,
    login:login,
    authenToken:authenToken,
    getPost:getPost
}