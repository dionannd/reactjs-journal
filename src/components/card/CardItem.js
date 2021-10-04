import React from "react";
import { Box, Avatar, Flex, Text, Button } from "@chakra-ui/react";
import { currencyFormat } from "utils";
import { Link } from "react-router-dom";

export default function CardItem(props) {
  const { data, deleteData } = props;

  return (
    <Box
      bg="white"
      px={4}
      py={6}
      rounded="lg"
      _hover={{ boxShadow: "md", cursor: "pointer" }}
    >
      <Link to={`/home/transaction/${data.transaction_id}`}>
        <Flex alignItems="center">
          <Avatar name={data.name} size="sm" mr={4} />
          <Box>
            <Text fontWeight="bold" color="gray.600">
              {data.name}
            </Text>
            <Text fontSize="13px" color="gray.500">
              {data.description}
            </Text>
          </Box>
        </Flex>
        <Text mt={5} fontSize="18px" fontWeight="600" textAlign="center">
          {currencyFormat(data.total)}
        </Text>
      </Link>
      <Button
        w="full"
        mt={4}
        borderWidth="1px"
        borderColor="red.400"
        bg="transparent"
        color="red.400"
        _hover={{
          bg: "red.400",
          color: "white",
        }}
        onClick={() => deleteData(data.transaction_id)}
      >
        Hapus
      </Button>
    </Box>
  );
}
