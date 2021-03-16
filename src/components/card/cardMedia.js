import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import bourse from '../../images/bourse.jpg'


const useStyles = makeStyles({
  root: {
    margin: 'auto',
    marginTop: '2em',
    width: '60%',
    minHeight: '15em',
    backgroundColor:'gray',
    color: 'white',
    boxShadow:`
    0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048),
    0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072),
    0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12)`
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({currency, time,
                                    conversionEUR, conversionUSD, conversionMUR,
                                    conversionCNY, conversionCHF, conversionMGA,
                                    conversionCAD, conversionCOP}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>

  const handleClickCard= ()=>{
    console.log("click");
  }

  return (

    <Box  >
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}  color="textSecondary" gutterBottom>
        Currency :{bull}{currency}
        </Typography>
        <Typography variant= 'mark'>
        conversion  EURO:   {bull}{conversionEUR}
    
        conversion  USD:    {bull}{conversionUSD}
      
        conversion  MUR:    {bull}{conversionMUR}
      
        conversion  CNY:    {bull} {conversionCNY}    
    
        conversion  CHF:    {bull} {conversionCHF}
      
        conversion  CAD:    {bull} {conversionCAD}
      
        conversion  COP:    {bull} {conversionCOP}
      
        conversion  MGA:    {bull} {conversionMGA}
      
          time update : {time}    
          provided by
          v6.exchangerate-api.com
        </Typography>
      </CardContent>
    </Card>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        exemple d hydratation 
        </Typography>
        <Typography variant="h5" component="h2">
        {bull}Donnée{bull}temps{bull}Réel{bull}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
      </CardContent>
    </Card>
    </Box>
  );
}