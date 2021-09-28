import { Flex, Text, Button } from "@chakra-ui/react";
import { RiShutDownLine } from "react-icons/ri";

const Navbar = () => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <Flex
        height="5rem"
        px="3.5rem"
        alignItems="center"
        bg="white"
        boxShadow="sm"
        justifyContent="space-between"
      >
        <Flex>
          <Text fontWeight="bold" mr={10}>
            MyBuku
          </Text>
          <Text mr={5}>Laporan</Text>
        </Flex>
        <Flex>
          <Button
            variant="outline-logout"
            leftIcon={<RiShutDownLine />}
            onClick={logout}
            fontWeight="reguler"
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Navbar;
