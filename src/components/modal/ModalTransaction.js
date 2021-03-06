import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";

const ModalTransaction = (props) => {
  const { isOpen, onClose, saveTransaction, data, setData, isLoading } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="black" fontSize="18" color="white" mb="4">
          New Transaction
        </ModalHeader>
        <ModalCloseButton color="white" _focus={{ border: 0 }} />
        <ModalBody>
          <FormControl mb={4} isRequired="true">
            <FormLabel>Description:</FormLabel>
            <Input
              type="text"
              size="sm"
              variant="filled"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </FormControl>
          <FormControl mb={4} isRequired="true">
            <FormLabel>Jumlah:</FormLabel>
            <Input
              type="number"
              size="sm"
              variant="filled"
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: e.target.value })}
            />
          </FormControl>
          <FormControl isRequired="true">
            <FormLabel>Type:</FormLabel>
            <Select
              size="sm"
              placeholder="-- Select Type --"
              onChange={(e) => setData({ ...data, tipe: e.target.value })}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="dark"
            fontSize="sm"
            rounded="sm"
            fontWeight="reguler"
            onClick={saveTransaction}
            isLoading={isLoading}
            loadingText="Memproses"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalTransaction;
