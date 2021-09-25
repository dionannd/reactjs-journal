import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

const ModalTransaction = (props) => {
  const { isOpen, onClose, saveTransaction, data, setData, isLoading } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Transaksi</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Nama</FormLabel>
            <Input
              variant="filled"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Deskripsi</FormLabel>
            <Input
              variant="filled"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="primary"
            onClick={saveTransaction}
            isLoading={isLoading}
            loadingText="Memproses"
          >
            Simpan
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalTransaction;
