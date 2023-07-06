import { Box, Button, Container, Image, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import PageNotFoundImg from "/404-error.gif";

const PageNotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Box height="100vh" width="100vw" position="relative">
        <Box
          position="relative"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Container
            textAlign={"center"}
            justifyContent={"center"}
            display={"flex"}
          >
            <Box>
              <Image src={PageNotFoundImg} alt="Page Not Found" />
              <Button colorScheme="teal" variant="solid" onClick={goBack}>
                Go Back
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
      <Spacer mt={"2"} />
    </>
  );
};

export default PageNotFound;
