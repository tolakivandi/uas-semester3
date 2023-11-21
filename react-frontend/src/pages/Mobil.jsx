import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import HomeNav from "./HomeNav";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";

export default function Mobil() {
  const [mobil, setMobil] = useState([]);
  const url = "http://localhost:3001/static/";

  useEffect(() => {
    fetchData();
  }, []);

  const resetFrom = () => {
    setNama("");
    setModel("");
    setTahunPembuatan("");
    setWarna("");
    setHargaSewa("");
    setGambar("");
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/mobil");
      const data = response.data.data;
      setMobil(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleshow = () => {
    onOpen();
  };
  const [nama, setNama] = useState("");
  const [model, setModel] = useState("");
  const [tahunPembuatan, setTahunPembuatan] = useState("");
  const [warna, setWarna] = useState("");
  const [hargaSewa, setHargaSewa] = useState("");
  const [gambar, setGambar] = useState(null);
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const handleNamaChange = (e) => {
    setNama(e.target.value);
  };
  const handleModelChange = (e) => {
    setModel(e.target.value);
  };
  const handleTahunPembuatanChange = (e) => {
    setTahunPembuatan(e.target.value);
  };
  const handleWarnaChange = (e) => {
    setWarna(e.target.value);
  };
  const handleHargaSewaChange = (e) => {
    setHargaSewa(e.target.value);
  };

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("nama_mobil", nama);
    formData.append("model_mobil", model);
    formData.append("tahun_pembuatan", tahunPembuatan);
    formData.append("warna_mobil", warna);
    formData.append("harga_sewa", hargaSewa);
    formData.append("gambar_mobil", gambar);

    try {
      await axios.post("http://localhost:3001/api/mobil/store", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/mobil");
      fetchData();
      resetFrom();
    } catch (error) {
      console.error("Kesalahan:", error);
      setValidation(error.response.data);
    }
  };
  return (
    <>
      <HomeNav />
      {/* modal */}
      <div className="pl-20">
        <Button onClick={handleshow}>Open Modal</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  TAMBAH DATA MOBIL
                </ModalHeader>
                <ModalBody>
                  <form>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                      <Input
                        type="text"
                        label="NAMA MOBIL"
                        value={nama}
                        onChange={handleNamaChange}
                      />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                      <Input
                        type="text"
                        label="MODEL MOBIL"
                        value={model}
                        onChange={handleModelChange}
                      />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                      <Input
                        type="text"
                        label="TAHUN PEMBUATAN"
                        value={tahunPembuatan}
                        onChange={handleTahunPembuatanChange}
                      />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                      <Input
                        type="text"
                        label="WARNA MOBIL"
                        value={warna}
                        onChange={handleWarnaChange}
                      />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                      <Input
                        type="text"
                        label="HARGA SEWA"
                        value={hargaSewa}
                        onChange={handleHargaSewaChange}
                      />
                    </div>
                    <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                      <Input
                        type="file"
                        label=""
                        onChange={handleGambarChange}
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    onClick={handleSubmit}
                    onPress={onClose}
                  >
                    simpan
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      {/* akhir */}
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAMA MOBIL</TableColumn>
          <TableColumn>MODEL MOBIL</TableColumn>
          <TableColumn>TAHUN PEMBUATAN</TableColumn>
          <TableColumn>WARNA MOBIL</TableColumn>
          <TableColumn>HARGA SEWA</TableColumn>
          <TableColumn>GAMBAR</TableColumn>
        </TableHeader>
        <TableBody>
          {mobil.map((mh, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{mh.nama_mobil}</TableCell>
              <TableCell>{mh.tahun_pembuatan}</TableCell>
              <TableCell>{mh.warna_mobil}</TableCell>
              <TableCell>{mh.harga_sewa}</TableCell>
              <TableCell>
                <Image
                  isZoomed
                  width={100}
                  src={`http://127.0.0.1:3001/static/${mh.gambar_mobil}`}
                  alt={`Gambar ${mh.nama_mobil}`}
                  classNames=""
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
