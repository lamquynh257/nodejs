import { json } from 'express/lib/response';
import db from '../models/index';
import crud from '../services/crud';


const getHomePage = async (req, res) => {
    try {
        //let data = await db.User.findAll();
        let data = await crud.getAllUser();
        return res.render("home.ejs", {
            data: data
        });
    } catch (error) {
        console.log(error);
    }
}

let createUser = (req,res) => {
    return res.render("createUser.ejs");
}

let postcreate = async (req,res) => {
    await crud.createNewUser(req.body);
    //console.log(data);
    return res.send("Success!");
}

const getedit = async (req, res) => {
        const id = req.query.id;
        if(!id){
            return res.send("Khong tim thay user");
            
        }else{
            let data = await db.User.findByPk(id);
            //console.log(id);
            return res.render("edit.ejs", {
                data: data
            });
            
        }
}

let postedit = async (req, res)  => {
    let name =  req.body.username;
    console.log(name);
    await crud.editUser(name, req.body);
    return res.render("home");
}

module.exports = {
    getHomePage: getHomePage,
    createUser: createUser,
    postcreate: postcreate,
    getedit: getedit,
    postedit: postedit
}