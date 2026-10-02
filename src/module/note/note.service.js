import { noteModel } from "../../database/model/note.model.js"
import { userModel } from "../../database/model/user.model.js"
// crete now note to user 
export const createNote = async (auth, body) => {
    try {
        let { userId } = auth
        let { title, content } = body
        let checkAuth = await userModel.findById(userId)
        if (checkAuth) {
            let note = await noteModel.create({ title, content, userId })
            return {
                message: "note created successfully",
                note
            }
        } {
            return {
                message: "user not found"
            }
        }
    } catch (error) {
        return {
            message: "all data ara required and must be in correct way"
        }
    }
}
// update note using id 
export const updateNote = async (noteId, userId, body) => {
    try {
        let { title, content } = body
        let findNote = await noteModel.findById(noteId)
        if (findNote.userId == userId) {
            // update note using save function to updata __v 
            title ? findNote.title = title : null
            content ? findNote.content = content : null
            findNote.__v += 1;
            findNote.save()
            return {
                message: "note update successfully",
                note: findNote
            }
        } else {
            return {
                message: "id is not authorization "
            }
        }
    } catch (error) {
        return {
            message: "something went wrong"
        }
    }
}
// update all data in note
export const updateAllNoteData = async (noteId, userId, content, title) => {

    try {
        if (!noteId.length > 0 && !userId.length > 0 && !content.length > 0 && !title.length) {
            return {
                message: "all data required"
            }
        }
        // start check and update data
        let checkAuth = await noteModel.findById(noteId)
        if (!checkAuth) {
            return {
                message: "note is not find"
            }
        }
        if (checkAuth.userId == userId) {
            let updataData = await noteModel.findOneAndUpdate({ _id: noteId }, { content, title }, { returnDocument: "after" }).select("-__v")
            return {
                message: "all date updated ",
                updataData
            }
        } else {
            return "not authorize"
        }
    } catch (error) {
        return {
            message: "data is not correct   "
        }
    }
}
// update all title in notes 
export const updateTitle = async (params, body) => {
    try {
        let { title } = body
        let { userId } = params
        let upTitle = await noteModel.updateMany({ userId }, { title })
        if (upTitle.modifiedCount > 0) {
            return {
                message: 'all title updated to this user '
            }
        } else {
            return {
                message: "something went wrong"
            }
        }
    } catch (error) {
        return {
            error: error.message,
            message: "put userId in correct way"
        }
    }
}
//delete note 
export const deleteNote = async (params, note) => {
    try {
        let { userId } = params
        let { noteId } = note
        let deletingNote = await noteModel.findOneAndDelete({
            _id: noteId,
            userId
        })
        if (deletingNote) {
            return {
                message: 'note deleting successfully',
                note: deletingNote
            }
        } else {
            return {
                message: "the user not author or note not found"
            }
        }
    } catch (error) {
        return {
            message: "data invalid"
        }
    }
}
// get note using author id 
export const getLimitNote = async (params, query) => {
    try {
        let { userid } = params
        let { limit, page } = query
        // pagination
        limit = Number(limit) > 0 ? Number(limit) : 3
        page = page < 0 || !Number(page) ? 3 : Number(page)
        let skip = (page - 1) * limit

        let data = await noteModel.find({ userId: userid }).limit(Number(limit)).sort({ createdAt: -1 }).skip(skip)
        if (data.length > 0) {
            return {
                message: "users is found ",
                data: data
            }
        } else {
            return {
                message: 'no data found'
            }
        }
    } catch (error) {
        return {
            error: error.message,
            message: "all data req and in true way"
        }
    }
}
