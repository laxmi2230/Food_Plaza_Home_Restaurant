require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay")


const router = express.Router();

router.post("/orders", async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount : 50000, 
            currency: "INR",
            receipt: "receipt_order_74394",

        };
        const order = await instance.orders.create(options);
        if(!order) return res.status(500).send("some error");

        res.json(order);
    } catch(error) {
        res.status(500).send(error);
    }
});

module.exports = router;