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
  Select,
} from "@chakra-ui/react";

const ModalDetail = (props) => {
  const { isOpen, onClose, saveDetailTransaction, data, setData, isLoading } =
    props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Tambah Transaksi</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Deskripsi</FormLabel>
            <Input
              variant="filled"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Tipe</FormLabel>
            <Select
              placeholder="-- Pilih Tipe --"
              onChange={(e) => setData({ ...data, tipe: e.target.value })}
            >
              <option value="pengeluaran">Pengeluaran</option>
              <option value="pemasukan">Pemasukan</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Jumlah</FormLabel>
            <Input
              type="number"
              variant="filled"
              value={data.amount}
              onChange={(e) => setData({ ...data, amount: e.target.value })}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="dark"
            fontWeight="reguler"
            onClick={saveDetailTransaction}
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

export default ModalDetail;
