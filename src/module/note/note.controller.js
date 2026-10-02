import Router from "express"
import { createNote, deleteNote, getLimitNote, getNoteAggregate, getNoteAndAuthor, getNoteByContent, getNoteById, updateAllNoteData, updateNote, updateTitle } from "./note.service.js"
const router = Router()
// create new note 
router.post("/post-note/:userId", async (req, res) => {
    let data = await createNote(req.params, req.body)
    res.json(data)
})
// update note 
router.patch("/update-not/:noteId", async (req, res) => {
    let { noteId } = req.params
    let { userId } = req.query
    let data = await updateNote(noteId, userId, req.body)
    res.json(data)
})
// update all note data
router.patch("/update-full_note/:userId", async (req, res) => {
    let { noteId } = req.params
    let { userId } = req.query
    let { content, title } = req.body
    if (!title || !content) {
        res.json({
            message: "all data required"
        })
    }
    let data = await updateAllNoteData(noteId, userId, content, title)
    res.json(data)
})
// update note title for user 
router.patch('/update-title/:userId', async (req, res) => {
    let data = await updateTitle(req.params, req.body)
    res.json(data)
})
// delete note with check user 
router.delete("/delete-note/:userId", async (req, res) => {
    let data = await deleteNote(req.params, req.body)
    res.json(data)
})
// get note and limit and page
router.get("/get-note-limit/:userid", async (req, res) => {
    let data = await getLimitNote(req.params, req.query)
    res.json(data)
})
// get note by id 
router.get("/get-note-by-id/:userId", async (req, res) => {
    let data = await getNoteById(req.params, req.query)
    res.json(data)
})
// get note by content
router.get("/get-note-content/:userId", async (req, res) => {
    let { content } = req.query
    let { userId } = req.params
    let data = await getNoteByContent(content, userId)
    res.json(data)
})
// get note and user by user id 
router.get("/get-note-user/:userId", async (req, res) => {
    let data = await getNoteAndAuthor(req.params)
    res.json(data)
})
// get note and user and aggregate 
router.get("/get-note-aggregate/:userId", async (req, res) => {
    let data = await getNoteAggregate(req.params)
    res.json(data)
})
export default router