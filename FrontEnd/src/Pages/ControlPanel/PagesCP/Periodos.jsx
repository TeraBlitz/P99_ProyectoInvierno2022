import React, { useState, useEffect } from "react";
import "./periodos.css";
import axios from "axios";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
export default function Periodos() {
  // config de modal estilo

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //DAtos
  const [data, setData] = useState([]);
  //----------------------Obtencion de datos de la base de datos
  const getPeriodos = () => {
    axios
      .get("http://127.0.0.1:3000/v1/periodos")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPeriodos();
  }, []);

  // Variables para agregar tarjeta
  const [modalInsertar, setModalInsertar] = useState(false);
  const [clave, setClave] = useState("");
  const [status, setStatus] = useState("");
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");
  const [fecha_inicio_insc, setFecha_inicio_insc] = useState("");
  const [fecha_fin_insc, setFecha_fin_insc] = useState("");
  const [cursos_max_por_alumno, setCursos_max_por_alumno] = useState("");
  const [idiomas_max_por_alumno, setidiomas_max_por_alumno] = useState("");

  // Modal abrir y cerrar
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  //procedimiento para crear datos
  const postCrea = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:3000/v1/periodos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          clave: clave,
          status: status,
          fecha_inicio: fecha_inicio + ":00",
          fecha_fin: fecha_fin + ":00",
          fecha_inicio_insc: fecha_inicio_insc + ":00",
          fecha_fin_insc: fecha_fin_insc + ":00",
          cursos_max_por_alumno: cursos_max_por_alumno,
          idiomas_max_por_alumno: idiomas_max_por_alumno,
        }),
      });
      abrirCerrarModalInsertar();
      getPeriodos();
      setClave("");
      setStatus("");
      setFecha_inicio("");
      setFecha_fin("");
      setFecha_inicio_insc("");
      setFecha_fin_insc("");
      setCursos_max_por_alumno("");
      setidiomas_max_por_alumno("");
      console.log(fecha_inicio);
    } catch (error) {
      console.log(error);
    }
  };

  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [consolaSeleccionada, setConsolaSeleccionada] = useState({
    _id: "",
    clave: "",
    status: "",
    fecha_inicio: "",
    fecha_fin: "",
    fecha_inicio_insc: "",
    fecha_fin_insc: "",
    cursos_max_por_alumno: "",
    idiomas_max_por_alumno: "",
  });

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  // Funcion para eliminar o editar
  const seleccionarConsola = (consola, caso) => {
    setConsolaSeleccionada(consola);
    if (caso === "Editar") {
      abrirCerrarModalEditar();
    } else {
      abrirCerrarModalEliminar();
    }
  };

  // Procedimiento para eliminar
  const postDelete = async (e) => {
    try {
      await fetch("http://127.0.0.1:3000/v1/periodos/delete", {
        method: "Delete",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _id: consolaSeleccionada._id,
        }),
      });
      abrirCerrarModalEliminar();
      getPeriodos();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setConsolaSeleccionada((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if(name === "fecha_inicio"){
      consolaSeleccionada.fecha_inicio = consolaSeleccionada.fecha_inicio+':00'
    } 
    if(name === "fecha_fin"){
      consolaSeleccionada.fecha_fin = consolaSeleccionada.fecha_fin+':00'
    } 
    if(name === "fecha_inicio_insc"){
      consolaSeleccionada.fecha_inicio_insc = consolaSeleccionada.fecha_inicio_insc+':00'
    } 
    if(name === "fecha_fin_insc"){
      consolaSeleccionada.fecha_fin_insc = consolaSeleccionada.fecha_fin_insc+':00'
    } 
    //console.log(consolaSeleccionada);
  };
  // Editar
  const postEditar = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://127.0.0.1:3000/v1/periodos/update", {
        method: "Put",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          _id: consolaSeleccionada._id,
          clave: consolaSeleccionada.clave,
          status: consolaSeleccionada.status,
          fecha_inicio: consolaSeleccionada.fecha_inicio ,
          fecha_fin: consolaSeleccionada.fecha_fin,
          fecha_inicio_insc: consolaSeleccionada.fecha_inicio_insc,
          fecha_fin_insc: consolaSeleccionada.fecha_fin_insc,
          cursos_max_por_alumno: consolaSeleccionada.cursos_max_por_alumno,
          idiomas_max_por_alumno: consolaSeleccionada.idiomas_max_por_alumno,
        }),
      });
      abrirCerrarModalEditar();
      getPeriodos();
    } catch (error) {
      console.log(error);
    }
  };
  const debug = "debug";
  return (
    <div className="container">
      <h1>Periodos</h1>

      <Button variant="contained" onClick={() => abrirCerrarModalInsertar()}>
        Nuevo Periodo
      </Button>
      <Modal
        open={modalInsertar}
        onClose={() => abrirCerrarModalInsertar()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={style}>
          <Typography variant="h5" component="div">
            Ingrese los nuevos datos
          </Typography>
          <div className="spacer"></div>

          <div>
            <TextField
              style={{ paddingBottom: "15px", fontFamily: "arial" }}
              label="Clave"
              name="clave"
              onChange={(e) => setClave(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: "15px", fontFamily: "arial" }}
              label="Status"
              name="status"
              onChange={(e) => setStatus(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: "15px", fontFamily: "arial" }}
              label="Fecha de inicio"
              name="fecha_inicio"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFecha_inicio(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: "15px", fontFamily: "arial" }}
              label="fecha de Fin"
              name="fecha_fin"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFecha_fin(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: "15px", fontFamily: "arial" }}
              label="Fecha de inicio de incripciones"
              name="fecha_inicio_insc"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFecha_inicio_insc(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: "15px", fontFamily: "arial" }}
              label="Fecha de fin de inscripciones"
              name="fecha_fin_insc"
              id="datetime-local"
              type="datetime-local"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setFecha_fin_insc(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: "15px", fontFamily: "arial" }}
              label="Cursos Maximos por Alumno"
              name="cursos_max_por_alumno"
              onChange={(e) => setCursos_max_por_alumno(e.target.value)}
              autoFocus
            />
            <TextField
              style={{ paddingBottom: "15px", fontFamily: "arial" }}
              label="Idiomas Max"
              name="idiomas_max_por_alumno"
              onChange={(e) => setidiomas_max_por_alumno(e.target.value)}
              autoFocus
            />
            <Button color="primary" variant="contained" onClick={postCrea}>
              Insertar
            </Button>
            <Button
              variant="contained"
              onClick={() => abrirCerrarModalInsertar()}
              color="error"
            >
              Cancelar
            </Button>
          </div>
        </Card>
      </Modal>

      <div className="card-grid">
        {data.map((item) => (
          <Card key={item._id} sx={{ minWidth: 275, bgcolor: "grey.200" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {item.clave}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.status}
              </Typography>
              <h5 className="leyendaFaltas">Fecha de inicio: </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.fecha_inicio}
              </Typography>

              <h5 className="leyendaFaltas">Fecha de cierre: </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.fecha_fin}
              </Typography>

              <h5 className="leyendaFaltas">
                Fecha de inicio de _inscripciones:{" "}
              </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.fecha_inicio_insc}
              </Typography>

              <h5 className="leyendaFaltas">
                Fecha de cierre de inscripciones:{" "}
              </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.fecha_fin_insc}
              </Typography>
              <h5 className="leyendaFaltas">Cursos Maximos por Alumno </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.cursos_max_por_alumno}
              </Typography>
              <h5 className="leyendaFaltas">Idiomas Maximos por Alumno </h5>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {item.idiomas_max_por_alumno}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                onClick={() => seleccionarConsola(item, "Editar")}
              >
                Editar
              </Button>

              <div className="spacer-botones"></div>

              <Button
                variant="contained"
                color="error"
                onClick={() => seleccionarConsola(item, "Eliminar")}
              >
                Borrar Periodo
              </Button>

              <Modal
                open={modalEliminar}
                onClose={abrirCerrarModalEliminar}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Card sx={style}>
                  <Typography variant="h5" component="div">
                    Estas seguro de borrar este periodo?
                  </Typography>
                  <div className="spacer"></div>
                  <div className="spacer-botones"></div>
                  <Button
                    color="error"
                    variant="contained"
                    onClick={postDelete}
                  >
                    Borrar
                  </Button>
                  <Button
                    onClick={() => abrirCerrarModalEliminar()}
                    color="primary"
                    variant="contained"
                  >
                    Cancelar
                  </Button>
                </Card>
              </Modal>

              <Modal
                open={modalEditar}
                onClose={() => abrirCerrarModalEditar()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Card sx={style}>
                  <Typography variant="h5" component="div">
                    Ingrese los nuevos datos
                  </Typography>
                  <div className="spacer"></div>

                  <div>
                    <TextField
                      style={{ paddingBottom: "15px", fontFamily: "arial" }}
                      label="Clave"
                      defaultValue={
                        consolaSeleccionada && consolaSeleccionada.clave
                      }
                      name="clave"
                      onChange={handleChange}
                      autoFocus
                    />
                    <TextField
                      style={{ paddingBottom: "15px", fontFamily: "arial" }}
                      label="Status"
                      defaultValue={
                        consolaSeleccionada && consolaSeleccionada.status
                      }
                      name="status"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: "15px", fontFamily: "arial" }}
                      label="Fecha de inicio"
                      defaultValue={
                        consolaSeleccionada && consolaSeleccionada.fecha_inicio
                      }
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_inicio"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: "15px", fontFamily: "arial" }}
                      label="fecha de Fin"
                      defaultValue={
                        consolaSeleccionada && consolaSeleccionada.fecha_fin
                      }
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_fin"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: "15px", fontFamily: "arial" }}
                      label="Fecha de inicio de incripciones"
                      defaultValue={
                        consolaSeleccionada &&
                        consolaSeleccionada.fecha_inicio_insc
                      }
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_inicio_insc"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: "15px", fontFamily: "arial" }}
                      label="Fecha de fin de inscripciones"
                      defaultValue={
                        consolaSeleccionada &&
                        consolaSeleccionada.fecha_fin_insc
                      }
                      id="datetime-local"
                      type="datetime-local"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      name="fecha_fin_insc"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: "15px", fontFamily: "arial" }}
                      label="Cursos Maximos por Alumno"
                      defaultValue={
                        consolaSeleccionada &&
                        consolaSeleccionada.cursos_max_por_alumno
                      }
                      name="cursos_max_por_alumno"
                      onChange={handleChange}
                    />
                    <TextField
                      style={{ paddingBottom: "15px", fontFamily: "arial" }}
                      label="Idiomas Max"
                      defaultValue={
                        consolaSeleccionada &&
                        consolaSeleccionada.idiomas_max_por_alumno
                      }
                      name="idiomas_max_por_alumno"
                      onChange={handleChange}
                    />

                    <Button
                      color="primary"
                      variant="contained"
                      onClick={postEditar}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => abrirCerrarModalInsertar()}
                      color="error"
                    >
                      Cancelar
                    </Button>
                  </div>
                </Card>
              </Modal>
            </CardActions>
          </Card>
        ))}
        <div className="spacer"></div>
      </div>
    </div>
  );
}
