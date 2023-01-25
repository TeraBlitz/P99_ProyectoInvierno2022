import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmationDialog({changeClaseRegistrada, handleClose, open, clase, handleListaEspera}) {

  const handleClick = () =>{
    {Number(clase.cupo_actual) < Number(clase.cupo_maximo) ?
        changeClaseRegistrada(clase)
      :
        handleListaEspera(clase)
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
        <DialogTitle id="alert-dialog-title">
        {Number(clase.cupo_actual) < Number(clase.cupo_maximo) ?
          '¿Inscribir esta clase? '
          :
          '¿Entrar a lista de espera?'
        }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> 
          {Number(clase.cupo_actual) < Number(clase.cupo_maximo) ?
          `Estas seguro que quieres inscribir la clase ${clase.clave} ${clase.nombre_curso} ${clase.nivel}, 
          recuerda que hay inscripciones limitadas.`
          :
          `Estas seguro que quieres entrar a la lista de espera de la clase ${<strong> {clase.clave} {clase.nombre_curso} {clase.nivel} </strong>}.`
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