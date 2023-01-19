import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea  from '@mui/material/CardActionArea';

const StudentItem = ({studentInfo, name, first_lastname, second_lastname, editStudent}) => {
  return (
    <Card sx={{ my: 2}}>
      <CardActionArea onClick={() =>  editStudent(studentInfo)}>
        <CardContent>
          <Typography variant="body2" component="div">
            {name} {first_lastname} {second_lastname} 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default StudentItem