import {
  Box,
  Center,
  Heading,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import NavItemForm from "./NavPathManagement";

const NavbarManagement = () => {
  const isScreenFixed = useBreakpointValue({ base: false, md: true });
  const headingColor = useColorModeValue("teal.400", "teal.500");

  return (
    <>
      <center>
        <Box
          width={10 / 12}
          textAlign={"center"}
          justifyContent={"center"}
          display={"flex"}
          fontWeight={500}
          color={"teal.400"}
          fontSize="3xl"
          marginTop={isScreenFixed ? "5rem" : "1rem"}
        >
          <Center>
            <Heading
              my={2}
              textAlign="center"
              colorScheme={"teal"}
              color={headingColor}
            >
              Navbar Management
            </Heading>
          </Center>
        </Box>
        <NavItemForm />
      </center>
    </>
  );
};

export default NavbarManagement;
