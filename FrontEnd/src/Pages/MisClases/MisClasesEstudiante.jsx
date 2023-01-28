import React, { useContext, useEffect, useState } from "react";
import './MisClases.css';
import TarjetaMisC from './TarjetaMisC';
import Box from '@mui/material/Box'
import Button from "@mui/material/Button";
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ClaseModal from '../../Components/Clase/ClaseModal';
import { getClasses } from '../../api/classes';
import { getStudents } from '../../api/students';
import { getClassStudent } from  './../../api/classStudent.js';
import { userContext } from "../../App";


const MisClasesEstudiante = () => {

	const [students, setStudents] = useState(null);
    const [allClases, setAllClases] = useState(null);
    const [clases, setClases] = useState(null);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [currentClase, setCurrentClase] = useState(null); 

	const userValues = useContext(userContext);

	useEffect(() => {
        const getUserStudents = () =>{
             getStudents().then(
                 (data) => {
                     const students = data.filter(student => student.idUser === userValues._id);
                     setStudents(students);
                     //console.log(students)
             });
         }
         getUserStudents();
     }, []);

	useEffect(() => {
		const getStudentClasses = () =>{
			getClasses().then(
				(data) => {
					setAllClases(data);
				});
			}
		getStudentClasses();
	}, []);

	const getMyClasses = (student) => {
        let myClasses = [];
		let studentClasses = [];
		getClassStudent().then((data) => {
            myClasses = data.filter(clase => clase.idAlumno === student._id);
			if(myClasses.length === 0){
				setClases(studentClasses)
			}
			else{
				myClasses.map(clase => {
					for (let i = 0; i < allClases.length; i++) {
						if( clase.idClase === allClases[i]._id ){
							studentClasses.push(allClases[i]);
						} 
					}
				})
				setClases(studentClasses);
			}
		})
	}

	const handleChange = (e) => {
		if (e.target.value === ""){
			setCurrentStudent(null);
			setClases(null);
			return
		}
		setCurrentStudent(e.target.value);
		getMyClasses(e.target.value);
		console.log(clases);
    }

	if (!students) {
        return(
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        )
    }
	if (students.length === 0 && students !== null){
        return(
            <Box sx={{ height: '100vh', display: 'flex',
                alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                <Typography variant='h3' component='div' textAlign='center'>
                    No tienes alumnos registrados, ve a  
                     <Link
                    component="button"
                    onClick={() => changeContent('Profile')}
                    variant='h3'
                    sx={{mx: 2}}
                    >
                        <i> Perfil </i>
                    </Link> 
                     para agregar alumnos.
                </Typography>
            </Box>
        )
    }
    return(
        <div>
			<Box sx={{m: 2, overflow: 'hidden'}}>
				<Typography variant="h3" sx={{ mb: 2 }}>Mis clases</Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Estudiantes</InputLabel>
                    <Select
                        value={currentStudent || ''}
                        label="Estudiantes"
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>Estudiante</em>
                        </MenuItem>
                        {students.map((student) => (
                            <MenuItem
                                key={student._id}
                                value={student}
                            >
                                {student.nombre} {student.apellido_paterno} {student.apellido_materno}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
				<div className="card-container">
					{
						clases === null ? 
						<Box sx={{ display: 'flex',
						alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
							<Typography variant='h3' component='div' textAlign='center'>
								Selecciona un estudiante para ver tus clases.
							</Typography>
						</Box>
						:
						clases.map(item => {	
							return(
								<TarjetaMisC
									key={item._id}
									clase={item}
								/>
							)
						})
					}
					{
						clases !== null && clases.length === 0 ? 
						<Box sx={{ display: 'flex',
								alignContent: 'center', justifyContent: 'center', flexWrap: 'wrap'}}>
								<Typography variant='h3' component='div' textAlign='center'>
									No tienes clases inscritas.
								</Typography>
						</Box>
						: 
						null
					}
				</div>
            </Box>
        </div>
    )
}

export default MisClasesEstudiante
