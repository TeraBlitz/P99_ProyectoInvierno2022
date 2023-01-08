import React from "react";
import { useState } from "react";

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
    // Form
    
    <div className="form--data">
      <form onSubmit={handleSubmit}>
      <div><label className="body-admin--title, form--title">Crea una clase</label></div>
          <br /> 
        <div>       
          <label>Curso: </label>
          <input
            placeholder="Escribe el curso"
            onChange={(e) => setCoursename(e.target.value)}
            value={coursename}
            type="text"
            name="coursename"
            autoFocus
          ></input>
        </div>
        <br />
        <div>
          <label>Nivel: </label>
          <input
            placeholder="Escribe el nivel"
            type="number"
            name="level"
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          ></input>
        </div>
        <br />
        <div>
          <label>Profesor: </label>
          <input
            placeholder="Escribe el profesor"
            type="text"
            name="teacher"
            onChange={(e) => setTeacher(e.target.value)}
            value={teacher}
          ></input>
        </div>
        <br />
        <div>
          <label>Frecuencia semanal: </label>
          <input
            placeholder="Escribe la frecuencia semanal"
            type="text"
            name="weeklyfrequencyr"
            onChange={(e) => setWeeklyfrequency(e.target.value)}
            value={weeklyfrequency}
          ></input>
        </div>
        <br />
        <div>
          <label>Capacidad: </label>
          <input
            placeholder="Escribe la capacidad"
            type="number"
            name="maximumcapacity"
            onChange={(e) => setMaximumcapacity(e.target.value)}
            value={maximumcapacity}
          ></input>
        </div>
        <br />
        <div className="button--center">
        <button >Crear</button>
        </div>
      </form>
    </div>
  );
}