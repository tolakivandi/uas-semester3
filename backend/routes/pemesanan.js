const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const connection = require("../config/db");

router.get("/", function (req, res) {
  connection.query(
    "SELECT pemesanan.id_pemesanan, mobil.nama_mobil, pemesanan.tanggal_sewa, pemesanan.tanggal_kembali, pemesanan.status FROM pemesanan JOIN mobil ON pemesanan.id_mobil = mobil.id_mobil ORDER BY id_pemesanan DESC",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Server Failed",
          error: err
        });
      }

      return res.status(200).json({
        status: true,
        message: "Data Mahasiswa",
        data: rows,
      });
    }
  );
});

router.post(
  "/store",
  [
    body("id_mobil").notEmpty(),
    body("tanggal_sewa").notEmpty(),
    body("tanggal_kembali").notEmpty(),
    body("status").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    let Data = {
      id_mobil: req.body.id_mobil,
      tanggal_sewa: req.body.tanggal_sewa,
      tanggal_kembali: req.body.tanggal_kembali,
      status: req.body.status,
    };

    connection.query("INSERT INTO pemesanan SET ?", Data, function (err, rows) {
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
          data: rows[0],
        });
      }
    });
  }
);

router.get("/:id", function (req, res) {
  let id = req.params.id;
  connection.query(
    `SELECT * FROM pemesanan WHERE id_pemesanan = ${id}`,
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
          message: "Data pemesanan",
          data: rows[0],
        });
      }
    }
  );
});

router.patch(
  "/update/:id",
  [
    body("id_mobil").notEmpty().isInt(),
    body("tanggal_sewa").notEmpty(),
    body("tanggal_kembali").notEmpty(),
    body("status").notEmpty(),
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
      id_mobil: req.body.id_mobil,
      tanggal_sewa: req.body.tanggal_sewa,
      tanggal_kembali: req.body.tanggal_kembali,
      status: req.body.status,
    };

    connection.query(
      `UPDATE pemesanan SET ? WHERE id_pemesanan = ${id}`,
      Data,
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
    `SELECT * FROM pemesanan WHERE id_pemesanan = ${id}`,
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
        `DELETE FROM pemesanan WHERE id_pemesanan = ${id}`,
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
