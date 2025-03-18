import { imgLogo } from "@assets/images";
import { LoaderButton } from "@components/design/Button";
import ImageComp from "@components/design/Image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { Navigate } from "react-router-dom";
import useLogin from "./Login.controller";

export type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    isLoggedIn,
    isLoginLoading,
    isLoginError,
    register,
    handleSubmit,
    errors,
    showPassword,
    handleTogglePasswordVisibility,
    onSubmit,
  } = useLogin();

  if (isLoggedIn == "true") {
    return <Navigate to={"/"} replace />;
  }
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "primary.main",
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: "50%",
          maxWidth: "90%",
          height: "100%",
          backgroundColor: "white",
          borderTopRightRadius: "100px",
          borderBottomRightRadius: "100px",
          display: "grid",
          placeItems: "center",
          placeContent: "center",
        }}
      >
        <Box
          // elevation={4}
          sx={{
            p: 4,
            maxWidth: "600px",
            width: "100%",
            maxHeight: "fit-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            // backgroundColor: "background.paper",
          }}
        >
          <Typography variant="h2" color="primary.main" style={{ fontSize: "35px" }} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Login to access your account
          </Typography>

          <Typography
            variant="subtitle1"
            width={"100%"}
            style={{
              fontSize: "13px",
              fontWeight: "600",
              visibility: isLoginError ? "visible" : "hidden",
            }}
            textAlign={"start"}
            color={"error"}
            mt={"10px"}
            gutterBottom
          >
            *Invalid Email or Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <LoaderButton
              loading={isLoginLoading}
              type="submit"
              variant="contained"
              color="primary"
              label="Login"
              mt={"20px"}
              style={{
                width: "100%",
                textTransform: "none",
                fontWeight: "bold",
                // borderRadius: 2,
              }}
            />
          </Box>
        </Box>
      </Box>
      <Stack
        sx={{ flex: 1, height: "100%", display: { md: "flex", xs: "none" } }}
        justifyContent="center"
        alignItems="center"
      >
        <ImageComp
          img={imgLogo}
          alt="IPO"
          style={{
            width: "50%",
            aspectRatio: 1,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default LoginPage;
