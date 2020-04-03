import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { useAuth } from "../../context/auth";
import { BASE_URI } from "../../config/clientConfig";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://placedog.net/1920/1080?random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const classes = useStyles();

    const { state, dispatch } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleRegister = async () => {
        try {
            const isFormDataValid = validateData();
            if (isFormDataValid) {
                console.log("Register called");
                await axios.post(`${BASE_URI}/login/register`, { email, password, name });
                setAlertMessage("Registration done successfully. Please login");
            }
        } catch (error) {
            setAlertMessage("Email Already exists! Please Login");
        }
    }

    const validateData = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            setAlertMessage("Please enter a valid email");
            return false;
        }
        if(password.length < 8) {
            setAlertMessage("Password should contain atleast 8 characters");
            return false;
        }
        if(name.length <= 2) {
            setAlertMessage("Please enter a name");
            return false;
        }
        return true;
    };

    if (state.isAuthenticated) {
        return(
            <Redirect to="/admin" />
        );
    };

    if(alertMessage.includes("successfully")) {
        return(
            <Redirect to="/login" />
        );
    }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                onChange={event => {setName(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={event => {setEmail(event.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => {setPassword(event.target.value)}}
              />
            </Grid>
            <Grid>
                {alertMessage && 
                <Alert severity="info">
                    {alertMessage}
                </Alert>}
            </Grid>
          </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleRegister()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/login" variant="body2">
                    {"Already registered? Log In"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              Copyright Doggo
            </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Register;