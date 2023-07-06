import {
  Box,
  Text,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { AiFillShop } from "react-icons/ai";

const Logo = () => {
  return (
    <Flex display={"flex"} alignItems={"center"} fontSize={"2xl"}>
      <Text fontSize={24}>
        <AiFillShop />
      </Text>
      <Text
        textAlign={useBreakpointValue({ base: "center", md: "left" })}
        fontFamily={"cursive"}
        color={useColorModeValue("gray.800", "white")}
        marginX={1}
      >
        Shopzify
      </Text>
    </Flex>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Box color={useColorModeValue("gray.700", "gray.200")} my={"2rem"}>
      <Box>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <Logo />
        </Flex>
        <Text pt={6} fontSize={"md"} textAlign={"center"}>
          © {year} Shopzify. All rights reserved
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
