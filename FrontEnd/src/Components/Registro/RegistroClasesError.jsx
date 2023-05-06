import Box from '@mui/material/Box';
import React from 'react';
import {
  Alert, Button, AlertTitle,
} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Modal from '@mui/material/Modal';

function RegistroClasesError({
  selectAlertOpen, setSelectAlertOpen, error, setError, errorMsg,
}) {
  return (
    <>
      <Snackbar
        open={selectAlertOpen}
        autoHideDuration={8000}
        onClose={() => setSelectAlertOpen(false)}
      >
        <Alert severity="info">
          Selecciona un alumno para inscribir clases o entrar a la lista de
          espera
        </Alert>
      </Snackbar>
      <Modal
        open={error}
        onClose={() => setError(!error)}
        sx={{ overflow: 'scroll' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            borderRadius: 3,
            m: 2,
            p: 2,
          }}
        >
          <Alert
            sx={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            severity="error"
          >
            <AlertTitle>Error</AlertTitle>
            {errorMsg}
            <br />
            <Button
              onClick={() => setError(!error)}
              sx={{ color: 'error.dark' }}
            >
              Cerrar
            </Button>
          </Alert>
        </Box>
      </Modal>
    </>
  );
}

export default RegistroClasesError;
