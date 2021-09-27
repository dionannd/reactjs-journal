import React from "react";
import {
  Flex,
  Text,
  Button,
  SimpleGrid,
  useDisclosure,
  useToast,
  Box,
  Center,
} from "@chakra-ui/react";
import transactionRequest from "api/transaction";
import { CardItem, ModalTransaction } from "components";

export default function HomePage() {
  const [transaction, setTransaction] = React.useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = React.useState({});
  const [isLoadingSave, setLoadingSave] = React.useState(false);
  const toast = useToast();

  const getTransaction = async () => {
    const response = await transactionRequest.getTransaction();
    setTransaction(response.data);
  };

  const notification = (title, message, type) => {
    toast({
      title: title,
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  const handleTransaction = async () => {
    try {
      setLoadingSave(true);
      await transactionRequest.saveTransaction(data);
      onClose();
      notification("Sukses", "transaksi berhasil ditambahkan.", "success");
      getTransaction();
      setData({});
    } catch (error) {
      notification("Ooops", "Terjadi kesalahan pada server.", "error");
    } finally {
      setLoadingSave(false);
    }
  };

  React.useEffect(() => {
    getTransaction();
  }, []);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Text>List Catatan</Text>
        <Button variant="dark-outline" onClick={onOpen} fontWeight="reguler">
          Tambah Catatan
        </Button>
      </Flex>
      {transaction.length === 0 && (
        <Box px={8} py={12} rounded="md" w="full" mt={6} borderWidth="1px">
          <Center fontWeight="bold" fontSize={24}>
            Belum ada Catatan!
          </Center>
          <Center mt={2}>Buat catatan baru terlebih dahulu.</Center>
        </Box>
      )}
      <SimpleGrid gap={4} columns={[2, null, 3]} mt={7}>
        {transaction.map((item, index) => (
          <CardItem data={item} key={index} />
        ))}
      </SimpleGrid>

      <ModalTransaction
        isOpen={isOpen}
        onClose={onClose}
        saveTransaction={handleTransaction}
        data={data}
        setData={setData}
        isLoading={isLoadingSave}
      />
    </>
  );
}
