import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import journalRequest from "api/journal";
import { CardJournal, ModalJournal } from "components";
import debounce from "utils";

export default function HomePage() {
  const [journal, setJournal] = useState([]);
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [isLoadingSave, setLoadingSave] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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

  const getJournal = async (q) => {
    const response = await journalRequest.getJournal(q);
    setJournal(response.data);
  };

  const handleSave = async () => {
    try {
      setLoadingSave(true);
      await journalRequest.saveJournal(data);
      onClose();
      getJournal();
      setData({});
    } catch (error) {
      notification("Error!", error.response.data.message, "error");
    } finally {
      setLoadingSave(false);
    }
  };

  const deleteJournal = async (id) => {
    try {
      await journalRequest.deleteJournal(id);
      notification("Success!", "Journal has been deleted", "success");
      getJournal();
    } catch (error) {
      notification("Ooops!", error.response.data.message, "error");
    }
  };

  const handleSearch = debounce((e) => {
    setSearch(e);
  }, 500);

  useEffect(() => {
    document.title = "Sijour";
    getJournal(search);
  }, [search]);

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <InputGroup mr={4}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.500" />}
          />
          <Input
            type="tel"
            placeholder="Search journal..."
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
          New Journal
        </Button>
      </Flex>
      {journal.length === 0 && (
        <Box px={8} py={12} rounded="md" w="full" mt={6} borderWidth="1px">
          <Flex direction="column" justifyContent="center" alignItems="center">
            <Text fontWeight="bold" fontSize={24} color="black">
              No journals, yet!
            </Text>
            <Text mt={2} color="gray.600" fontSize="17">
              Create a new journal first.
            </Text>
          </Flex>
        </Box>
      )}
      <SimpleGrid gap={4} columns={[2, null, 3]} mt={7}>
        {journal.map((item, index) => (
          <CardJournal
            data={item}
            key={index}
            deleteData={(id) => deleteJournal(id)}
          />
        ))}
      </SimpleGrid>

      <ModalJournal
        isOpen={isOpen}
        onClose={onClose}
        save={handleSave}
        data={data}
        setData={setData}
        isLoading={isLoadingSave}
      />
    </>
  );
}
