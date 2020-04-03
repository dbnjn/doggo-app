import React, { useState, useEffect } from 'react';
import axios from "axios";

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import { DOG_CEO_BASE_URI } from "../../config/clientConfig";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1920,
    height: 1080,
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const { dogBreed } = props;
  const [dogImageUrls, setDogImageUrls] = useState([]);

  useEffect(() => {
    const fetchDogImageUrls = async () => {
        const response = await axios.get(`${DOG_CEO_BASE_URI}/breed/${dogBreed}/images`);
        setDogImageUrls(response.data.message);
    };
    fetchDogImageUrls();
  }, [dogBreed]);

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {dogImageUrls.map((element, index) => (
          <GridListTile key={index} cols={1}>
            <img src={element} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Dashboard;