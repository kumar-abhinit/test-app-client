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
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

import { Link } from "react-router-dom";
import { ROUTE_SIGNIN } from "../shared/routes/routes.constant";
import { User } from "../shared/types/user.type";
import axios from "axios";
import { API_BASE_URL } from "../shared/constants";

export default function SignUp() {
  const [user, setUser] = React.useState<User>();
  // const [error, setError] = React.useState({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ user });
    try {
      const createUser = await axios.post(`${API_BASE_URL}/users`, user);
      console.log({ createUser });
    } catch (err) {
      console.log({ err });
    }
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value } as any);
  };

  return (
    <Container component="main" maxWidth="xs">
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                onChange={handleChange}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={user?.firstName}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                name="lastName"
                onChange={handleChange}
                label="Last Name"
                value={user?.lastName}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                onChange={handleChange}
                value={user?.email}
                type="email"
                label="Email"
                autoComplete="off"
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                onChange={handleChange}
                value={user?.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTE_SIGNIN}>Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
