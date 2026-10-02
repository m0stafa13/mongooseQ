import { Router } from "express";
import { deleteUser, getUserById, login, signUp, updateUser } from "./user.service.js";

const router = Router()

// signUp 
router.post("/create-account", async (req, res) => {
    let data = await signUp(req.body)
    res.json(data)
})
// login
router.get("/login", async (req, res) => {
    let data = await login(req.body)
    res.json(data)
})
// update user  
router.put("/update-user/:id", async (req, res) => {
    let data = await updateUser(req.params, req.body)
    res.json(data)
})
// delete user 
router.delete("/delete-user", async (req, res) => {
    let data = await deleteUser(req.query)
    res.json(data)
})
// find user by id 
router.get("/find-user/:id", async (req, res) => {
    let data = await getUserById(req.params)
    res.json(data)
})
router.all("/*path", (req, res) => {
    res.json({
        message: "wrong path"
    })
})

export default router