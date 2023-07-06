import {
  Box,
  Center,
  Heading,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import ProductDetailsForm from "./crud/ProductDetailsForm";

const AddProduct = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const headingColor = useColorModeValue("teal.400", "teal.500");

  return (
    <>
      <Box marginTop={isScreenFixed ? "5.5rem" : "2rem"}>
        <Center>
          <Heading textAlign="center" colorScheme={"teal"} color={headingColor}>
            Add Product
          </Heading>
        </Center>
        <ProductDetailsForm />
      </Box>
    </>
  );
};

export default AddProduct;
