import React, { useContext } from 'react';
import { startCase } from 'lodash';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { AuthContext } from '../../context/auth';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const AppBarComponent = (props) => {
  const classes = useStyles();
  const { breedList } = props;
  const dogBreed = props.dogBreed || "";
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
      dispatch({
          type: "LOGOUT"
      });
  };

  const handleBreedChange = event => {
    props.handleBreedChange(event.target.value);
  }

  if (!state.isAuthenticated) {
      return (
        <Redirect to="/" />
      )
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Doggo
          </Typography>
          <div className={classes.search}>
            <FormControl className={classes.formControl}>
              <InputLabel id="select-breed"></InputLabel>
              <Select
                labelId="select-breed"
                id="select-breed"
                value={dogBreed}
                onChange={handleBreedChange}
                label="Dog Breed"
              >
                {Object.keys(breedList).map(list => {
                  return (
                  <MenuItem key={list} value={list}>{startCase(list)}</MenuItem>
                  )
                })}
              </Select>
              <FormHelperText>Breed List</FormHelperText>
            </FormControl>
          </div>
          <Button 
            color="secondary"
            variant="contained"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;