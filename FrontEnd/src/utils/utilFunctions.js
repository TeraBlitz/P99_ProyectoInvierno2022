// Funcion para calcular edad, si es menor de 18 se pide
//  un nombre de Tutor al estudiante
export const calculateAge = (dateString) => {
  var birthday = +new Date(dateString);
  // The magic number: 31557600000 is 24 * 3600 * 365.25 * 1000, which is the length of a year
  const magic_number = 31557600000;
  return ~~((Date.now() - birthday) / (magic_number));
}

// ----------------------------------Funcion para ver periodo mas reciente
export const traducirDate = (raw) => {
  const date = raw.split('T', 2);
  return (date[0]);
}

export const traducirTime = (raw) => {
  const date = raw.split('T', 2);
  return (date[1]);
}

export const compararFecha = (data) => {
  const periodos = [];
  for (const element of data) {
    const fecha = traducirDate(element.fecha_inicio);
    const separado = fecha.split('-', 3);
    const valorA = Number(separado[0]);
    const valorM = Number(separado[1]) / 100;
    const valorD = Number(separado[2]) / 10000;
    const valorT = valorA + valorM + valorD;
    const obj = {
      id: element.clave,
      fecha: valorT,
    };
    periodos.push(obj);
  }

  periodos.sort((a, b) => b.fecha - a.fecha);
  const clave = String(periodos[0].id);
  return (clave);
}

// -------------------Funcion para contar cursos en periodo actual
export const contarClases = (datos) => {
  console.log('Este es la data inicial', datos);
  let contadorClases = 0;

  datos.forEach((element) => {
    // console.log("Periodo: ", element.clavePeriodo)
    if (element.clavePeriodo === periodoActual) {
      contadorClases += 1;
    }
  });

  // console.log("Clases",contadorClases)
  return (contadorClases);
}

// ---------------------------Funcion para contar profesores actuales
export const contarProfes = (datos) => {
  const listaProfes = [];
  datos.forEach((element) => {
    if (element.clavePeriodo === periodoActual) {
      if (listaProfes.includes(element.matriculaProfesor)) {

      } else {
        listaProfes.push(element.matriculaProfesor);
      }
    }
  });
  console.log(listaProfes);
  return (listaProfes.length);
}

// -------------------- Function para contar alumnos
export const contarAlumnos = (datos) => {
  let alumnos = 0;
  datos.forEach((element) => {
    if (element.clavePeriodo === periodoActual) {
      alumnos += Number(element.cupo_actual);
    }
  });
  return (alumnos);
}

// funciones para sacar asociar datos a periodos
export const encontrarProfes = (dataClase, clave) => {
  const listaProfes = [];
  dataClase.forEach((element) => {
    if (element.clavePeriodo === clave) {
      if (!listaProfes.includes(element.matriculaProfesor)) {
        listaProfes.push(element.matriculaProfesor);
      }
    }
  });
  return (listaProfes.length);
}

export const encontrarAlumnos = (dataClase, clave) => {
  let alumnosInscritos = 0;
  dataClase.forEach((element) => {
    if (element.clavePeriodo === clave) {
      alumnosInscritos += Number(element.cupo_actual);
    }
  });
  return (alumnosInscritos);
}

export const encontrarClases = (dataClase, clave) => {
  let clasesInscritas = 0;
  dataClase.forEach((element) => {
    if (element.clavePeriodo === clave) {
      clasesInscritas += 1;
    }
  });

  return (clasesInscritas);
}

export const mapNiveles = (clase, currentProfesor) => {
  const nivelesMap = {
    'desde cero': '1',
    'con bases': '2',
    intermedio: '3',
    avanzado: '4',
  };

  const claseModificada = { ...clase };
  claseModificada.nombreProfesor = currentProfesor.nombre;
  claseModificada.matriculaProfesor = currentProfesor.matricula;
  claseModificada.apellidosProfesor = currentProfesor.apellidos;
  delete claseModificada.nombreCompleto;
  delete claseModificada.fechas;
  delete claseModificada.edades;

  if (claseModificada.niveles in nivelesMap) {
    claseModificada.nivel = nivelesMap[claseModificada.niveles];
  }

  delete claseModificada.niveles;
  return claseModificada;
};
