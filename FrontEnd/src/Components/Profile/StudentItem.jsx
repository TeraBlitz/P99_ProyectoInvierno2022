import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardActionArea  from '@mui/material/CardActionArea';

const StudentItem = ({studentInfo, name, first_lastname, second_lastname, editStudent, setCurrentStudent, handleOpenDialog}) => {

  const openDelete = () => {
    setCurrentStudent(studentInfo);
    handleOpenDialog();
  }

  return (
    <Card sx={{ my: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
      <Box>
        <CardActionArea onClick={() =>  editStudent(studentInfo)}>
          <CardContent>
            <Typography variant="body2" component="div">
              {name} {first_lastname} {second_lastname} 
            </Typography>
          </CardContent>
        </CardActionArea>
      </Box>
      <Box>
        <IconButton aria-label="edit" color="primary" onClick={() =>  editStudent(studentInfo)}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="error" onClick={() => openDelete()}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  )
}

export default StudentItem