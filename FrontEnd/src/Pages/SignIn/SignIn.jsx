import React, { createContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import CircularProgress from '@mui/material/CircularProgress';

const SignIn = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleChange = (e) => {
    handleUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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
          sx={{ mx: 3, display: "flex", flexDirection: "column", alignItems: "center" }}
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
          {
            isLoading ?
            <CircularProgress />
            :
            <Button
              fullWidth
              type="submit"
              sx={{ backgroundColor: '#57a1f1', color: "white" }}
              onClick={() => loginWithRedirect()}
            >
              Entrar
            </Button>
            }
          
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: "#E6F4F1",
                display: "flex",
                justifyContent: "center",
              }}
            >
              ¿No Sabes como usar la plataforma?
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
                ¡Sige esta guia para aprender!
              </Link>
            </Typography>
          </Box>
        </Box>
      </Card>
    </Container>
  );
};
export default SignIn;

