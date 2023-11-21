const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { body, validationResult } = require("express-validator");

const connection = require("../config/db");
const { error } = require("console");


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

router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM mobil ORDER BY id_mobil DESC",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Failed",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Mobil",
          data: rows,
        });
      }
    }
  );
});

router.post(
  "/store",
  upload.single("gambar_mobil"),
  [
    body("nama_mobil").notEmpty(),
    body("model_mobil").notEmpty(),
    body("tahun_pembuatan").notEmpty(),
    body("warna_mobil").notEmpty(),
    body("harga_sewa").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const data = {
      nama_mobil: req.body.nama_mobil,
      model_mobil: req.body.model_mobil,
      tahun_pembuatan: req.body.tahun_pembuatan,
      warna_mobil: req.body.warna_mobil,
      harga_sewa: req.body.harga_sewa,
      gambar_mobil: req.file.filename,
    };

    connection.query("INSERT INTO mobil SET ?", data, function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Success",
          data: result,
        });
      }
    });
  }
);

router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM mobil WHERE id_mobil = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      }
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Not Found",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "Data Mobil",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  upload.single("gambar_mobil"),
  [
    body("nama_mobil").notEmpty(),
    body("model_mobil").notEmpty(),
    body("tahun_pembuatan").notEmpty(),
    body("warna_mobil").notEmpty(),
    body("harga_sewa").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    let id = req.params.id;
    let Data = {
      nama_mobil: req.body.nama_mobil,
      model_mobil: req.body.model_mobil,
      tahun_pembuatan: req.body.tahun_pembuatan,
      warna_mobil: req.body.warna_mobil,
      harga_sewa: req.body.harga_sewa,
      gambar_mobil: req.file.filename,
    };

    connection.query(
      `UPDATE mobil SET ? WHERE id_mobil = ${id}`,
      Data,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Update Success..!",
          });
        }
      }
    );
  }
);

router.delete("/delete/:id", function (req, res) {
  let id = req.params.id;

  connection.query(
    `SELECT * FROM mobil WHERE id_mobil = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
        });
      }

      if (rows.length === 0) {
        return res.status(404).json({
          status: false,
          message: "Not Found",
        });
      }

      const namaFileLama = rows[0].gambar;

      if (namaFileLama) {
        const pathFileLama = path.join(
          __dirname,
          "../public/Images",
          namaFileLama
        );
        fs.unlinkSync(pathFileLama);
      }

      connection.query(
        `DELETE FROM mobil WHERE id_mobil = ${id}`,
        function (err, rows) {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "Server Error",
              error: err,
            });
          } else {
            return res.status(200).json({
              status: true,
              message: "Data has been deleted",
            });
          }
        }
      );
    }
  );
});


module.exports = router;
