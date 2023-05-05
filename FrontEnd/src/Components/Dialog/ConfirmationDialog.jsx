import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { findTerm } from '../../api/term';
import {
  getClassStudent,
  deleteClassStudent,
} from '../../api/classStudent';
import {
  createClassStudent,
} from '../../api/classStudent';
import {
  createWaitList,
  getWaitList,
  deleteWaitList,
} from '../../api/waitList';
import { dialogTitle, dialogContent } from '../../utils/utilFunctions';

export default function ConfirmationDialog({
	setError, setErrorMsg, handleClose, open, clase, action
	}) {

	const handleListaEspera = async (clase) => {
		const waitListResponse = await getWaitList();
		const lista = (await waitListResponse.json()).filter(
			(lista) => lista.idAlumno === currentStudent._id,
		);

		await createWaitList({
			idAlumno: currentStudent._id,
			idClase: clase._id,
			time_stamp: new Date().toISOString(),
			status: 'Espera',
		});
		clase.status = 'ListaEspera';
		handleCloseDialog();
	};
	
	const handleSalirListaEspera = async (clase) => {
		const periodoResponse = await findTerm({ clave: clase.clavePeriodo });
		const periodo = await periodoResponse.json();

		const myWaitListResponse = await getWaitList();
		const myWaitList = (await myWaitListResponse.json()).filter(
			(aWList) => aWList.idClase === clase._id
				&& aWList.idAlumno === currentStudent._id
				&& aWList.idPeriodo === periodo[0]._id,
		);

		await deleteWaitList({ _id: myWaitList[0]._id });
		clase.status = '';
		handleCloseDialog();
	};
	
	const handleClaseRegistrada = async (clase) => {
		try {
			const periodoResponse = await findTerm({ clave: clase.clavePeriodo });
			const periodo = await periodoResponse.json();

			const response = await createClassStudent({
				idClase: clase._id,
				idAlumno: currentStudent._id,
				idPeriodo: periodo[0]._id,
			});

			const data = await response.json();

			if (data.msg.includes('Un documento fue insertado con el ID')) {
				clase.status = 'Inscrito';
				handleCloseDialog();
			} else {
				handleCloseDialog();
				setErrorMsg(data.msg);
				setError(true);
			}
		} catch (error) {
			alert(error);
		}
	};

	const handleCancelarClaseRegistrada = async (clase) => {
		const periodoResponse = await findTerm({ clave: clase.clavePeriodo });
		const periodo = await periodoResponse.json();

		const myClassStudentResponse = await getClassStudent();
		const myClassStudent = (await myClassStudentResponse.json()).filter(
			(aClass) => aClass.idClase === clase._id
				&& aClass.idAlumno === currentStudent._id
				&& aClass.idPeriodo === periodo[0]._id,
		);

		await deleteClassStudent({ _id: myClassStudent[0]._id });
		clase.status = '';
		handleClose();
	};

  const handleClick = () =>{
	switch (action) {
		case 'ListaEspera':
			handleListaEspera(clase)
			break;
		case 'Registrar':
			handleClaseRegistrada(clase)
			break;
		case 'CancelarInscripcion':
			handleCancelarClaseRegistrada(clase);
			break; 
		case 'SalirLista':
			handleSalirListaEspera(clase);
			break; 
	}
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >
			{
				dialogTitle(action)
			}
        </DialogTitle>
        <DialogContent>
          <DialogContentText i> 
			{
				dialogContent(clase, action)
			}	
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleClick} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}