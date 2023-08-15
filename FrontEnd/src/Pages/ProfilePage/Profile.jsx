import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { findStudents } from "../../api/students";
import { useAuth0 } from "@auth0/auth0-react";
import UserDataSection from "../../Components/Profile/UserDataSection";
import CustomProfileSnackbars from "../../Components/Profile/CustomProfileSnackbars";
import StudentSection from "../../Components/Profile/StudentSection";

const Profile = () => {
  const { user } = useAuth0();
  const [successOpen, setSuccessOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [userInfo] = useState(user);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const getUserStudents = () => {
      findStudents({ idUser: user.sub })
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
      });
    };
    getUserStudents();
  }, []);

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessOpen(false);
    setErrorOpen(false);
    setInfoOpen(false);
  };

  if (!userInfo || !students) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ p: 1, ml: 1 }}>
      <Box
        sx={{
          fontFamily: "default",
          fontSize: "h3.fontSize",
          py: 2,
          display: "flex",
          color: "#004a98",
        }}
      >
        <Box>Mi perfil</Box>
      </Box>

      {/* <UserDataSection 
        userInfo={userInfo}
        setSuccessOpen={setSuccessOpen}
        setErrorOpen={setErrorOpen}
        setAlertMessage={setAlertMessage}
      /> */}

      <StudentSection 
        user={user}
        students={students}
        setStudents={setStudents}
        setSuccessOpen={setSuccessOpen}
        setErrorOpen={setErrorOpen}
        setInfoOpen={setInfoOpen}
        setAlertMessage={setAlertMessage}
      />

      <CustomProfileSnackbars 
        handleClose={handleClose}
        successOpen={successOpen}
        errorOpen={errorOpen}
        infoOpen={infoOpen}
        alertMessage={alertMessage}
      />
    </Box>
  );
};

export default Profile;
