import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Aos from "aos"
import "aos/dist/aos.css"

import DeleteIcon from '@mui/icons-material/Delete';


export default function CriticalMedicineCard({med,deleteMedicine}) {
  React.useEffect(()=>{
Aos.init({duration:2000})
  },[])
  return (
    <Box sx={{ minWidth: 100 }} >
      <Card variant="outlined" data-aos="fade-up" style={
        {
          display:'grid',
          placeItems:'center',
          backgroundColor:'#acdcee', 
          width:'90%',
          margin:'0px auto',
         
        }
      }>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {med}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  
        variant="contained"
        color="primary"
        style={{marginTop:"-20px" }}
        onClick={(e)=>{
          deleteMedicine(med)
        }}>Delete Medicine <DeleteIcon /></Button>
       
      </CardActions>
      </Card>
    </Box>
  );
}
