import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Box } from "@mui/material";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import EmailInput from "../../common/inputs/EmailInput";
import { PasswordInput } from "../../common/inputs/PasswordInput";
import { SubmitButton } from "../../common/SubmitButton/SubmitButton";
import useAuthentication from "../../hooks/useAuthentication";

const defaultFormValues = {
  email: "",
  password: "",
};

const formValidations = {
  email: {
    required: "Email is required.",
    pattern: {
      value:
        /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
      message: "Enter valid E-mail.",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password need to be more than 8 characters.",
    },
  },
};

export const Signin = () => {
  const auth = useAuthentication();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: defaultFormValues,
  });

  const submitHandler = handleSubmit(async (data) => {
    try {
      await auth.signIn(data.email, data.password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container maxWidth="sm">
      <form onSubmit={submitHandler}>
        <Stack spacing={4}>
          <EmailInput
            register={register("email", formValidations.email)}
            error={errors.email}
          />
          <PasswordInput
            register={register("password", formValidations.password)}
            error={errors.password}
          />
          <Box>
            <SubmitButton>LOGIN</SubmitButton>
          </Box>
        </Stack>
      </form>
    </Container>
  );
};
