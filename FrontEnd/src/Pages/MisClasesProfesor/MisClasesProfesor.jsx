import React, { useState } from 'react'
import ClassCard from '../../Components/ClassCard/Classcard'
import { Box } from '@mui/material'

function MisClasesProfesor() {
    const [data , setData] = useState([
        {
            key:1,
            id:'TS12i23',
            title:'clase 1',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            key:2,
            id:'TS29238',
            title:'clase 2',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            key:3,
            id:'TS29238',
            title:'clase 3',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            key:4,
            id:'TS29238',
            title:'clase 3',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            key:5,
            id:'TS29238',
            title:'clase 3',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            key:6,
            id:'TS29238',
            title:'clase 3',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            key:7,
            id:'TS29238',
            title:'clase 3',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            key:8,
            id:'TS29238',
            title:'clase 3',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            key:9,
            id:'TS29238',
            title:'clase 3',
            periodo:'Ene-May 2023',
            dificultad: 'intermedio'
        },
    ])
    return (

        <Box sx={{ display: 'flex', width: 'calc(100vw-240px)', height: '100vh', justifyContent: 'start', flexWrap: 'wrap' }}>
        {data.map(e=>(
            <ClassCard key={e.key} title={e.title} id={e.id}  periodo={e.periodo} dificultad={e.dificultad}/>
        ))}
        </Box>

    )
}

export default MisClasesProfesor
