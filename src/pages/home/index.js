import React from "react";
import {
  Flex,
  Text,
  Button,
  SimpleGrid,
  useDisclosure,
  useToast,
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
        <Text>List Buku</Text>
        <Button variant="outline" onClick={onOpen}>
          Tambah Buku
        </Button>
      </Flex>
      <SimpleGrid gap={4} columns={[1, 1, 2, 3]} mt={9}>
        {transaction && transaction.length === 0 ? (
          <Text> Tidak Ada Data</Text>
        ) : (
          transaction.map((item, index) => <CardItem data={item} key={index} />)
        )}
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
