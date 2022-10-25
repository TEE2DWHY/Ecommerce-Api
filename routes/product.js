// We would be using the express router: it is used to handle request
const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken")



// ADD PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    }
    catch (err) {
        res.status(500).json(err)
    }

});

// UPDATE
router.put("/:title", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(req.params.title,
            { $set: req.body }, { new: true });

        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err);
    }

});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("successfully deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const allProducts = await Product.find();

        res.status(200).json(allProducts);
    } catch (err) {
        res.status(500), json(err);
    }
});

module.exports = router