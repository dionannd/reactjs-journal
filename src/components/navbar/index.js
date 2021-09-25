import { Flex, Text } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex
      height="5rem"
      px="3.5rem"
      alignItems="center"
      bg="white"
      boxShadow="sm"
    >
      <Text fontWeight="bold" mr={10}>
        Bukuku
      </Text>
      <Flex alignItems="center">
        <Text>Laporan</Text>
      </Flex>
    </Flex>
  );
};

export default Navbar;
