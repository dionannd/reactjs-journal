/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import {
  Flex,
  Button,
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useToast,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { useHistory, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import transactionRequest from "api/transaction";
import { TableTransaction, ModalTransaction, CardTipe } from "components";
import debounce from "utils";

function TransactionPage() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [listTransaction, setListTransaction] = useState([]);
  const [listSelected, setListSelected] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [isLoadingSave, setLoadingSave] = useState(false);

  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const history = useHistory();

  const notification = (title, message, type) => {
    toast({
      title: title,
      description: message,
      status: type,
      variant: "left-accent",
      duration: 3000,
      isClosable: true,
    });
  };

  const getTransaction = async (page, search = "") => {
    setListTransaction([]);
    const res = await transactionRequest.getList(id, page, search);
    setListSelected([]);
    setListTransaction(res.data);
    setTotalCount(res.totalCount);
  };

  const getTipe = async () => {
    const response = await transactionRequest.getTipe(id);
    setData(response.data);
  };

  const handleCheckAll = (e) => {
    const newArray = listTransaction.map((item) => {
      return {
        ...item,
        isChecked: e.target.checked,
      };
    });

    setListSelected(newArray.map((i) => i.transaction_id));
    setListTransaction(newArray);
  };

  const handleCheck = (e, id) => {
    const newArray = listTransaction.map((item, index) => {
      if (index === id) {
        item.isChecked = e.target.checked;
      }
      return item;
    });

    const selected = newArray
      .filter((item) => item.isChecked)
      .map((i) => i.transaction_id);

    setListSelected(selected);
    setListTransaction(newArray);
  };

  const checkLengthCheckbox = () => {
    const result = listTransaction.filter((item) => item.isChecked);
    return result.length;
  };

  const handleSearch = debounce((e) => {
    setSearch(e);
  }, 500);

  const handleTransaction = async (data) => {
    try {
      setLoadingSave(true);
      await transactionRequest.saveTransaction(data, id);
      onClose();
      notification("Success", "Saved successfully.", "success");
      getTransaction(1, "");
      setData({});
    } catch (error) {
      notification("Error", error.response.data.message, "error");
    } finally {
      setLoadingSave(false);
      getTipe();
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const payload = {
        transaction_id: listSelected,
      };
      await transactionRequest.deleteTransaction(payload, id);
      getTransaction(page, search);
      getTipe();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTipe(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.title = "Sijour — Transaction";
    getTransaction(page, search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  return (
    <>
      <SimpleGrid gap={5} columns={[1, 2]} mb={5}>
        <CardTipe data={data} />
      </SimpleGrid>
      <Flex alignItems="center">
        <Button mr={4} bg="white" onClick={history.goBack} boxShadow="md">
          <Icon as={ArrowBackIcon} />
        </Button>
        <InputGroup mr={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.500" />}
          />
          <Input
            type="tel"
            placeholder="Search Description..."
            bg="white"
            onChange={(e) => handleSearch(e.target.value)}
            _focus={{
              borderColor: "gray.500",
            }}
          />
        </InputGroup>
        {checkLengthCheckbox() > 0 && (
          <Button
            mr={4}
            px={8}
            colorScheme="red"
            onClick={() => deleteTransaction(id)}
            fontWeight="reguler"
          >
            Delete
          </Button>
        )}
        <Button
          variant="dark-outline"
          px={10}
          onClick={onOpen}
          fontWeight="reguler"
          fontSize="15px"
        >
          New Transaction
        </Button>
      </Flex>
      {listTransaction.length === 0 ? (
        <Box px={8} py={12} rounded="md" w="full" mt={6} borderWidth="1px">
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Text fontWeight="bold" fontSize={24}>
              No Transactions, yet!
            </Text>
            <Text mt={2}>Create a new transaction first.</Text>
          </Flex>
        </Box>
      ) : (
        <>
          <TableTransaction
            data={listTransaction}
            handleCheckAll={handleCheckAll}
            handleCheck={handleCheck}
          />
          <Box mt={8}>
            <ReactPaginate
              pageCount={totalCount / 10}
              onPageChange={(item) => {
                setPage(item.selected + 1);
              }}
              nextLinkClassName={"pages-link"}
              previousLinkClassName={"pages-link"}
              pageClassName={"page-items"}
              pageLinkClassName={"pages-number"}
              breakClassName={"pages-link"}
              activeClassName={"pages-active"}
              activeLinkClassName={"pages-active-number"}
              breakLinkClassName={"page-items"}
              containerClassName={"pagination"}
              previousLabel={<ArrowBackIcon />}
              nextLabel={<ArrowForwardIcon />}
            />
          </Box>
        </>
      )}

      <ModalTransaction
        isOpen={isOpen}
        onClose={onClose}
        saveTransaction={() => handleTransaction(data)}
        data={data}
        setData={setData}
        isLoading={isLoadingSave}
      />
    </>
  );
}

export default TransactionPage;
