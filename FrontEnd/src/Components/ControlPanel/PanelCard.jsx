import React from 'react'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const PanelCard = ({title, body, bgColor}) => {
  return (
    <Card>
        <CardActionArea>
            <CardMedia
                component="img"
                height="100"
                sx={{ backgroundColor: bgColor}}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  )
}

export default PanelCard