const { body, validationResult } = require("express-validator");
const express = require("express");
const router = express.Router();

const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query(
    "SELECT * FROM review ORDER BY reviewID DESC",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Failed",
          error: err,
        });
      } else {
        return res.status(200).json({
          status: true,
          data: rows,
        });
      }
    }
  );
});

router.post(
  "/store",
  [
    body("ulasan").notEmpty(),
    body("userID").notEmpty(),
    body("id_mobil").notEmpty(),
    body("penilaian").notEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    let data = {
      ulasan: req.body.ulasan,
      userID: req.body.userID,
      id_mobil: req.body.id_mobil,
      penilaian: req.body.penilaian,
    };

    connection.query("INSERT INTO review SET ?", data, function (err, result) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Error",
          error: err,
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
    `SELECT * FROM review WHERE reviewID = ${id}`,
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
          message: "Data review",
          data: rows[0],
        });
      }
    }
  );
});


router.patch(
  "/update/:id",
  [
    body("ulasan").notEmpty(),
    body("userID").notEmpty(),
    body("id_mobil").notEmpty(),
    body("penilaian").notEmpty(),
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
      ulasan: req.body.ulasan,
      userID: req.body.userID,
      id_mobil: req.body.id_mobil,
      penilaian: req.body.penilaian,
    };

    connection.query(
      `UPDATE review SET ? WHERE reviewID = ${id}`,
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
    `SELECT * FROM review WHERE reviewID = ${id}`,
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
        `DELETE FROM review WHERE reviewID = ${id}`,
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
