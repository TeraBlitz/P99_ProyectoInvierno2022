import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { updateUser } from "../../api/users";
import { Login } from "../../api/Login";

const baseNewUserInfo = {
  password: "",
  new_password: "",
  verify_password: "",
};

const ChangePassModal = ({
  openChangePassModal,
  setOpenChangePassModal,
  userInfo,
  setAlertMessage,
  setErrorOpen,
  setSuccessOpen,
}) => {
  const [wrongPasswordError, setWrongPasswordError] = useState(false);
  const [passwordsDontMatchError, setPasswordsDontMatchError] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState(baseNewUserInfo);

  const handleCancel = () => {
    setOpenChangePassModal(!openChangePassModal);
  };

  const handleChange = (e) =>
    setNewUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    // Enviar esta informacion a bd
    e.preventDefault();

    if (newUserInfo.new_password !== newUserInfo.verify_password) {
      setPasswordsDontMatchError(true);
      return;
    }
    Login({
      correo: userInfo.correo,
      password: newUserInfo.password,
    }).then((result) => {
      if (result.msg == "Login OK") {
        userInfo.password = newUserInfo.new_password;
        updateUser(
          {
            _id: userInfo.uid,
            user_name: userInfo.user_name,
            correo: userInfo.correo,
            rol: userInfo.rol,
            password: userInfo.password,
            status: "10",
          },
          userInfo.uid
        ).then((data) => {
          if (data.status === 400 || data.status === 404) {
            setAlertMessage("Se produjo un error al actualizar la contraseña.");
            setErrorOpen(true);
            return;
          }
          setAlertMessage("Contraseña actualizada correctamente.");
          setSuccessOpen(true);
          setOpenChangePassModal(!openChangePassModal);
        });
      } else {
        setWrongPasswordError(true);
        return;
      }
    });
  };

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1, p: 0.5, width: "35ch" },
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 3,
        m: 2,
        p: 2,
        width: "300px",
      }}
      onSubmit={handleSubmit}
    >
      <Box sx={{ typography: "h5", fontFamily: "default" }}>
        Cambia tu contraseña
      </Box>
      <Typography
        sx={{
          display: passwordsDontMatchError ? "flex" : "none",
          color: "red",
          textAlign: "center",
        }}
      >
        Las contraseñas no coinciden, intenta de nuevo.
      </Typography>
      <Typography
        sx={{
          display: wrongPasswordError ? "flex" : "none",
          color: "red",
          textAlign: "center",
        }}
      >
        Contraseña actual incorrecta, intenta de nuevo.
      </Typography>
      <TextField
        name='password'
        label='Contraseña actual'
        value={newUserInfo.password || ""}
        type='password'
        onChange={handleChange}
        required
      />
      <TextField
        name='new_password'
        label='Nueva Contraseña'
        value={newUserInfo.new_password || ""}
        type='password'
        onChange={handleChange}
        required
      />
      <TextField
        name='verify_password'
        label='Confirmar contraseña'
        value={newUserInfo.verify_password || ""}
        type='password'
        onChange={handleChange}
        required
      />
      <Box
        sx={{
          display: "flex",
          m: 1,
          p: 1,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Button
          variant='contained'
          color='error'
          sx={{ mr: 2 }}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button variant='contained' type='submit' size='medium'>
          Guardar
        </Button>
      </Box>
    </Box>
  );
};

export default ChangePassModal;
