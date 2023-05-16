import { db } from "../connect.js"
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {
  const q = `SELECT c.*, u.id, u.name, u.profilePic FROM comments as c JOIN users as u ON (u.id = c.user_id) WHERE c.post_id = ? ORDER BY c.creation_date DESC`

  db.query(q, [req.query.postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  })
}

export const addComment = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is Not valid");
    const q = "INSERT INTO comments(`desc`, `creation_date`, `user_id`, `post_id`) VALUES(?)"

    console.log(req.body);

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.post_id
    ]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been created");
    })
  })
}