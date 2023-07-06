import {
  Input as ChakraInput,
  FormLabel,
  Box,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";
import { Props } from "../../interface/interface";
import { Field } from "formik";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Input: React.FC<Props> = (props) => {
  const { label, name, type, ...rest } = props;
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordType = type === "password";

  return (
    <Box marginY={2} width="full">
      <FormLabel htmlFor={name} color="teal.600">
        {label}
      </FormLabel>
      {isPasswordType ? (
        <InputGroup size="md">
          <Field
            as={ChakraInput}
            pr={isPasswordType ? "4.5rem" : undefined}
            type={showPassword ? "text" : "password"}
            placeholder={label}
            id={name}
            name={name}
            color="gray.500"
            {...rest}
          />
          <InputRightElement>
            <Button
              borderColor={"2px"}
              h="1.75rem"
              mr={1}
              size="sm"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      ) : (
        <Field
          as={ChakraInput}
          id={name}
          name={name}
          color="gray.500"
          {...rest}
        />
      )}
      <ErrorMessage name={name} component={TextError} />
    </Box>
  );
};

export default Input;
