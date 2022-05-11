require('dotenv').config();
import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import route from "./route/route";
import connecDB from "./config/connectDB";
import cors from "cors";
import jwt from 'jsonwebtoken';


let app = express();
app.use(cors({ origin: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
route(app);

connecDB();

let port = process.env.PORT || 2503;

app.listen(port,() => {
    console.log("Srv opened on port " + port);
})