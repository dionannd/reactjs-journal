import Navbar from "components/navbar";
import React from "react";
import { Box } from "@chakra-ui/react";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box maxW="60em" margin="auto" mt={10} px={5} mb={20}>
        {children}
      </Box>
    </>
  );
};

export default AuthLayout;
