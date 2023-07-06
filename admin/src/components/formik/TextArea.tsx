import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { Props } from "../../interface/interface";
import { Box, FormLabel, Textarea } from "@chakra-ui/react";

const TextArea = (props: Props) => {
  const { label, name, ...rest } = props;
  return (
    <Box>
      <FormLabel htmlFor={name} color="teal.500">
        {label}
      </FormLabel>
      <Field as={Textarea} id={name} name={name} {...rest} color={"gray.500"} />
      <ErrorMessage name={name} component={TextError} />
    </Box>
  );
};

export default TextArea;
