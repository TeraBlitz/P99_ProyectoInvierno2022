import React from "react";
import { useState } from "react";
function CreateClass({ createClasses }) {
  const [coursename, setCoursename] = useState("");
  const [level, setLevel] = useState("");
  const [teacher, setTeacher] = useState("");
  const [weeklyfrequency, setWeeklyfrequency] = useState("");
  const [maximumcapacity, setMaximumcapacity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createClasses({
      coursename,
      level,
      teacher,
      weeklyfrequency,
      maximumcapacity,
    });
    setCoursename('')
    setLevel('')
    setTeacher('')
    setWeeklyfrequency('')
    setMaximumcapacity('')
  };

  return (
    <div className="form--data">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Curso: </label>
          <input
            placeholder="Escribe el curso"
            onChange={(e) => setCoursename(e.target.value)}
            value={coursename}
          ></input>
        </div>
        <br />
        <div>
          <label>Nivel: </label>
          <input
            placeholder="Escribe el nivel"
            onChange={(e) => setLevel(e.target.value)}
            value={level}
          ></input>
        </div>
        <br />
        <div>
          <label>Profesor: </label>
          <input
            placeholder="Escribe el profesor"
            onChange={(e) => setTeacher(e.target.value)}
            value={teacher}
          ></input>
        </div>
        <br />
        <div>
          <label>Frecuencia semanal: </label>
          <input
            placeholder="Escribe la frecuencia semanal"
            onChange={(e) => setWeeklyfrequency(e.target.value)}
            value={weeklyfrequency}
          ></input>
        </div>
        <br />
        <div>
          <label>Capacidad: </label>
          <input
            placeholder="Escribe la capacidad"
            onChange={(e) => setMaximumcapacity(e.target.value)}
            value={maximumcapacity}
          ></input>
        </div>
        <br />
        <button>Guardar</button>
      </form>
    </div>
  );
}

export default CreateClass;
