import { Center } from "@chakra-ui/layout";
import { Card } from "components";
import { currencyFormat } from "utils";

const CardTipe = (props) => {
  const { data } = props;
  return (
    <>
      <Card boxShadow="sm" px="14px" py="14px">
        <Center fontWeight="semibold">Pemasukan</Center>
        <Center fontWeight="bold" fontSize="21px" color="green">
          {currencyFormat(data.pemasukan)}
        </Center>
      </Card>
      <Card boxShadow="sm" px="14px" py="14px">
        <Center fontWeight="semibold">Pengeluaran</Center>
        <Center fontWeight="bold" fontSize="21px" color="red">
          {currencyFormat(data.pengeluaran)}
        </Center>
      </Card>
      <Card boxShadow="sm" px="14px" py="14px">
        <Center fontWeight="semibold">Keuntungan</Center>
        <Center fontWeight="bold" fontSize="21px" color="blue">
          {currencyFormat(data.pemasukan - data.pengeluaran)}
        </Center>
      </Card>
    </>
  );
};

export default CardTipe;
