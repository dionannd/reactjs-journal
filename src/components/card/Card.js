import { Box } from "@chakra-ui/react";

const Card = ({ children, ...rest }) => {
  return (
    <Box
      px={10}
      py={10}
      boxShadow="md"
      rounded="md"
      w="full"
      bg="white"
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Card;
