import { nivelesMapa } from "./constants";

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

export const parseCSV = (csv) => {
  return csv
    .split('\n')
    .slice(1)
    .map((row) => {
      const [
        clave,
        nombre_curso,
        nivel,
        area,
        modalidad,
        clavePeriodo,
        cupo_maximo,
        edad_minima,
        edad_maxima,
        lunes,
        martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        nombreProfesor,
        apellidosProfesor,
        matriculaProfesor,
        correoProfesor,
      ] = row.split(',');

      const clase = {
        clave,
        nombre_curso,
        nivel,
        area,
        modalidad,
        clavePeriodo,
        cupo_maximo,
        edad_minima,
        edad_maxima,
        lunes,
        martes,
        miercoles,
        jueves,
        viernes,
        sabado,
        cupo_actual: '0',
        nombreProfesor: nombreProfesor.trim(),
        apellidosProfesor: apellidosProfesor.trim(),
        matriculaProfesor,
      };

      const profesor = {
        nombre: nombreProfesor.trim(),
        apellidos: apellidosProfesor.trim(),
        matricula: matriculaProfesor,
        correo: correoProfesor,
        fecha_de_nacimiento: '',
        num_telefono: '',
        num_cursos_impartidos: '0',
        idUser: '',
      };

      return { clase, profesor };
    });
};

export const mapClaseToData = (clase) => {
  let fechas = '';
  let edades = '';
  let niveles = '';

  if (clase.lunes !== '') fechas += 'lunes, ';
  if (clase.martes !== '') fechas += 'martes, ';
  if (clase.miercoles !== '') fechas += 'miercoles, ';
  if (clase.jueves !== '') fechas += 'jueves, ';
  if (clase.viernes !== '') fechas += 'viernes, ';
  if (clase.sabado !== '') fechas += 'sabado, ';

  edades = clase.edad_maxima === ''
    ? `${clase.edad_minima} en Adelante`
    : `${clase.edad_minima}-${clase.edad_maxima}`;

  niveles = nivelesMapa[clase.nivel] || '';

  return {
    _id: clase._id,
    clave: clase.clave,
    nombre_curso: clase.nombre_curso,
    nivel: clase.nivel,
    matriculaProfesor: clase.matriculaProfesor,
    edades,
    edad_minima: clase.edad_minima,
    edad_maxima: clase.edad_maxima,
    cupo_maximo: clase.cupo_maximo,
    modalidad: clase.modalidad,
    fechas,
    lunes: clase.lunes,
    martes: clase.martes,
    miercoles: clase.miercoles,
    jueves: clase.jueves,
    viernes: clase.viernes,
    sabado: clase.sabado,
    clavePeriodo: clase.clavePeriodo,
    area: clase.area,
    cupo_actual: clase.cupo_actual,
    niveles,
    nombreProfesor: clase.nombreProfesor,
    apellidosProfesor: clase.apellidosProfesor,
    nombreCompleto: `${clase.nombreProfesor} ${clase.apellidosProfesor}`,
  };
};

export const getNivel = (params) => {
  return nivelDict[params.row.nivel];
};

export const getHorario = (params) => {
  return `${params.row.lunes ? `Lun: ${params.row.lunes}` : ""}
              ${params.row.martes ? `Mar: ${params.row.martes}` : ""}
              ${params.row.miercoles ? `Mierc: ${params.row.miercoles}` : ""}
              ${params.row.jueves ? `Juev: ${params.row.jueves}` : ""}
              ${params.row.viernes ? `Vier: ${params.row.viernes}` : ""}
              ${params.row.sabado ? `Sab: ${params.row.sabado}` : ""}`;
};

export const getProfesor = (params) => {
  return `${params.row.nombreProfesor} ${params.row.apellidosProfesor}`;
};

export const getCupo = (params) => {
  return `${(
    (Number(params.row.cupo_actual) / Number(params.row.cupo_maximo)) *
    100
  ).toFixed()}%`;
};