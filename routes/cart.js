const Cart = require("../modals/Cart");
const {
  verfiyToken,
  verfiyTokenAndAuthorization,
  verfiyTokenAndAdmin,
} = require("./verfiyToken");

const router = require("express").Router();

// Create

router.post("/", async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();

    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// here verfiyTokenAndAuthorization will be added, now avoiding for an unknown error
router.put("/:id", async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE Method

router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get User Cart
router.get("/find/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All 
router.get("/", async (req, res) => {
    try{
        const cart = await Cart.find()
        res.status(200).json(cart);

    }
    catch(err){
        res.status(500).json(err);
    }


})

// Get user starts

router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
