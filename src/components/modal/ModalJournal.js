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
} from "@chakra-ui/react";

const ModalJournal = (props) => {
  const { isOpen, onClose, save, data, setData, isLoading } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg="black" fontSize="18" color="white" mb="4">
          New Journal
        </ModalHeader>
        <ModalCloseButton color="white" _focus={{ border: 0 }} />
        <ModalBody>
          <FormControl mb={4} isRequired="true">
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              variant="filled"
              size="sm"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </FormControl>
          <FormControl isRequired="true">
            <FormLabel>Description:</FormLabel>
            <Input
              type="text"
              variant="filled"
              size="sm"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="dark"
            fontSize="sm"
            rounded="sm"
            onClick={save}
            isLoading={isLoading}
            loadingText="Memproses"
            fontWeight="reguler"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalJournal;
