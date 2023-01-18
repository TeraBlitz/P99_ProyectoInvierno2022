import React, { useState } from 'react'
import ClassCard from '../../Components/ClassCard/Classcard'
import { DataGrid } from '@mui/x-data-grid';
import { Card, CardContent, CardActions, Button, Box, TextField, Typography, MenuItem } from '@mui/material'
import { minWidth } from '@mui/system';

function MisClasesProfesor() {
    const [items, setItems] = useState([]);
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'title',
            headerName: 'Curso',
            width: 150,
            editable: false,
        },
        {
            field: 'periodo',
            headerName: 'Periodo',
            width: 150,
            editable: false,
        },
        {
            field: 'nivel',
            headerName: 'Nivel',
            width: 150,
            editable: false,
        }
    ];
    const [data, setData] = useState([
        {
            id: 1,
            key: 'TS12i23',
            title: 'clase 1',
            periodo: 'Ene-May 2024',
            nivel: 'intermedio'
        },
        {
            id: 2,
            key: 'TS29238',
            title: 'clase 2',
            periodo: 'Ene-May 2023',
            nivel: 'Avanzado'
        },
        {
            id: 3,
            key: 'TS29238',
            title: 'clase 3',
            periodo: 'Ene-May 2024',
            nivel: 'intermedio'
        },
        {
            id: 4,
            key: 'TS29238',
            title: 'clase 4',
            periodo: 'Ene-May 2023',
            nivel: 'Avanzado'
        },
        {
            id: 5,
            key: 'TS29238',
            title: 'clase 5',
            periodo: 'Ene-May 2024',
            nivel: 'intermedio'
        },
        {
            id: 6,
            key: 'TS29238',
            title: 'clase 6',
            periodo: 'Ene-May 2023',
            nivel: 'Avanzado'
        },
        {
            id: 7,
            key: 'TS29238',
            title: 'clase 7',
            periodo: 'Ene-May 2024',
            nivel: 'intermedio'
        },
        {
            id: 8,
            key: 'TS29238',
            title: 'clase 8',
            periodo: 'Ene-May 2023',
            nivel: 'Avanzado'
        },
        {
            id: 9,
            key: 'TS29238',
            title: 'clase 9',
            periodo: 'Ene-May 2024',
            nivel: 'intermedio'
        },
        {
            id: 10,
            key: 'TS29238',
            title: 'clase 10',
            periodo: 'Ene-May 2023',
            nivel: 'Avanzado'
        },
        {
            id: 11,
            key: 'TS29238',
            title: 'clase 11',
            periodo: 'Ene-May 2024',
            nivel: 'intermedio'
        },
        {
            id: 12,
            key: 'TS29238',
            title: 'clase 12',
            periodo: 'Ene-May 2023',
            nivel: 'Avanzado'
        },
        {
            id: 13,
            key: 'TS29238',
            title: 'clase 13',
            periodo: 'Ene-May 2024',
            nivel: 'intermedio'
        },
    ])

    return (
        <Box sx={{ height: "100vh", padding: '0', width: '100%', }}>
            <Box id="CardView" sx={{ display: { xs: 'flex', sm: "none" }, width: '100%', height: 'auto', flexDirection: 'column', alignItems: 'center' }}>
                {data.map(e => (
                    <ClassCard key={e.id} title={e.title} id={e.key} periodo={e.periodo} dificultad={e.dificultad} />
                ))}
            </Box>
            <Box sx={{ width: '100%', visibility: { xs: 'hidden', sm: 'visible' }, display: 'flex', height: '100%', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap' }}>
                <Card
                    sx={{
                        textAlign: "left",
                        marginLeft: "5px",
                        border: "2px solid  rgb(165, 165, 180)",
                        borderRadius: "8px",
                        width: { lg: '30%', sm: '40%' },
                        height: '40%',
                        minHeight: '293px',
                        minWidth: '340px'
                    }}
                >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ textAlign: "center", fontFamily: 'arial' }}
                        >
                            Busqueda
                        </Typography>
                        <TextField
                            style={{ paddingBottom: "15px", fontFamily: 'arial', width: '25ch' }}
                            label="Curso"
                            onChange={e => { setItems([{ columnField: 'title', operatorValue: 'contains', value: e.target.value }]) }}></TextField>
                        <TextField
                            style={{ paddingBottom: "15px", width: "25ch", fontFamily: 'arial' }}
                            label="Nivel"
                            id="filled-select-currency"
                            onChange={e => { setItems([{ columnField: 'nivel', operatorValue: 'contains', value: e.target.value }]) }}
                            select
                        >
                            {["Principiante", "intermedio", "Avanzado"].map(e => (
                                <MenuItem value={e}>

                                    {e}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            style={{ paddingBottom: "15px", width: "25ch", fontFamily: 'arial' }}
                            label="Periodo"
                            id="filled-select-currency"
                            onChange={e => { setItems([{ columnField: 'periodo', operatorValue: 'contains', value: e.target.value }]) }}
                        >
                        </TextField>
                    </CardContent>
                </Card>
                <Box sx={{ width: { lg: '60%', sm: '90%' }, height: { lg: '95%', sm: '50%' }, maxHeight: '100vh', minWidth: '548px' }}>
                    <DataGrid rows={data} columns={columns} disableSelectionOnClick={true}
                        filterModel={{
                            items: items
                        }
                        }
none                        sx={{ visibility: { xs: 'hidden', sm: 'visible' } }}

                    />

                </Box>
            </Box>
        </Box>

    )
}

export default MisClasesProfesor
