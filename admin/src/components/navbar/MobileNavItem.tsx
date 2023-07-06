import { Flex, Link, Stack, useColorModeValue } from "@chakra-ui/react";
import { NavItem } from "../../interface/interface";
import { NavLink as ReactRouterLink } from "react-router-dom";

const MobileNavItem = ({ label, to }: NavItem) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <div className="nav">
          <Link
            as={ReactRouterLink}
            to={to}
            fontWeight={500}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Link>
        </div>
      </Flex>
    </Stack>
  );
};

export default MobileNavItem;
