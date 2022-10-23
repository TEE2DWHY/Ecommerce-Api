// We would be using the express router: it is used to handle request
const router = require("express").Router();
const Product = require("../models/Product");
const User = require("../models/User");
// const verifyTokenAndAdmin = require("./verifyToken")



// // REGISTER





// //UPDATE
// router.put("/:product", verifyTokenAndAdmin, async (req, res) => {
//     if (User.isAdmin === true) {
//         try {
//             const updatedProduct = await Product.findByIdAndUpdate(req.body.price, req.body.size,
//                 { $set: req.body }, { new: true });

//             res.status(200).json(updatedProduct)
//         } catch (err) {
//             res.status(500).json(err);
//         }
//     }
// })

module.exports = router