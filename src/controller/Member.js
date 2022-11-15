const Users = require("../model/Member");
const MetaData = require("../model/MetaUser")
const { Schema } = require("../Validation")
const { generateToken, decodeToken } = require("../middleware/auth")
const { generateCode } = require("../Helper");
const bcrypt = require("bcrypt");
const MetaUser = require("../model/MetaUser");
const Media = require("../model/Media");


const register = async (req, res) => {
    try {
        const { fullName, email, password, contact_no, birthday, role, media, birthplace, sex, hometown, nation, religion, identification, resident, currentAddress, literacy, bankAccount, bankName,daysOfIdentity,bankOfIssue,placeOfIssue,facebook,linkedIn,skype,status,maritalStatus,jobPosition,workPlace,} = req.body
        const { error } = Schema.validate(req.body)
        if (error) {
            return res.status(401).json({
                success: false,
                message: error.details[0].message,
            });
        }

        const result = await Media({ _id: media })
        if (!result) {
            return res.status(403).json({
                success: false,
                message: "Media not found"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10)
        const user = await Users.findOne({ email: email.toLowerCase() });
        if (user) {
            return res.status(403).json({
                success: false,
                message: "User already exists",
            });
        }
        const phone = await Users.findOne({ contact_no });
        if (phone) {
            return res.status(403).json({
                success: false,
                message: "Contact no. already exist"
            })
        }
        const meta = new MetaData({
            birthplace,
            sex,
            hometown,
            nation,
            religion,
            identification,
            resident,
            currentAddress,
            literacy,
            bankAccount,
            bankName,
            daysOfIdentity,
            bankOfIssue,
            placeOfIssue,
            facebook,
            linkedIn,
            skype,
            status,
            maritalStatus,
            jobPosition,
            workPlace,



        })
        await meta.save();

        const data = new Users({
            MetaUser: meta,
            fullName,
            email: email.toLowerCase(),
            password: hashPassword,
            contact_no,
            birthday,
            role,
            media: media,
            HRCode: generateCode(5)

        })
        await data.save()
        return res.status(403).json({
            success: true,
            message: "You are successfully registered"
        })


    } catch (err) {
        //console.log("err", err)
        return res.status(400).json({
            success: false,
            message: err
        })

    }

}


const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const data = await Users.findOne({ email: email.toLowerCase() })
        if (!data) {
            return res.status(403).json({
                success: false,
                message: "Please enter valid email id"
            })
        }
        const comparePassword = await bcrypt.compare(password, data.password);
        if (!comparePassword) {
            return res.status(403).json({
                success: false,
                message: "Please enter valid password"
            })
        }
        const token = await generateToken({ email: data.email, role: data.role });
        return res.status(200).json({
            success: true,
            token,
            message: "Login successfully"

        })

    } catch (error) {
        //console.log("error", error)
        return res.status(400).json({
            success: false,
            message: error
        })
    }

}

const MemberList = async (req, res) => {
    try {
        
        const response = await decodeToken(req, res);
        //console.log("response", response)
        if (response.role !== "HR") {
            return res.status(403).json({
                success: false,
                message: "Your job profile not match  to see this page"
            })

        }
        //const{email,fullName}=req.body
        const data = await Users.find( {$or: [
            {fullname: req.body.fullName },
            {email : req.body.email }
        ]
    })
    if(!data){
        return res.status(403).json({
            success:false,
            message:"Members not found"
        })
    }

        return res.status(200).json({
            success: true,
            data: data
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })


    }

}

const MembersList = async (req, res) => {
    try {
        const response = await decodeToken(req, res);
        //console.log("response", response)
        if (response.role !== "HR") {
            return res.status(403).json({
                success: false,
                message: "Your job profile not match  to see this page"
            })
        }
        const list = await Users.findOne({ email: req.body.email })
        if (!list) {
            return res.status(403).json({
                success: false,
                message: "Members not found"
            })
        }
        res.status(200).json({
            success: true,
            list
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })


    }



}








const MemberEdit = async (req, res) => {
    try {
        const { fullName, contact_no } = req.body
        const { birthplace, sex, hometown, nation, religion, identification,daysOfIdentity,bankOfIssue,placeOfIssue,facebook,linkedIn,skype,status,maritalStatus,jobPosition,workPlace, resident, currentAddress, literacy, bankAccount, bankName } = req.body

        const response = await decodeToken(req, res);
        //console.log("response", response)
        const user = await Users.findOne({ email: response.email });
        //console.log("user", user);
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User not found"
            })

        }
        const phone = await Users.findOne({ contact_no: req.body.contact_no });
        if (phone) {
            return res.status(403).json({
                success: false,
                message: "Contact no. already exist"
            })
        }
        const metaUpdate = await MetaData.updateOne({ _id: user.MetaUser._id }, {
            $set: {
                birthplace,
                sex, hometown, nation, religion, identification,daysOfIdentity,bankOfIssue,placeOfIssue,facebook,linkedIn,skype,status,maritalStatus,jobPosition,workPlace, resident, currentAddress, literacy, bankAccount, bankName
            }
        })

        const data = await Users.updateOne({ email: response.email }, { $set: req.body })

        if (data)
            return res.status(200).json({
                success: true,
                message: "Updated successfully"
            })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })

    }

}

const MemberDelete = async (req, res) => {
    try {
        const response = await decodeToken(req, res);

        if (response.role !== "HR") {
            return res.status(403).json({
                success: false,
                message: "Your job profile not match  to see this page"
            })
        }


        const user = await Users.findOne({ email: req.body.email })
        //console.log("USER",user)
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User not found"
            })
        }
        const data = await Users.deleteMany({ email: req.body.email })
        return res.status(200).json({
            success: true,
            data,
            message: "Deleted Successfully"

        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error
        })

    }

}



module.exports = { register, login, MemberList, MemberEdit, MemberDelete, MembersList }