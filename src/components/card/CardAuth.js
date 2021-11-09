import { Box } from "@chakra-ui/react";

const CardAuth = ({ children, ...rest }) => {
  return (
    <>
      <Box px={10} py={10} rounded="sm" w="full" bg="white" {...rest}>
        {children}
      </Box>
      <Box w="20px" bg="red"></Box>
    </>
  );
};

export default CardAuth;