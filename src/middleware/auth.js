const jwt = require("jsonwebtoken");
const secretkey = "qwertyuiopasdfghjklzxcvbnm";

const generateToken = async ({ email, role }) => {
  const token = jwt.sign({ email, role }, secretkey);
  //console.log(token)
  return token;
};


const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        success: false,
        message: "Invalid Token"
      })
    }

    const auth = await req.headers.authorization.split(" ")[1];

    const verify = jwt.verify(auth, secretkey)
    if (verify) {
      next()
    }

  } catch (error) {
    //console.log("error",error)
    return res.status(400).json({
      success: false,
      message: "Please login again"
    })
  }
}
const decodeToken = async (req, res) => {
  if (!req.headers.authorization) {
    return res.status(403).json({
      success: false,
      message: "Invalid Token"
    })
  }

  const auth = await req.headers.authorization.split(" ")[1];
  //console.log("auth",auth);

  const decode = jwt.decode(auth, secretkey)
  //console.log("decode",decode)
  return decode

}
module.exports = { generateToken, verifyToken, decodeToken }





