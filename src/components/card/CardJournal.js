import React from "react";
import { Box, Avatar, Flex, Text, Button } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { currencyFormat } from "utils";
import { Link } from "react-router-dom";

export default function CardJournal(props) {
  const { data, deleteData } = props;

  return (
    <Box
      bg="white"
      px={4}
      py={4}
      rounded="lg"
      boxShadow="lg"
      _hover={{ boxShadow: "xl", cursor: "pointer" }}
    >
      <Link to={`/home/transaction/${data.journal_id}`}>
        <Flex alignItems="center">
          <Avatar name={data.name} fontWeight="bold" size="sm" mr={4} />
          <Box>
            <Text fontWeight="bold">{data.name}</Text>
            <Text fontSize="14px" color="gray.500">
              {data.description}
            </Text>
          </Box>
        </Flex>
        <Text mt={5} fontSize="16px" fontWeight="600" textAlign="center">
          {currencyFormat(data.total)}
        </Text>
      </Link>
      <Flex justifyContent="right" alignItems="center">
        <Button
          size="sm"
          mt={2}
          bg="transparent"
          color="red.400"
          _hover={{
            bg: "red.400",
            color: "white",
          }}
          onClick={() => deleteData(data.journal_id)}
        >
          <DeleteIcon />
        </Button>
      </Flex>
    </Box>
  );
}
