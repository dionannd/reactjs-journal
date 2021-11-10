import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
} from "@chakra-ui/react";
import { currencyFormat } from "utils";
import moment from "moment";

export default function TableTransaction(props) {
  const { data, handleCheckAll, handleCheck } = props;

  return (
    <Box
      w="full"
      bg="white"
      mt={5}
      px={0}
      py={0}
      fontSize="14px"
      rounded="lg"
      boxShadow="md"
    >
      <Table size="md">
        <Thead bg="gray.100">
          <Tr>
            <Td textAlign="center" width={1}>
              <Checkbox
                onChange={(e) => handleCheckAll(e)}
                colorScheme="dark"
              />
            </Td>
            <Th>Description</Th>
            <Th>Type</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length === 0 ? (
            <Tr>
              <Td colSpan={4}>Tidak ada Data</Td>
            </Tr>
          ) : (
            data.map((item, index) => (
              <Tr key={index} bg={item.isChecked ? "white" : null}>
                <Td>
                  <Checkbox
                    isChecked={item.isChecked}
                    onChange={(e) => handleCheck(e, index)}
                    colorScheme="dark"
                  />
                </Td>
                <Td>{item.name}</Td>
                <Td>{item.tipe}</Td>
                <Td>{currencyFormat(item.amount)}</Td>
                <Td>
                  {moment(item.transaction_date).format("DD MMMM YYYY HH:mm")}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
