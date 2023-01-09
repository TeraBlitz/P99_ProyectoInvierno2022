import React from "react";
import { useState } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { Button, Box } from "@mui/material";

export default function CreateClass({ createClasses }) {
  //States
  const [coursename, setCoursename] = useState("");
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [weeklyfrequency, setWeeklyfrequency] = useState("");
  const [maximumcapacity, setMaximumcapacity] = useState("");

  // Send information
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      coursename !== "" &&
      level !== "" &&
      teacher !== "" &&
      weeklyfrequency !== "" &&
      maximumcapacity !== ""
    ) {
      createClasses({
        coursename,
        level,
        teacher,
        weeklyfrequency,
        maximumcapacity,
      });
      setCoursename("");
      setLevel("");
      setTeacher("");
      setWeeklyfrequency("");
      setMaximumcapacity("");
    } else {
      alert("No se puede enviar, si hay algo vacio");
    }
  };

  return (
    <Box className="form--data">
      <form>
        <InputLabel className=" form--title">Crea una clase</InputLabel>
        <br />
        <div>
          <InputLabel>Curso: </InputLabel>
          <Input
            placeholder="Escribe el curso"
            onChange={(e) => setCoursename(e.target.value)}
            value={coursename}
            type="text"
            name="coursename"
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
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          ></Input>
        </div>
        <br />
        <div>
          <InputLabel>Profesor: </InputLabel>
          <Input
            placeholder="Escribe el profesor"
            type="text"
            name="teacher"
            onChange={(e) => setTeacher(e.target.value)}
            value={teacher}
          ></Input>
        </div>
        <br />
        <div>
          <InputLabel>Frecuencia semanal: </InputLabel>
          <Input
            placeholder="Escribe la frecuencia semanal"
            type="text"
            name="weeklyfrequencyr"
            onChange={(e) => setWeeklyfrequency(e.target.value)}
            value={weeklyfrequency}
          ></Input>
        </div>
        <br />
        <div>
          <InputLabel>Capacidad: </InputLabel>
          <Input
            placeholder="Escribe la capacidad"
            type="number"
            name="maximumcapacity"
            onChange={(e) => setMaximumcapacity(e.target.value)}
            value={maximumcapacity}
          ></Input>
        </div>
        <br />
        <div className="button--center">
          <Button type="submit" variant="text" onClick={handleSubmit}>
            Crear
          </Button>
        </div>
      </form>
    </Box>
  );
}
