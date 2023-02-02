import React, { createContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const SignIn = ({
  isSignedIn,
  handleSignIn,
  handleUser,
  loginError,
  changeHasAccount,
}) => {
  const [checked, setChecked] = useState([true, false]);

  const handleChange = (e) => {
    handleUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleChangeCheckBox = (e) => {
    setChecked([e.target.checked, e.target.checked]);
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src='/logo_p99.png'
            style={{ width: "100px" }}
          ></img>
        </div>
        <Box
          component="form"
          sx={{ mx: 3, display: "flex", flexDirection: "column" }}
          onSubmit={handleSignIn}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              color: "#E6F4F1",
              mb: 1,
              fontWeight: "400",
              textAlign: "center",
              width: "100%",
            }}
          >
            INICIAR SESIÓN
          </Typography>
          <Typography
            variant="h7"
            sx={{ color: "red", display: loginError, textAlign: "center" }}
          >
            Usuario o contraseña incorrecta
          </Typography>
          <TextField
            name="correo"
            required
            fullWidth
            label="Correo"
            variant="filled"
            sx={{input: {color: 'black', backgroundColor: 'white', borderRadius: 1} }}
            InputLabelProps={{ style: { color: "gray" } }}
            onChange={handleChange}
            onInvalid={(e) =>
              e.target.setCustomValidity("Ingresa tu usuario o correo")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <br />
          <TextField
            name="password"
            required
            fullWidth
            label="Contraseña"
            type="password"
            variant="filled"
            sx={{input: {color: 'black', backgroundColor: 'white', borderRadius: 1} }}
            InputLabelProps={{ style: { color: "gray" } }}
            onChange={handleChange}
            onInvalid={(e) =>
              e.target.setCustomValidity("Ingresa tu contraseña")
            }
            onInput={(e) => e.target.setCustomValidity("")}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FormControlLabel
              label={
                <Typography variant="body1" sx={{ color: "#E6F4F1" }}>
                  Recuérdame
                </Typography>
              }
              color="white"
              control={
                <Checkbox
                style ={{
                    color: "#E6F4F1" ,
                  }}
                  checked={checked[1]}
                  onChange={handleChangeCheckBox}
                />
              }
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Link
              variant="body1"
              underline="hover"
              sx={{ alignSelf: "center", color: "#55afc6"  }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
          <Box sx={{ my: 1 }}>
            <Button
              fullWidth
              type="submit"
              sx={{ backgroundColor: '#57a1f1', color: "white" }}
            >
              Entrar
            </Button>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "#E6F4F1",
                display: "flex",
                justifyContent: "center",
              }}
            >
              ¿No tienes una cuenta?
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" sx={{ color: "#55afc6" }}>
              <Link
                sx={{
                  pl: 1,
                  color: "#0099DF",
                  display: "flex",
                  justifyContent: "center",
                }}
                underline="hover"
                onClick={() => changeHasAccount()}
              >
                ¡Regístrate!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};
export default SignIn;

