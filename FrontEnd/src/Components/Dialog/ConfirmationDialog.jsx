import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog({
	handleClaseRegistrada, handleCancelarClaseRegistrada,
	handleSalirListaEspera, handleClose, open, clase, handleListaEspera, action
	}) {

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

  const dialogContent = (clase) => {
	switch (action) {
		case 'ListaEspera':
			return `Estas seguro que quieres entrar a la lista de espera de la clase ${clase.clave} ${clase.nombre_curso} ${clase.nivel}.`
		case 'Registrar':
			return `Estas seguro que quieres inscribir la clase ${clase.clave} ${clase.nombre_curso} ${clase.nivel}, 
			recuerda que hay inscripciones limitadas.`
		case 'CancelarInscripcion':
			return `Estas seguro que quieres cancelar tu inscripción de la clase ${clase.clave} ${clase.nombre_curso} ${clase.nivel}.`
		case 'SalirLista':
			return `Estas seguro que quieres salir de la lista de espera de la clase ${clase.clave} ${clase.nombre_curso} ${clase.nivel}.`
	}
  }

  const dialogTitle = () => {
	switch (action) {
		case 'ListaEspera':
			return '¿Entrar a lista de espera?'
		case 'Registrar':
			return '¿Inscribir esta clase? '
		case 'CancelarInscripcion':
			return '¿Cancelar inscripción?'
		case 'SalirLista':
			return '¿Salir de lista de espera?'
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
				dialogTitle()
			}
        </DialogTitle>
        <DialogContent>
          <DialogContentText i> 
			{
				dialogContent(clase)
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