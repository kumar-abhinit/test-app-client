import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";

import { Link } from "react-router-dom";
import {
  ROUTE_FORGOT_PASSWORD,
  ROUTE_SIGNUP,
} from "../shared/routes/routes.constant";
import axios from "axios";
import { API_BASE_URL } from "../shared/constants";

export default function SignIn() {
  const [user, setUser] = React.useState<any>({});
  const [toast, setToast] = React.useState<any>();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, userRole } = user;
    if (email && password && userRole) {
      try {
        const response = await axios.post(`${API_BASE_URL}/login`, user);
        const respMessage = response.data.message;
        setToast({
          type: "success",
          message: respMessage,
        });
        
      } catch (error: any) {
        const errMessage = error?.response?.data?.message;
        console.log({ error, message: errMessage });
        setToast({
          type: "error",
          message: errMessage,
        });
      }
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <Container maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={8}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  onChange={handleChange}
                  value={user?.email}
                  label="Email"
                  name="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl required fullWidth>
                  <InputLabel id="userRole">Role</InputLabel>
                  <Select
                    value={user?.userRole}
                    onChange={handleChange}
                    id="userRole"
                    name="userRole"
                    autoWidth
                    label="Role"
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="customer">Customer</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={user?.password}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to={ROUTE_FORGOT_PASSWORD}>Forgot password?</Link>
              </Grid>
              <Grid item>
                <Link to={ROUTE_SIGNUP}>Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={!!toast}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={() => setToast(undefined)}
          severity={toast?.type}
          variant="filled"
          icon={false}
        >
          {toast?.message}
        </Alert>
      </Snackbar>
    </>
  );
}
