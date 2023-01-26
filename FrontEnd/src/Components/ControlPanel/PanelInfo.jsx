import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PanelInfo = ({title, data, bgColor,num}) => {
  return (
    <Card sx={{ minWidth: 275 }} >
    <CardContent sx={{backgroundColor: bgColor}}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, mb: 0 }}>
        {title}
        </Typography>
        <Typography variant="h4" sx={{ color: 'white'}}>{num}</Typography>
    </CardContent>
</Card>
  )
}

export default PanelInfo