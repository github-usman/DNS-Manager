import express from "express"
import { User } from "../models/user.model.js";
const router = express.Router();

router.get('/users/all', async (req, res) => {
    const users = await User.find({});

    const keyword = req.query.keyword;
    console.log(keyword)

    res.json({
        success: true,
        users
    })
})

export default router;