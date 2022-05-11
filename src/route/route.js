import express from "express";
import homeController from "../controllers/homeController";
import userController from '../controllers/API/users';
import postController from '../controllers/API/posts'

let router = express.Router();

let webRoutes = (app) => {
    router.get("/", homeController.getHomePage);
    router.get("/createUser", homeController.createUser);
    router.post("/postcreate", homeController.postcreate);
    router.get("/getedit", homeController.getedit);
    router.post("/postedit", homeController.postedit);
    // API User
    router.get("/api/alluser", userController.allUser);
    router.post("/api/createuser", userController.createUser);
    router.delete("/api/deleteuser", userController.deleteuser);
    router.post("/api/edituser", userController.editUser);
    router.post("/api/login", userController.login);
    router.get("/api/getuser", userController.getOneUser);
    // API Post
    router.get("/api/allpost", postController.allPost);
    router.get("/api/getpost", postController.getPost);

    return app.use("/", router);
}
module.exports = webRoutes;