import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    }, phone: {
        type: String,
        required: true
    }, age: {
        type: Number,
        min: [18, "age must be greater than 18"],
        max: [60, "age must be smaller than 60 "]
    }

}, {})

export const userModel = mongoose.model("user", userSchema)

//   age: {
//     type: Number,
//     validate: {
//         validator: function (v) {
//             return v > 18 && v < 60
//         },
//         message: "user age is not valid"
//     }
// }