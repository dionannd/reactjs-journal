import React from "react";
import { Flex } from "@chakra-ui/react";

export default function AuthLayout({ children }) {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      maxW="32rem"
      margin="auto"
    >
      {children}
    </Flex>
  );
}
