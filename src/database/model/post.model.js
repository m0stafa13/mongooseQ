import mongoose, { Types } from "mongoose"

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v !== v.toUpperCase()
            },
            message: "field that ensure the title is not entirely uppercase"
        }

    },
    content: {
        type: String,
        required: true
    },
    userId: {
        required: true,
        type: Types.ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
})

export const postModel = mongoose.model("post", postSchema)