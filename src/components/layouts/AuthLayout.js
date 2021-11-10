import React from "react";
import { Flex } from "@chakra-ui/react";

export default function AuthLayout({ children }) {
  return (
    <Flex height="25rem" maxW="30rem" margin="auto" mt={20}>
      {children}
    </Flex>
  );
}
