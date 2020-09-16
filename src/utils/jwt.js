const jwt = require("jsonwebtoken");
const { valid } = require("joi");
const { JWT_KEY } = process.env;

// access token
// refresh token -> oauth, sso
function generateToken(id) {
  const token = jwt.sign({ id }, JWT_KEY, { expiresIn: "1h" });

  return token;
}

function validateToken(token) {
  let decoded;
  try {
    decoded = jwt.verify(token, JWT_KEY);
  } catch (e) {
    return null;
  }
  return decoded;
}

module.exports = { generateToken, validateToken };
