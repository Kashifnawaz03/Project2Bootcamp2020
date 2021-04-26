import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PieChart from "./PieChart";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: '0 Auto',
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title:{
    color: 'blue'
  },
  title1:{
    color: 'red'
  }
}));

export default function GlobalData() {
  const classes = useStyles();
  const [globalData, setGlobalData] = useState({});
  const [deathVal, setDeathVal] = useState(0);
  const [confirmVal, setConfirmVal] = useState(0);
  const [recoverVal, setRecoverVal] = useState(0);


  useEffect(() => {
    async function getGlobalData() {
      const result = await fetch("https://covid19.mathdro.id/api");
      const data = await result.json();

   
      delete data.countries;
      delete data.countryDetail;
      delete data.dailySummary;
      delete data.dailyTimeSeries;
      delete data.image;
      delete data.lastUpdate;
      delete data.source;
      
      setGlobalData(data);
      setDeathVal(data.deaths.value)
      setConfirmVal(data.confirmed.value);
      setRecoverVal(data.recovered.value)

    }
    getGlobalData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(globalData).map((key, ind) => {
          return (
            <Grid item xs={4} key={ind}>
              <Paper className={classes.paper}>
              <h3 className={classes.title}>{key.toUpperCase()}</h3>
            <h3 className={classes.title1}>{globalData[key].value}</h3>
                <br /> 
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <PieChart death = {deathVal} confirm = {confirmVal} recover = {recoverVal}/>
    </div>
  );
}