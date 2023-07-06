import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import { Props } from "../../interface/interface";
import { Box, FormLabel, Select as ChakraSelect } from "@chakra-ui/react";

const Select = (props: Props) => {
  const { label, name, options, ...rest } = props;
  return (
    <Box>
      <FormLabel htmlFor={name} marginTop={2} color="teal.500">
        {label}
      </FormLabel>
      <Field
        as={ChakraSelect}
        id={name}
        name={name}
        {...rest}
        color={"gray.500"}
      >
        {options?.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </Box>
  );
};

export default Select;
