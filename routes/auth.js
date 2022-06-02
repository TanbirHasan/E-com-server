const router = require("express").Router();

const res = require("express/lib/response");
const User = require("../modals/User")
const CryptoJS = require("crypto-js");


// Register

router.post("/register" , async (req,res) => {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json(err);
    }
})

// Login

router.post("/login" , async (req,res) =>{
    try{
        const user = await User.findOne({username:req.body.username});
        console.log(user);
        user && res.status(200).json(user);

        const hashedPassword = CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
       
         const password = hashedPassword.toString(CryptoJS.enc.Utf8); 
         console.log(password)
     
         password !== req.body.password
           ? res.status(401).json("Wrong Credentials")
           : res.status(200).json(user);

 

    }
    catch(error){
         res.status(500).json(error);
    }
})





module.exports = router;
