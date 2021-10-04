import React from "react";
import { Helmet } from "react-helmet";
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
import debounce from "utils";

export default function HomePage() {
  const [transaction, setTransaction] = React.useState([]);
  const [data, setData] = React.useState({});
  const [search, setSearch] = React.useState("");
  const [isLoadingSave, setLoadingSave] = React.useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const notification = (title, message, type) => {
    toast({
      title: title,
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  const getTransaction = async (q) => {
    const response = await transactionRequest.getTransaction(q);
    setTransaction(response.data);
  };

  const handleSearch = debounce((e) => {
    setSearch(e);
  }, 500);

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

  const deleteTransaction = async (id) => {
    try {
      await transactionRequest.deleteTransaction(id);
      notification("Sukses!", "Transaksi berhasil dihapus", "success");
      getTransaction();
    } catch (error) {
      notification("Ooops!", error.response.data.message, "error");
    }
  };

  React.useEffect(() => {
    getTransaction(search);
  }, [search]);

  return (
    <>
      <Helmet>
        <title>Home Transaksi</title>
      </Helmet>
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
            onChange={(e) => handleSearch(e.target.value)}
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
          <CardItem
            data={item}
            key={index}
            deleteData={(id) => deleteTransaction(id)}
          />
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
