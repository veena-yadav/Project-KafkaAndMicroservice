import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Aos from "aos"
import "aos/dist/aos.css"

import DeleteIcon from '@mui/icons-material/Delete';

export default function MedicineCard({med,deleteMedicine}) {
  React.useEffect(()=>{
Aos.init({duration:2000})
  },[])
  return (
    <Box sx={{ minWidth: 100 }}>
      <Card variant="outlined" data-aos="fade-up" style={{
        backgroundColor:"#acdcee",
       
      }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" style={{textAlign:'center'}}>
          {med.itemName}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{textAlign:'center'}}>
         Quantity :{med.quantity}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{textAlign:'center'}}>
        Price: ₹{med.price}
        </Typography>
      </CardContent>
      <CardActions style={{
        display:'grid',
        placeItems:'center'
      }}>
       <Button variant="contained" color="primary" onClick={()=>deleteMedicine(med.itemName)}>Delete <DeleteIcon/></Button>
       
      </CardActions>
      </Card>
    </Box>
  );
}
