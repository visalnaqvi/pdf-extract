import jwt from "jsonwebtoken"


//authentication class for handleing auth functions
export default class Authentication{

    //function to genrate jwt token
     static generateToken(user){
        console.log("gggggggggggggggg",user)
        const token = jwt.sign({
            userId:user.userId,
            role:user.role,
            name:user.name
        },
        "XPJ2u7E8XJ02TTDOdlKXBtyQfgJRjknN",
        {
            expiresIn:'1h'
        }
        )

        return token;
    }

    //function to verify a jwt token
    static verifyToken(req,res,next){
        const token = req.headers['authorization'].replace("Bearer ","")
        if(!token){
            res.status(401).send("Unauthorized")
        }
        try{
           const payload = jwt.verify(token , "XPJ2u7E8XJ02TTDOdlKXBtyQfgJRjknN" )
           req.payload = payload;
           next()
        }catch(err){
            console.log(err)
            res.status(401).send("Unauthorized")
        }

    }
}