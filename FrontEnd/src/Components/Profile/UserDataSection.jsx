import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import PasswordIcon from '@mui/icons-material/Password';
import ChangePassModal from './../../Components/Profile/ChangePassModal';

function UserDataSection({
  userInfo, setSuccessOpen, setErrorOpen, setAlertMessage,
}) {
  const [openChangePassModal, setOpenChangePassModal] = useState(false);

  return (
    <>
      <Box sx={{ typography: 'h6', fontFamily: 'default' }}>Datos Usuario</Box>
      <Box
        sx={{
          '& .MuiTextField-root': { m: 1, width: '35ch' },
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <TextField
          name="user_name"
          label="Usuario"
          InputProps={{ readOnly: true }}
          value={userInfo.user_name || ''}
        />
        <TextField
          name="correo"
          label="Correo"
          InputProps={{ readOnly: true }}
          value={userInfo.correo || ''}
        />
        <Button
          onClick={() => setOpenChangePassModal(!openChangePassModal)}
          variant="contained"
          sx={{
            textTransform: 'none',
            backgroundColor: '#57a1f1',
            fontSize: '18px',
            ml: 2,
          }}
          endIcon={<PasswordIcon />}
        >
          Cambiar contraseña
        </Button>
      </Box>
      <Modal
        open={openChangePassModal}
        onClose={() => setOpenChangePassModal(!openChangePassModal)}
        sx={{ overflow: 'scroll', display: 'flex', justifyContent: 'center' }}
      >
        <>
          <ChangePassModal
            openChangePassModal={openChangePassModal}
            setOpenChangePassModal={setOpenChangePassModal}
            userInfo={userInfo}
            setSuccessOpen={setSuccessOpen}
            setErrorOpen={setErrorOpen}
            setAlertMessage={setAlertMessage}
          />
        </>
      </Modal>
    </>
  );
}

export default UserDataSection;
