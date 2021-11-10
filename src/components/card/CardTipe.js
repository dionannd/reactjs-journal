import { Box, Flex, Text } from "@chakra-ui/layout";
import { currencyFormat } from "utils";

const CardTipe = (props) => {
  const { data } = props;
  return (
    <>
      <Box rounded="sm" w="full" bg="white" boxShadow="md" px="14px" py="14px">
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontWeight="semibold" color="green">
            Income
          </Text>
          <Text fontWeight="bold" fontSize="21px">
            {currencyFormat(data.pemasukan)}
          </Text>
        </Flex>
      </Box>
      <Box rounded="sm" w="full" bg="white" boxShadow="md" px="14px" py="14px">
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Text fontWeight="semibold" color="red">
            Expense
          </Text>
          <Text fontWeight="bold" fontSize="21px">
            {currencyFormat(data.pengeluaran)}
          </Text>
        </Flex>
      </Box>
    </>
  );
};

export default CardTipe;
