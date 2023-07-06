import { Box, Spinner } from "@chakra-ui/react";

const SuspenseLoading = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        justifyContent="center"
        display="flex"
        alignItems="center"
        boxSize={8}
        borderRadius="50%"
        borderWidth="1px"
        bgColor="transparent"
        boxShadow="base"
      >
        <Spinner thickness="2px" speed="0.65s" color="teal.500" size="md" />
      </Box>
    </Box>
  );
};

export default SuspenseLoading;
