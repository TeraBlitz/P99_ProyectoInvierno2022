import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import PanelCard from '../../Components/ControlPanel/PanelCard';
import PanelInfo from '../../Components/ControlPanel/PanelInfo';
import axios from "axios";

// Possible function to get users, this goes in another file


let cursosRegistrados = 0
let profesInscritos = 0
let alumnosInscritos = 0


const cards = [
    {
        'id': '1',
        'title': 'Inscripción',
        'body': 'Acceder a sistema de inscripciones. Crea, actualiza y elimina los cursos.',
        'color': '#366ac3',
        'link':'inscripcion'
    },
    {
        'id': '2',
        'title': 'Profesores',
        'body': 'Administrar los profesores y visualizar su información.',
        'color': '#5F8AD4',
        'link':'Profesores'
    },
    {
        'id': '3',
        'title': 'Alumnos',
        'body': 'Administrar los alumnos y visualizar su información.',
        'color': '#89ABE4',
        'link':'Alumnos'
    },
    {
        'id': '4',
        'title': 'Periodos',
        'body': 'Administrar el periodo escolar actual y proximos periodos.',
        'color': '#b2cbf5',
        'link':'Periodos'
    }
]

let periodoActual = 'No se encontraron Periodos'


const ControlPanel = ({changeContent}) => {

    const [dataAlumno, setDataAlumno] = useState([]);
    const [dataClase, setDataClase] = useState([]);
    const [dataProfesor, setDataProfesor] = useState([]);
    const [data, setData] = useState([]);
    //----------------------Obtencion de datos de la base de datos

    const  getPeriodos = async () => {
      const res = await axios.get("https://p99test.fly.dev/v1/periodos");
      setData(res.data);
      //console.log('Fetch Periodos', res.data)
      periodoActual = compararFecha(res.data)
    };


      const  getClase  = async () => {
        const res = await axios.get("https://p99test.fly.dev/v1/clases");
        setDataClase(res.data);
        // funciones para encontrar stats
        //console.log('Fetch Clase', res.data)
        //console.log('Cursos Registrados: ',contarClases(res.data))
         cursosRegistrados = contarClases(res.data)
        //console.log('Profesores Inscritos', contarProfes(res.data))
         profesInscritos = contarProfes(res.data)
        //console.log('Alumnos Inscritos: ', contarAlumnos(res.data))
         alumnosInscritos = contarAlumnos(res.data)
      };

    useEffect(() => {
        //getAlumno();
        //getProfesor ();
        getClase();
        getPeriodos();

    }, []);

     //----------------------------------Funcion para ver periodo mas reciente

  function traducirDate(raw){

    const date = raw.split("T",2);
    return(date[0])

}

function compararFecha(data){
    let periodos=[]
    for (const element of data){
        let fecha = traducirDate(element.fecha_inicio);
        let separado = fecha.split('-',3);
        let valorA = Number(separado[0])
        let valorM = Number(separado[1])/100
        let valorD = Number(separado[2])/10000
        let valorT = valorA+valorM+valorD
        var obj ={
            id: element.clave,
            fecha:valorT
        }
        periodos.push(obj)
    }

    periodos.sort((a,b)=>b.fecha-a.fecha)
    let clave = String(periodos[0].id)
    return(clave)

}

// -------------------Funcion para contar cursos en periodo actual

function contarClases(datos){
    console.log("Este es la data inicial",datos)
    let contadorClases = 0;

    datos.forEach(element => {
        //console.log("Periodo: ", element.clavePeriodo)
        if(element.clavePeriodo === periodoActual){
            contadorClases = contadorClases +1
        }
    });

    //console.log("Clases",contadorClases)
    return(contadorClases)
}
//---------------------------Funcion para contar profesores actuales
function contarProfes(datos){
    let listaProfes = []
    datos.forEach(element => {
        if(element.clavePeriodo === periodoActual){

            if(listaProfes.includes(element.matriculaProfesor)){

            }else{
                listaProfes.push(element.matriculaProfesor)
            }
    }

    });
    console.log(listaProfes)
    return(listaProfes.length)
}

// -------------------- Function para contar alumnos

function contarAlumnos(datos){
    let alumnos = 0
    datos.forEach(element => {
        if(element.clavePeriodo === periodoActual){

            alumnos = alumnos + Number(element.cupo_actual)
    }

    });
    return(alumnos)
}
    const panelInfoCards = [
        {
            'id': '1',
            'title': 'Estudiantes inscritos',
            'data': dataAlumno,
            'color': '#0094DF',
            'num': alumnosInscritos ?? 0
        },
        {
            'id': '2',
            'title': 'Profesores inscritos',
            'data': dataProfesor,
            'color': '#00B8D6',
            'num': profesInscritos?? 0
        },
        {
            'id': '3',
            'title': 'Cursos Registrados',
            'data': dataClase,
            'color': '#366ac3',
            'num': cursosRegistrados?? 0
        },

    ]

    return (
        <div>
        <Box sx={{ ml: 1, p: 0 }} >
            <Box sx={{ fontFamily: 'default', fontSize: 'h3.fontSize', py: 2, display: 'flex', justifyContent: 'space-between',marginBottom:0,marginTop:0}}>
                Panel de control
            </Box>
            <Box sx={{fontFamily: 'default', fontSize: 'h5.fontSize', py: 2, display: 'flex', justifyContent: 'space-between',textAlign:'right',float:'right', marginRight:0.5}}>
                {periodoActual}</Box>
                <Grid container spacing={1.5} >
                {panelInfoCards.map(infoCard =>
                    <Grid item sm={12} md={4} key={infoCard.id}>
                        <PanelInfo title={infoCard.title} data={infoCard.data} bgColor={infoCard.color} num={infoCard.num}/>
                    </Grid>

                )}
                </Grid>
                <Grid container spacing={2} sx={{my: 2}}>
                {cards.map(card =>

                    <Grid item sm={12} md={6} key={card.id} onClick={()=>changeContent(card.link)}>
                        <PanelCard title={card.title} body={card.body} bgColor={card.color} />

                    </Grid>
                )}
            </Grid>
        </Box>
        </div>
    )
}

export default ControlPanel
