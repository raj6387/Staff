const MetaData = require("../model/MetaUser")
const Metadata = async (req, res) => {
    try {
        const { Birthplace, Sex, Hometown, Nation, Religion, Identification, Resident, CurrentAddress, Literacy, BankAccount, BankName } = req.body
        
        const data = new MetaData({
            Birthplace,
            Sex,
            Hometown,
            Nation,
            Religion,
            Identification,
            Resident,
            CurrentAddress,
            Literacy,
            BankAccount,
            BankName,
        
        })
        await data.save()
        res.status(200).json({
            success: true,
            message: "Information Registered"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            messsage: error
        })

    }

}
module.exports = { Metadata }