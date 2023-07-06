import {
  Box,
  Center,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import ProductCrudManagement from "./crud/ProductCrudManagement";

const ProductsManagement = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const headingColor = useColorModeValue("teal.400", "teal.500");

  return (
    <>
      <Box marginX={4} marginTop={isScreenFixed ? "5.5rem" : "2rem"}>
        <Center>
          <Heading textAlign="center" colorScheme={"teal"} color={headingColor}>
            Products Management
          </Heading>
        </Center>
        <ProductCrudManagement />
      </Box>
    </>
  );
};

export default ProductsManagement;
