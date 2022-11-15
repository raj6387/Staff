const express = require("express");
const { uploads } = require("./controller/Media");
const router = express.Router()
const { register, login, MemberList, MemberEdit, MemberDelete, MembersList } = require("./controller/Member");
const { changePassword } = require("./controller/ChangePassword")
const { Metadata } = require("./controller/MetaUser");
const { verifyToken } = require("./middleware/auth");
const { upload } = require("./middleware/Media");
router.post("/member/register", register)
router.post("/member/login", login)
router.get("/member/list",verifyToken, MemberList)
router.get("/members/list",verifyToken,MembersList)
router.post("/member/edit", verifyToken, MemberEdit)
router.delete("/member/delete",verifyToken, MemberDelete)
router.post('/changePassword', verifyToken, changePassword);
router.post("/meta/data/save", Metadata)
router.post("/upload", upload, uploads)
module.exports = router