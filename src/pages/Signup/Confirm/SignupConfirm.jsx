import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField, Stack } from "@mui/material";
import { Container } from "@mui/system";
import Typography from "@mui/material/Typography";
import { SubmitButton } from "../../../components/common/SubmitButton/SubmitButton";
import useAuthentication from "../../../hooks/useAuthentication";

export const SignupConfirm = () => {
  const userEmail = useSelector((state) => state.signup.email);
  const navigate = useNavigate();
  const auth = useAuthentication();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      code: "",
    },
  });

  const submitHandler = handleSubmit(async (data) => {
    try {
      await auth.confirmSignUp(userEmail, data.code);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container maxWidth="sm">
      <Typography>We Send Email with verfication code.</Typography>
      <Typography mb="2rem">Please enter the code below.</Typography>
      <form onSubmit={submitHandler}>
        <Stack spacing={4}>
          <TextField
            id="code"
            type="number"
            label="verfication code"
            {...register("code", {
              required:
                "verfication code is required.\n please look at the email.",
              maxLength: {
                value: 6,
                message: "verfication code is 6 digit number.",
              },
              minLength: {
                value: 6,
                message: "verfication code is 6 digit number.",
              },
            })}
            error={Boolean(errors.code)}
            helperText={errors.code?.message}
          ></TextField>
          <SubmitButton>CONFIRM</SubmitButton>
        </Stack>
      </form>
    </Container>
  );
};
