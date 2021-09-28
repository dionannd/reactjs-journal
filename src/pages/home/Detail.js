import React from "react";
import { useHistory, useParams } from "react-router-dom";
import transactionRequest from "api/transaction";
import {
  Flex,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  useToast,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { TableDetail, ModalDetail, CardTipe } from "components";
import ReactPaginate from "react-paginate";
import debounce from "utils";
import { Icon } from "@chakra-ui/react";

function DetailPage() {
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = React.useState({});
  const [page, setPage] = React.useState(1);
  const [search, setSearch] = React.useState("");

  const [listDetail, setListDetail] = React.useState([]);
  const [listSelected, setListSelected] = React.useState([]);
  const [totalCount, setTotalCount] = React.useState(0);

  const [isLoadingSave, setLoadingSave] = React.useState(false);

  const toast = useToast();
  const history = useHistory();

  const notification = (title, message, type) => {
    toast({
      title: title,
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  // const getHeader = async () => {
  //   const res = await transactionRequest.getDetailTransaction(id);
  // };

  const getDetails = async (page, search = "") => {
    setListDetail([]);
    const res = await transactionRequest.getListDetail(id, page, search);
    setListSelected([]);
    setListDetail(res.data);
    setTotalCount(res.totalCount);
  };

  const getTipeDetail = async () => {
    const response = await transactionRequest.getDetailTipe(id);
    setData(response.data);
  };

  const deleteDetails = async () => {
    try {
      const payload = {
        transaction_id: listSelected,
      };
      await transactionRequest.deleteDetailTransaction(payload);
      getDetails(page, search);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckAll = (e) => {
    const newArray = listDetail.map((item) => {
      return {
        ...item,
        isChecked: e.target.checked,
      };
    });

    setListSelected(newArray.map((i) => i.transaction_detail_id));
    setListDetail(newArray);
  };

  const handleCheck = (e, id) => {
    const newArray = listDetail.map((item, index) => {
      if (index === id) {
        item.isChecked = e.target.checked;
      }
      return item;
    });

    const selected = newArray
      .filter((item) => item.isChecked)
      .map((i) => i.transaction_detail_id);

    setListSelected(selected);
    setListDetail(newArray);
  };

  const checkLengthCheckbox = () => {
    const result = listDetail.filter((item) => item.isChecked);
    return result.length;
  };

  const handleSearch = debounce((e) => {
    setSearch(e);
  }, 500);

  const handleDetail = async (data) => {
    try {
      setLoadingSave(true);
      await transactionRequest.saveDetailTransaction(data, id);
      onClose();
      notification("Sukses", "Transaksi berhasil ditambahkan.", "success");
      getDetails(1, "");
      setData({});
    } catch (error) {
      notification("Ooops", "Terjadi kesalahan pada server.", "error");
    } finally {
      setLoadingSave(false);
    }
  };

  // React.useEffect(() => {
  //   getHeader(id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  React.useEffect(() => {
    getDetails(page, search, id);
    getTipeDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  return (
    <>
      <SimpleGrid gap={5} columns={[1, 2, 3, 3]} mb={5}>
        <CardTipe data={data} />
      </SimpleGrid>
      <Flex alignItems="center">
        <Button mr={4} bg="white" onClick={history.goBack}>
          <Icon as={ArrowBackIcon} />
        </Button>
        <InputGroup mr={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Cari Deskripsi..."
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
            onClick={deleteDetails}
            fontWeight="reguler"
          >
            Hapus
          </Button>
        )}
        <Button
          variant="dark-outline"
          px={10}
          onClick={onOpen}
          fontWeight="reguler"
          fontSize="15px"
        >
          Tambah Transaksi
        </Button>
      </Flex>
      {listDetail.length === 0 ? (
        <Box px={8} py={12} rounded="md" w="full" mt={6} borderWidth="1px">
          <Center fontWeight="bold" fontSize={24}>
            Belum ada Transaksi!
          </Center>
          <Center mt={2}>Buat transaksi baru terlebih dahulu.</Center>
        </Box>
      ) : (
        <>
          <TableDetail
            data={listDetail}
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

      <ModalDetail
        isOpen={isOpen}
        onClose={onClose}
        saveDetailTransaction={() => handleDetail(data)}
        data={data}
        setData={setData}
        isLoading={isLoadingSave}
      />
    </>
  );
}

export default DetailPage;
