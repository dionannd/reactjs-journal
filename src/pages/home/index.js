import React from "react";
import {
  Flex,
  Button,
  SimpleGrid,
  useDisclosure,
  useToast,
  Box,
  Center,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import transactionRequest from "api/transaction";
import { CardItem, ModalTransaction } from "components";

export default function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [transaction, setTransaction] = React.useState([]);
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
        <InputGroup mr={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Cari Catatan..."
            bg="white"
            _focus={{
              borderColor: "gray.500",
            }}
          />
        </InputGroup>
        <Button
          variant="dark-outline"
          onClick={onOpen}
          fontWeight="reguler"
          fontSize="15px"
        >
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
