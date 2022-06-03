

const jwt = require("jsonwebtoken")


const verfiyToken = (req,res,next) => {
    const authHeader = req.headers.authorization;

 
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SEC,(err,user)=> {
            if(err) res.status(403).json("Token is not valid");
            req.user = user;
            next();
        });


    }
    else{
        return res.status(401).json("You are not authenticated");
    }
}





const verfiyTokenAndAuthorization = (req,res,next) => {
    verfiyToken(req.res,() => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next();
            }
            else{
                res.status(403).json("You are not allowed to do that")
            }
    })
}

const verfiyTokenAndAdmin = (req, res, next) => {
  verfiyToken(req.res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that");
    }
  });
};



module.exports = {
  verfiyToken,
  verfiyTokenAndAuthorization,
  verfiyTokenAndAdmin,
};