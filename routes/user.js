const User = require("../modals/User");
const { verfiyToken, verfiyTokenAndAuthorization, verfiyTokenAndAdmin } = require("./verfiyToken");

const router = require("express").Router();


// here verfiyTokenAndAuthorization will be added, now avoiding for an unknown error
router.put("/:id", async (req,res) => {
    if(req.body.password){
          req.body.password = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
          ).toString();
    }
    try{
        const updateduser = await User.findByIdAndUpdate(req.params.id,{
            $set : req.body
        },{new:true})
        res.status(200).json(updateduser);
    }
    catch(err){
        res.status(500).json(err)
    }

})




// DELETE Method

router.delete("/:id", async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("user has been deleted");

    }
    catch(err){
        res.status(500).json(err)
    }
})


// Get User
router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
   
       const { password, ...others } = user._doc;
       res.status(200).json(others);
  
  } catch (err) {
    res.status(500).json(err);
  }
});


// Get All User
router.get("/", async (req, res) => {

    const query = req.query.new;
  try {
    const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
   
     
    res.status(200).json(users);
  
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user starts

router.get("/stats", async (req,res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() -1));


    try{
        const data = await User.aggregate([
              {$match:{createdAt:{$gte : lastYear}}},
        {
            $project : {
                month:{$month:"$createdAt"},
            },
        },
        {
            $group : {
                _id : "$month",
                total : {$sum : 1},

            }

        }


        ]);
        res.status(200).json(data);
      
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router;