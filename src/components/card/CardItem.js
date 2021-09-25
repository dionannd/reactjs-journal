import React from "react";
import { Box, Avatar, Flex, Text } from "@chakra-ui/react";
import { currencyFormat } from "utlis";
import { Link } from "react-router-dom";

export default function CardItem(props) {
  const { data } = props;
  return (
    <Link to={`/home/transaction/${data.transaction_id}`}>
      <Box
        bg="white"
        px={4}
        py={6}
        rounded="lg"
        _hover={{ boxShadow: "md", cursor: "pointer" }}
      >
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
      </Box>
    </Link>
  );
}
