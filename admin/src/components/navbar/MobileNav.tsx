import { Stack, useColorModeValue } from "@chakra-ui/react";
import { NAV_ITEMS } from "../../constants/NavItem";
import { NavItem } from "../../interface/interface";
import MobileNavItem from "./MobileNavItem";

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.700")}
      p={4}
      display={{ md: "none" }}
      fontWeight={600}
      userSelect="none"
      borderBottomWidth="1px"
    >
      {NAV_ITEMS.map((navItem: NavItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

export default MobileNav;
