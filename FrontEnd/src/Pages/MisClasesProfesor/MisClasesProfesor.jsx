import React, { useState } from 'react'
import ClassCard from '../../Components/ClassCard/Classcard'
import { Box, TextField, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';

function MisClasesProfesor() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'title',
            headerName: 'Clase',
            width: 150,
            editable: false,
        },
        {
            field: 'periodo',
            headerName: 'Last name',
            width: 150,
            editable: false,
        },
        {
            field: 'dificultad',
            headerName: 'Dificultad',
            type: 'number',
            width: 150,
            editable: false,
        }
    ];
    const [data, setData] = useState([
            {
            id: 1,
            key: 'TS12i23',
            title: 'clase 1',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            id: 2,
            key: 'TS29238',
            title: 'clase 2',
            periodo: 'Ene-May 2023',
            dificultad: 'avanzado'
        },
        {
            id: 3,
            key: 'TS29238',
            title: 'clase 3',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            id: 4,
            key: 'TS29238',
            title: 'clase 4',
            periodo: 'Ene-May 2023',
            dificultad: 'avanzado'
        },
        {
            id: 5,
            key: 'TS29238',
            title: 'clase 5',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            id: 6,
            key: 'TS29238',
            title: 'clase 6',
            periodo: 'Ene-May 2023',
            dificultad: 'avanzado'
        },
        {
            id: 7,
            key: 'TS29238',
            title: 'clase 7',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            id: 8,
            key: 'TS29238',
            title: 'clase 8',
            periodo: 'Ene-May 2023',
            dificultad: 'avanzado'
        },
        {
            id: 9,
            key: 'TS29238',
            title: 'clase 9',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            id: 10,
            key: 'TS29238',
            title: 'clase 10',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            id: 11,
            key: 'TS29238',
            title: 'clase 11',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            id: 12,
            key: 'TS29238',
            title: 'clase 12',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
        {
            id: 13,
            key: 'TS29238',
            title: 'clase 13',
            periodo: 'Ene-May 2023',
            dificultad: 'intermedio'
        },
    ])

    return (
        <Box sx={{ height: "100vh", padding: '0', width: '100%', }}>

            <Box id="CardView" sx={{ display: { xs: 'flex', sm: "none" }, width: '100%', height: 'auto', flexDirection: 'column', alignItems: 'center' }}>
                {data.map(e => (
                    <ClassCard key={e.id} title={e.title} id={e.key} periodo={e.periodo} dificultad={e.dificultad} />
                ))}
            </Box>
            <div style={{ width: '100%', display: 'flex', height: '100vh', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                <Box sx={{ width: { sm: '50%', lg: '30%' }, height: { sm: '30%', lg: '40%' }, bgcolor: 'primary.main', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'  , borderRadius:'5px'}}>
                    <Typography variant="h4">filtros</Typography>
                    <Box sx={{display:'flex' , justifyContent:'space-between' , flexDirection:'column' , alignItems:'center' , height:'70%' , marginBottom:'10px' }}>

                        <TextField variant="filled" label="Buscar por nombre" sx={{ bgcolor: '#DDD', borderRadius: '3px', height: 'fit-content' }} size="small" />
                        <TextField variant="filled" label="Buscar por dificultad" sx={{ bgcolor: '#DDD', borderRadius: '3px', height: 'fit-content' }} size="small" />
                        <TextField variant="filled" label="Buscar por  periodo" sx={{ bgcolor: '#DDD', borderRadius: '3px', height: 'fit-content' }} size="small" />
                    </Box>
                </Box>
                <Box sx={{ display: { xs: 'none', sm: "block" }, width: { lg: '60%', sm: '90%' }, height: { lg: '95%', sm: '60%' }, maxHeight: '100vh', }}>
                    <DataGrid rows={data} columns={columns} disableSelectionOnClick={true} />

                </Box>
            </div>
        </Box>

    )
}

export default MisClasesProfesor
