import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import SignUpInput from "../../Components/SignUp/SignUpInput";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { convertLength } from "@mui/material/styles/cssUtils";
import { createUser } from "../../api/users";

const userData = {
  user_name: "",
  correo: "",
  password: "",
  verify_password: "",
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const SignUp = ({ changeHasAccount }) => {
  const [userInfo, setUserInfo] = useState(userData);
  const [showPassword, setShowPassword] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showMailErrorMessage, setShowMailErrorMessage] = useState(false);
  const [showUserErrorMessage, setShowUserErrorMessage] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const handleChange = (e) =>
    setUserInfo((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
  };

  const handleSubmit = (e) => {
    // Enviar esta informacion a bd
    e.preventDefault();
    // Pasar esta función para añadir al usuario
    if (userInfo.password !== userInfo.verify_password) {
      setShowMessage(true);
      return;
    }
    createUser({
      user_name: userInfo.user_name,
      correo: userInfo.correo,
      password: userInfo.password,
      status: "10",
      rol: "estudiante",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.msg);
        if (data.msg === "Error: Username en uso.") {
          setShowUserErrorMessage(true);
          return;
        }
        if (data.msg === "Error: Correo en uso.") {
          setShowMailErrorMessage(true);
          return;
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.message.includes("Un documen")) {
          //setAlertMessage("Usuario agregado correctamente.");
          setSuccessOpen(true);
          setTimeout(() => {
            changeHasAccount();
          }, 2000);
        }
      });
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Card sx={{ px: 3, py: 2, backgroundColor: "#004a98", borderRadius: 2 }}>
        <Box
          component='form'
          sx={{ mx: 3, display: "flex", flexDirection: "column" }}
          onSubmit={handleSubmit}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src='/logo_p99.png' style={{ width: "100px" }}></img>
          </div>
          <Typography
            component='h1'
            variant='h4'
            sx={{
              color: "#E6F4F1",
              mb: 1,
              fontWeight: "400",
              textAlign: "center",
              width: "100%",
            }}
          >
            Crear una cuenta
          </Typography>
          <Typography
            sx={{ display: showMessage ? "flex" : "none", color: "red" }}
          >
            Las contraseñas no coinciden, intenta de nuevo
          </Typography>
          <Typography
            sx={{
              display: showMailErrorMessage ? "flex" : "none",
              textAlign: "center",
              color: "red",
            }}
          >
            Correo en uso, inicia sesión.
          </Typography>
          <Typography
            sx={{
              display: showUserErrorMessage ? "flex" : "none",
              textAlign: "center",
              color: "red",
            }}
          >
            Usuario ya existe, elige otro o inicia sesión.
          </Typography>
          <SignUpInput
            name={"user_name"}
            label={"Usuario"}
            value={userInfo.user_name}
            handleChange={handleChange}
            helperTextContent={"Crea tu usuario"}
          />
          <SignUpInput
            name={"correo"}
            label={"Correo"}
            value={userInfo.correo}
            handleChange={handleChange}
            helperTextContent={""}
            type={"email"}
          />
          <SignUpInput
            name={"password"}
            label={"Contraseña"}
            value={userInfo.password}
            handleChange={handleChange}
            helperTextContent={""}
            type={"password"}
          />
          <SignUpInput
            name={"verify_password"}
            label={"Confirmar Contraseña"}
            value={userInfo.verify_password}
            handleChange={handleChange}
            helperTextContent={""}
            type={"password"}
          />
          <Box sx={{ my: 1 }}>
            <Button
              fullWidth
              type='submit'
              sx={{
                backgroundColor: "#57a1f1",
                color: "white",
                textTransform: "none",
                fontSize: "18px",
              }}
            >
              Crear
            </Button>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant='body1' sx={{ color: "#E6F4F1" }}>
              ¿Ya tienes una cuenta?
              <br />
              <Link
                sx={{ pl: 1, color: "#0099DF" }}
                underline='hover'
                onClick={changeHasAccount}
              >
                ¡Inicia sesión!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
      <Snackbar
        open={successOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='success' sx={{ width: "100%" }}>
          Usuario creado exitosamente
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUp;
