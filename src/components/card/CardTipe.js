import { Center } from "@chakra-ui/layout";
import { Card } from "components";
import { currencyFormat } from "utils";

const CardTipe = (props) => {
  const { data } = props;
  return (
    <>
      <Card boxShadow="sm" px="14px" py="14px">
        <Center>Pemasukan</Center>
        <Center fontWeight="bold" fontSize="21px" color="green">
          0{/* {data.income} */}
        </Center>
      </Card>
      <Card boxShadow="sm" px="14px" py="14px">
        <Center>Pengeluaran</Center>
        <Center fontWeight="bold" fontSize="21px" color="red">
          0{/* {data.loss} */}
        </Center>
      </Card>
    </>
  );
};

export default CardTipe;
