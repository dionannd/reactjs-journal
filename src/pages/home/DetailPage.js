import transactionRequest from "api/transaction";
import React from "react";
import { useParams, Link as ReactLink } from "react-router-dom";
import {
  Flex,
  Button,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, SearchIcon } from "@chakra-ui/icons";
import { TableDetail } from "components";
import ReactPaginate from "react-paginate";
import debounce from "utlis";

function DetailPage() {
  const { id } = useParams();
  const [listDetail, setListDetail] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalCount, setTotalCount] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [listSelected, setListSelected] = React.useState([]);

  const getHeader = async () => {
    const res = await transactionRequest.getDetailTransaction(id);
  };

  const getDetails = async (page, search = "") => {
    setListDetail([]);
    const res = await transactionRequest.getListDetail(id, page, search);
    setListSelected([]);
    setListDetail(res.data);
    setTotalCount(res.totalCount);
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

  React.useEffect(() => {
    getHeader(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    getDetails(page, search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  return (
    <>
      <Flex alignItems="center">
        <InputGroup mr={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            type="tel"
            placeholder="Cari..."
            bg="white"
            onChange={(e) => handleSearch(e.target.value)}
            _focus={{
              borderColor: "gray.500",
            }}
          />
        </InputGroup>
        {checkLengthCheckbox() > 0 && (
          <Button mr={4} px={8} colorScheme="red" onClick={deleteDetails}>
            Hapus
          </Button>
        )}
        <Button colorScheme="dark" px={10}>
          Tambah Detail
        </Button>
      </Flex>
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
  );
}

export default DetailPage;
