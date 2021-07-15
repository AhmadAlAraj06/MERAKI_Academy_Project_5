const jwt = require("jsonwebtoken");
const db = require("./../../../db/db");
const bcrypt = require("bcrypt");

const login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = `SELECT * FROM user WHERE username = ? ;`;
  const data = [username];

  db.query(query, data, async (err, result) => {
    if (!result[0]) {
      return res.json("the username doesn't exist");
    }
    const confirm = await bcrypt.compare(password, result[0].password);
    if (confirm) {
      const payload = {
        name: result[0].name,
        password: result[0].password,
      };
      const options = {
        expiresIn: "1d",
      };
      res
        .status(200)
        .json({
          token: jwt.sign(payload, process.env.SECRET, options),
          message: "valid login",
          user: result[0],
        });
    } else return res.json("The password is not correct");
  });
};

module.exports = {
  login,
};
