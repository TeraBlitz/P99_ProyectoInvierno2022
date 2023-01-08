import React from "react";
import { useState,useEffect } from "react";

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
    if (clase.coursename && clase.level && clase.teacher && clase.weeklyfrequency && clase.maximumcapacity) props.updateClass(clase);
  };

  return (
    <div className="form--data">
      <form>
        <div>
          <label className="body-admin--title, form--title">
            Actualiza una clase
          </label>
        </div>
        <br />
        <div>
          <label>Curso: </label>
          <input
            placeholder="Escribe el curso"
            type="text" value={clase.coursename} name="coursename" onChange={handleChange}
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
            value={clase.level} onChange={handleChange}
          ></input>
        </div>
        <br />
        <div>
          <label>Profesor: </label>
          <input
            placeholder="Escribe el profesor"
            type="text"
            name="teacher"
            value={clase.teacher}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <div>
          <label>Frecuencia semanal: </label>
          <input
            placeholder="Escribe la frecuencia semanal"
            type="text"
            name="weeklyfrequencyr"
            value={clase.weeklyfrequency}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <div>
          <label>Capacidad: </label>
          <input
            placeholder="Escribe la capacidad"
            type="number"
            name="maximumcapacity"
            value={clase.maximumcapacity}
            onChange={handleChange}
          ></input>
        </div>
        <br />
        <div className="button--center">
          <button type="submit" onClick={handleSubmit}>Actualiza</button>
        </div>
      </form>
    </div>
  );
};

export default EditClass;
