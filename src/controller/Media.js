const Medias = require("../model/Media")
const uploads = async (req, res) => {
    const upload = new Medias({ path: req.file.path });
    await upload.save();
    res.status(200).json({
        success: true,
        message: "Image uploaded successfuly",
    });
};
module.exports = { uploads }