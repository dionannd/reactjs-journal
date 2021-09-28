import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Checkbox } from "@chakra-ui/react";
import { Card } from "components";
import { currencyFormat } from "utils";
import moment from "moment";

export default function TableDetail(props) {
  const { data, handleCheckAll, handleCheck } = props;

  return (
    <Card mt={5} px={0} py={0} fontSize="14px" rounded="lg" boxShadow="sm">
      <Table size="md">
        <Thead bg="#FAFAFA">
          <Tr>
            <Td textAlign="center" width={1}>
              <Checkbox
                onChange={(e) => handleCheckAll(e)}
                colorScheme="dark"
              />
            </Td>
            <Th>Deskripsi</Th>
            <Th>Type</Th>
            <Th>Jumlah</Th>
            <Th>Tanggal</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data && data.length === 0 ? (
            <Tr>
              <Td colSpan={4}>Tidak ada Data</Td>
            </Tr>
          ) : (
            data.map((item, index) => (
              <Tr key={index} bg={item.isChecked ? "gray.50" : null}>
                <Td>
                  <Checkbox
                    isChecked={item.isChecked}
                    onChange={(e) => handleCheck(e, index)}
                    colorScheme="dark"
                  />
                </Td>
                <Td>{item.description}</Td>
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
    </Card>
  );
}
