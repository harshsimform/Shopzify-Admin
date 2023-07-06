import { useColorMode } from "@chakra-ui/color-mode";
import { IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <header className="darkModeBtn">
        <IconButton
          aria-label="dark-mode"
          isRound={true}
          size="sm"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <FaMoon /> : <FaSun />}
        </IconButton>
      </header>
    </>
  );
};

export default ColorMode;
