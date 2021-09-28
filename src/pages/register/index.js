import React from "react";
import { Card, AuthLayout } from "components";
import {
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";
import authRequest from "api/auth";

export default function Register() {
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const toast = useToast();
  const notif = (title, message, type) => {
    toast({
      title: title,
      description: message,
      status: type,
      duration: 3000,
      isClosable: true,
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await authRequest.register(data);
      notif("Daftar berhasil", "silahkan login", "success");
      setData({});
      window.location.href = "/";
    } catch (error) {
      notif("Ooops", error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card>
        <Center fontWeight="bold" fontSize="20px">
          Daftar Akun
        </Center>
        <FormControl mb={4} mt={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            variant="filled"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            variant="filled"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </FormControl>
        <Button
          w="full"
          variant="dark"
          mb={4}
          onClick={handleRegister}
          isLoading={isLoading}
          loadingText="Harap tunggu..."
        >
          Daftar
        </Button>
      </Card>
    </AuthLayout>
  );
}
