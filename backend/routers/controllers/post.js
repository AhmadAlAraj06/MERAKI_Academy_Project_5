const db = require("./../../../backend/db/db");

const createPost = (req, res) => {
  const query = `INSERT INTO post (userId  ,type ,title,description ,url) VALUES (?,?,?,?,?)`;
  let { userId, type, title, description, url } = req.body;
  const data = [userId, type, title, description, url];
  db.query(query, data, (err, result) => {
    if (err) return res.status(400).send("can't create post try again please ");
    res.status(201).json(result);
  });
};

const getAllPost = (req, res) => {
  const query = `SELECT * FROM POST`;
  db.query(query, (err, result) => {
    if (err) return res.status(400).send("can't create post try again please ");
    res.status(201).json(result);
  });
};

const getPostById = async (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM post WHERE _IdPost = ?`;
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) return res.status(400).send("post not found");
    res.status(200).json(result);
  });
};
const getPostByTitle = async (req, res) => {
  const title = req.params.title;
  const query = `SELECT * FROM post WHERE title = ?`;
  const data = [title];
  db.query(query, data, (err, result) => {
    if (err) return res.status(400).send("post not found");
    res.status(200).json(result);
  });
};
const deletePost = async (req, res) => {
  const id = req.params.id;
  const query = `DELETE FROM post WHERE _IdPost = ?`;
  const data = [id];
  db.query(query, data, (err, result) => {
    if (err) return res.status(400).send("can;t delete post try again please");
    res.status(200).json("success deleted");
  });
};

module.exports = {
  createPost,
  getAllPost,
  getPostById,
  getPostByTitle,
  deletePost,
};
