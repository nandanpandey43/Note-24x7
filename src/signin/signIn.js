import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Logo from "../landingpage/components/logo.js";
import useStyles from "./styles";
import { withStyles } from "@material-ui/core/styles";

import { auth, projectFirestore } from "../firebase";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      loginError: ""
    };
  }

  render() {
    const { classes } = this.props;

    
    const buttonStyle = {
      backgroundColor: "#00C170"
    };

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Link className={classes.link} to="/">
            <div className={classes.logoContainer}>
              <Logo></Logo>
              <h1 className={classes.title}>NOTES 24x7</h1>
            </div>
          </Link>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={e => this.submitLogin(e)}>
            <TextField
              
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => this.userTyping("email", e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required 
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => this.userTyping("password", e)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}


            {/* Implementing test account */}
            <Button 
              fullWidth
              variant="contained"
              color="primary"
              onClick = { ()=> {
              //  this.setState({email: "test@test.com", password: "123456789"});
               auth
                .signInWithEmailAndPassword("test@test.com", "123456789")
                .then(
                  () => {
                    this.props.history.push("/app");
                  },
                  err => {
                    this.setState({ loginError: "server error" });
                    console.log(err);
                  }
                );
             } }
              >
              Use Test Account
            </Button>


            <Button
              style={buttonStyle}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            {this.state.loginError ? (
              <Typography
                className={classes.errorText}
                component="h5"
                variant="body2"
              >
                The email address or password entered is incorrect
              </Typography>
            ) : null}
            <Grid container justify="center">
              <Grid item>
                <Link className={classes.link} variant="body2" to="/signup">
                  Don't have an account?{" "}
                  <span className={classes.signUp}>Sign Up</span>
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;
      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  submitLogin = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        () => {
          this.props.history.push("/app");
        },
        err => {
          this.setState({ loginError: "server error" });
          console.log(err);
        }
      );
  };
}

export default withStyles(useStyles)(SignIn);
