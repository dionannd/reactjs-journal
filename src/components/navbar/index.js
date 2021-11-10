import { Flex, Text, IconButton } from "@chakra-ui/react";
import { RiShutDownLine } from "react-icons/ri";
import { FiBook } from "react-icons/fi";

const Navbar = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Flex
        height="4rem"
        px="8rem"
        alignItems="center"
        bg="white"
        boxShadow="sm"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Flex alignItems="center" fontWeight="bold">
            <Text fontSize="24">SiJ</Text>
            <FiBook />
            <Text fontSize="24">ur</Text>
          </Flex>
          <Text ml={14}>Report</Text>
        </Flex>
        <IconButton
          icon={<RiShutDownLine />}
          size="sm"
          variant="outline-logout"
          onClick={logout}
          fontWeight="reguler"
        ></IconButton>
      </Flex>
    </>
  );
};

export default Navbar;
