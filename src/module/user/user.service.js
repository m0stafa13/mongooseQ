import { userModel } from "../../database/model/user.model.js"
//  create  account || sign up 
export const signUp = async (body) => {
    let { name, email, password, phone, age } = body
    try {
        let checkEmail = await userModel.findOne({ email })
        let checkPhone = await userModel.findOne({ phone })
        if (checkEmail) {
            return {
                message: "user already exists with this email"
            }
        }
        if (checkPhone) {
            return {
                message: "this pheon already used"
            }
        }
        let insertUser = await userModel.create(body)
        if (insertUser) {
            return {
                message: "user added successfully",
                user: insertUser
            }
        } else {
            return {
                message: "something went wrong"
            }
        }
    } catch (error) {
        return {
            message: "all date req and in a correct way "
        }
    }
}
// login
export const login = async (body) => {
    let { email, password } = body
    let findUser = await userModel.findOne({ email, password })
    if (findUser) {
        return {
            message: 'user founded successfully',
            user: findUser
        }
    } else {
        return {
            message: "invalid email or password"
        }
    }
}
// update user 
export const updateUser = async ({ id }, data) => {
    try {
        let { email, phone, age, name } = data
        let findUser = await userModel.findById(id)
        if (findUser) {
            let checkEmail = await userModel.findOne({ email })
            if (checkEmail) {
                return {
                    message: "cannot update email to this email change it and try again"
                }
            }
            // update data 
            email ? findUser.email = email : null
            phone ? findUser.phone = phone : null
            age ? findUser.age = age : null
            name ? findUser.name = name : null
            findUser.__v = findUser.__v + 1
            findUser.save()
            return {
                message: "user data updated",
                user: findUser
            }
        } else {
            return {
                message: "user id is not found"
            }
        }
    } catch (error) {
        return {
            message: "invalid data input"
        }
    }
}
// delete user 
export const deleteUser = async ({ id }) => {
    try {
        let deletedUser = await userModel.findOneAndDelete({ _id: id })
        if (deletedUser) {
            return {
                message: 'user deleted successfully'
            }
        } else {
            return {
                message: "user not found"
            }
        }
    } catch (error) {
        return {
            message: "invalid id change it and try again"
        }
    }
}
// get user by id 
export const getUserById = async ({ id }) => {
    try {
        let findUser = await userModel.findById(id)
        if (findUser) {
            return {
                message: 'user founded successfully',
                user: findUser
            }
        } else {
            return {
                message: "user not found"
            }
        }
    } catch (error) {
        return {
            message: "id is invalid"
        }
    }
}