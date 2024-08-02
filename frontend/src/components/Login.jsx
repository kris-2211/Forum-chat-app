// src/Login.js
import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { loginUser } from "../services/UserService.js";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [open, setOpen] = useState(false);
  const { email, password } = formData;
  const { user, token, setUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);

      setUser(response.data);
      setToken(response.token);
      setMessage(response.message);
      setAlertSeverity("success");
      setOpen(true);
      navigate("/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
      if (error.response?.data?.message == "User Not Found") {
        setMessage("Create an account");
        setTimeout(() => {
          navigate("/register");
        }, 1000);
      }
      setAlertSeverity("error");
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          style={{ borderRadius: "30px" }}
          onClose={handleClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Login
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={email}
                autoComplete="current-email"
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={onChange}
                placeholder="Enter your password"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justifyContent="flex-end" padding="20px">
          <Grid item>
            <Typography variant="body2">
              New User? <Link to="/register">SignUp</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
