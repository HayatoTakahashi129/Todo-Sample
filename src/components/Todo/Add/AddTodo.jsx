import { Box, Stack, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import { DateTimeInput } from "../../../common/DateTimeInput/DateTimeInput";
import { SubmitButton } from "../../../common/SubmitButton/SubmitButton";
import useApi from "../../../hooks/axios/useApi";
import URI_CONST from "../../../hooks/axios/constants/uriConst";

const formValidations = {
  title: {
    required: "title is required.",
    maxLength: {
      value: 120,
      message: "title must be less than 120.",
    },
  },
  dueDate: {
    required: "dueDate is required.",
  },
  description: {
    maxLength: {
      value: 1024,
      message: "description must be less than 1024.",
    },
  },
};

const defaultValues = {
  title: "",
  dueDate: "",
  description: "",
};

export const AddTodo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues,
  });
  const sendApi = useApi();

  const submitHandler = handleSubmit(async (data) => {
    console.log("data", data);
    const result = await sendApi(URI_CONST.postTodo, data);
  });

  return (
    <Container>
      <form onSubmit={submitHandler}>
        <Stack spacing={4}>
          <TextField
            id="title"
            label="title"
            variant="standard"
            {...register("title", formValidations.title)}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
          <DateTimeInput
            id="dueDate"
            label="dueDate"
            register={register("dueDate", formValidations.dueDate)}
            errors={errors.dueDate}
          />
          <TextField
            id="description"
            label="description"
            variant="standard"
            {...register("description", formValidations.description)}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
          <Box>
            <SubmitButton>SUBMIT</SubmitButton>
          </Box>
        </Stack>
      </form>
    </Container>
  );
};
