const Users = require("../model/Member");
const { schema } = require("../ChangePasswordValid")
const { decodeToken } = require("../middleware/auth")
const bcrypt = require("bcrypt")
const changePassword = async (req, res) => {
    try {
        const { oldPassword, confirmPassword, newPassword } = req.body
        console.log("req", req.body)
        const { error } = schema.validate(req.body)
        console.log("error", error)
        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message,
            });
        }
        const response = await decodeToken(req, res);

        const data = await Users.findOne({ email: response.email });
        if (!data) {
            return res.status(403).json({
                success: false,
                message: "User not found"
            })
        }
        if (newPassword !== confirmPassword) {
            return res.status(403).json({
                success: false,
                message: "Password did not match"
            })
        }
        const checkPassword = await bcrypt.compare(oldPassword, data.password)
        if (!checkPassword) {
            return res.status(403).json({
                success: false,
                message: "Please enter valid old password"
            })
        }
        const hashPassword = await bcrypt.hash(confirmPassword, 10);

        const isMatch = await Users.updateOne(
            { email: data.email },
            { $set: { password: hashPassword } }
        );
        console.log("newPassword", isMatch);
        if (isMatch) {
            return res.status(200).json({
                success: true,
                message: "Password is successfully changed",
            });
        }


    } catch (err) {
        console.log("err", err)
        return res.status(400).json({
            success: false,
            message: err
        })


    }




}
module.exports = { changePassword }


