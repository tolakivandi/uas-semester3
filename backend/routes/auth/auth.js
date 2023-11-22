const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const connection = require("../../config/db");
const multer = require("multer");
const path = require("path");

const secretKey = "kunciRahasiaYangSama";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  "/register",
  upload.single("foto"),
  [
    body("username").notEmpty().withMessage("Isi semua bidang"),
    body("email").notEmpty().withMessage("Isi semua bidang"),
    body("password").notEmpty().withMessage("Isi semua bidang"),
    body("role").notEmpty().withMessage("Isi semua bidang"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { username, email, password } = req.body;
    const foto = req.file.filename;
    const checkUserQuery = "SELECT * FROM user WHERE username = ?";

    connection.query(checkUserQuery, [username], (err, results) => {
      if (err) {
        console.error("Error checking user:", err);
        return res.status(500).json({ error: "Server Error" });
      }

      if (results.length > 0) {
        return res.status(409).json({ error: "Pengguna sudah terdaftar" });
      }

      const insertUserQuery =
        "INSERT INTO user (username, email, foto, password, role) VALUES (?, ?, ?, ?, ?)";

      connection.query(
        insertUserQuery,
        [username, email, foto, password, "user"],
        (err, results) => {
          if (err) {
            console.error("Error inserting user:", err);
            return res.status(500).json({ error: "Server Error" });
          }

          const payload = { userId: results.insertId, username };
          const token = jwt.sign(payload, secretKey);
          const updateTokenQuery = "UPDATE user SET token = ? WHERE userId = ?";

          connection.query(
            updateTokenQuery,
            [token, payload.userId],
            (err, results) => {
              if (err) {
                console.error("Error updating token:", err);
                return res
                  .status(500)
                  .json({ error: "Server Error", msg: err });
              }

              res.json({ token });
            }
          );
        }
      );
    });
  }
);

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  connection.query(
    "SELECT * FROM user WHERE username = ?",
    [username],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          error: "Server Error",
        });
      }
      if (results.length === 0) {
        return res.status(401).json({
          error: "Gagal masuk",
          payload: {
            username,
            password,
          },
        });
      }
      const user = results[0];
      if (user.password !== password) {
        return res.status(401).json({ error: "Kata sandi salah" });
      }
      if (user.token) {
        const token = user.token;
        return res.json({ token });
      } else {
        const payload = { userId: user.id, username };
        const token = jwt.sign(payload, secretKey);
        const updateTokenQuery = "UPDATE user SET token = ? WHERE id = ?";
        connection.query(
          updateTokenQuery,
          [token, user.id],
          (err, updateResult) => {
            if (err) {
              return res.status(500).json({ error: "Server Error" });
            }
            res.json({ token });
          }
        );
      }
    }
  );
});

module.exports = router;
