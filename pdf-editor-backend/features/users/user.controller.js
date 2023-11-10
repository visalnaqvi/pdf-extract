import Authentication from "../../config/authentication.js"
import User from "./user.schema.js"
import jwt from "jsonwebtoken"

export default class UserController {

    //creates a new user and stores it in database
    signUp(req, res) {
        console.log("insdieenjnjnfjcnfjnfjvnvffvvfvv")
        //checking if user already exists
        User.findOne({ userId: req.body.userId }).then(user => {
            if (user) {
                //if user already exists then return
                res.status(409).send("userId already exist pleas choose different userId")
                return;
            }else{

                //creating new user
                const newUser = new User({
                    name: req.body.name,
                    userId: req.body.userId,
                    password: req.body.password
                })
        
                //saving to database
                newUser.save().then(user => res.send(user)).catch(err => {
                    console.log(err)
                    res.status(400).send("error")
                })
            }
        }
        )

    }


    //login in user
    signIn(req, res) {
        console.log("insdieenjnjnfjcnfjnfjvnvffvvfvv")
        console.log(req.body)
        //checking is user exists or not
        User.findOne({
            userId: req.body.userId,
            password: req.body.password
        }).then(user => {

            //generating jwt token if user exists
            const token = Authentication.generateToken(user)
            res.send(token)
        }).catch(err => {
            console.log(err)
            res.status(400).send("error")
        })
    }

    //forgot password function
    // forgotPassword(req,res){
    //     const email = req.body.userId;

    //     //checking if email is a valid email or not
    //     let isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    //     if(!isValid){
    //         //sending 400 status if in valid email
    //         res.status(400).send("Not Valid Email")
    //         return;
    //     }

    //     //chekcing is user with email exist or not
    //     User.findOne({
    //         userId:email
    //     }).then((user)=>{

    //         //verfying token is user exists
    //         const token = Authentication.generateToken(user)

    //         //sending password reset email
    //         if(Mailer.sentPasswordResetMail(user.userId , token)){
    //             res.send("Email Sent")
    //         }else{
    //             res.status(400).send("Error")
    //         };
    //     }).catch(err=>{console.log(err)
    //     res.status(400).send("Error")
    //     })
    // }

    // //password reset function
    // resetPassword(req,res){

    //     //getting email and new password for request body
    //     const email = req.body.userId;
    //     const password = req.body.password;

    //     //checking if user exists with that email
    //     User.findOneAndUpdate({
    //         userId:email
    //     },
    //     {
    //         //updating new password
    //         $set:{password:password}
    //     },
    //     { new: true }
    //     ).then((user) => {
    //         if (!user) {
    //             //sending 404 status if user does not exist
    //           return res.status(404).send("User not found");
    //         }      
    //         return res.status(200).send("Password updated");
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         return res.status(500).send("Error");
    //       });
    // }
}