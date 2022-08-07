import { Stack, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../../common/SubmitButton/SubmitButton";
import EmailInput from "../../common/inputs/EmailInput";
import { NicknameInput } from "../../common/inputs/NicknameInput";
import { PasswordInput } from "../../common/inputs/PasswordInput";
import { update } from "./store/signupSlice";
import useAuthentication from "../../hooks/useAuthentication";

const defaultFormValues = {
  email: "",
  nickname: "",
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
  nickname: {
    required: "Nickname is required.",
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password need to be more than 8 characters.",
    },
  },
};

export const Signup = () => {
  const auth = useAuthentication();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      await auth.signUp(data.email, data.nickname, data.password);

      dispatch(update(data));
      navigate("/signup/confirm");
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
          <NicknameInput
            register={register("nickname", formValidations.nickname)}
            error={errors.nickname}
          />
          <PasswordInput
            register={register("password", formValidations.password)}
            error={errors.password}
          />
          <Box>
            <SubmitButton>SUBMIT</SubmitButton>
          </Box>
        </Stack>
      </form>
    </Container>
  );
};
