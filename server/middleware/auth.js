const jwt = require("jsonwebtoken");

const ensureAuth = (req, res, next) => {
  try {
    if(!req.headers.authorization) return next(); 
    
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      req.userId = decodedToken?.id
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = ensureAuth;
