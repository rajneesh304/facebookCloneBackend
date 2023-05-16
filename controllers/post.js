import moment from "moment";
import { db } from "../connect.js"

import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {

  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is Not valid");
    const q = `SELECT p.id, p.*, u.id as user_id, u.name, u.profilePic FROM posts as p JOIN users as u ON (u.id = p.user_id) LEFT JOIN relationships as r ON (p.user_id = r.followed_user_id) WHERE r.follower_user_id = ? OR p.user_id = ?`

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      console.log(data);
      return res.status(200).json(data);
    })
  })
};


export const addPost = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is Not valid");
    const q = "INSERT INTO posts(`desc`,`img`, `creation_date`, `user_id`) VALUES(?)"

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id
    ]
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been created");
    })
  })
}