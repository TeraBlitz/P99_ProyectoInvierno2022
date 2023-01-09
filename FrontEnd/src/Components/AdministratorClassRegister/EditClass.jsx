import React from "react";
import { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Button, Box } from "@mui/material";

const EditClass = (props) => {
  useEffect(() => {
    setClase(props.claseActual);
  }, [props]);

  const [clase, setClase] = useState(props.claseActual);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClase({ ...clase, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      clase.coursename &&
      clase.level &&
      clase.teacher &&
      clase.weeklyfrequency &&
      clase.maximumcapacity
    )
      props.updateClass(clase);
  };

  return (
    <Box className="form--data">
      <form>
        <InputLabel className=" form--title">Actualiza una clase</InputLabel>
        <div>
          <InputLabel>Curso: </InputLabel>
          <Input
            placeholder="Escribe el curso"
            type="text"
            value={clase.coursename}
            name="coursename"
            onChange={handleChange}
            autoFocus
          ></Input>
        </div>
        <br />
        <div>
          <InputLabel>Nivel: </InputLabel>
          <Input
            placeholder="Escribe el nivel"
            type="number"
            name="level"
            value={clase.level}
            onChange={handleChange}
          ></Input>
        </div>
        <br />
        <div>
          <InputLabel>Profesor: </InputLabel>
          <Input
            placeholder="Escribe el profesor"
            type="text"
            name="teacher"
            value={clase.teacher}
            onChange={handleChange}
          ></Input>
        </div>
        <br />
        <div>
          <InputLabel>Frecuencia semanal: </InputLabel>
          <Input
            placeholder="Escribe la frecuencia semanal"
            type="text"
            name="weeklyfrequency"
            value={clase.weeklyfrequency}
            onChange={handleChange}
          ></Input>
        </div>
        <br />
        <div>
          <InputLabel>Capacidad: </InputLabel>
          <Input
            placeholder="Escribe la capacidad"
            type="number"
            name="maximumcapacity"
            value={clase.maximumcapacity}
            onChange={handleChange}
          ></Input>
        </div>
        <br />
        <div className="button--center">
          <Button type="submit" onClick={handleSubmit} variant="text">
            Actualiza
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default EditClass;
