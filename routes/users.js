// We would be using the express router: it is used to handle request
const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");


// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        if (req.body.isAdmin = true) {
            await User.deleteOne(req.params.id);
        }

        res.status(200).json("user is successfully deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
})

//USER STATUS
router.get("/status", verifyTokenAndAdmin, async (req, res) => {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1
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
                }
            },
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }

})

module.exports = router