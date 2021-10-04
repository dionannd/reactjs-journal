import React from "react";
import { Helmet } from "react-helmet";
import { Card, AuthLayout } from "components";
import {
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
  Center,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
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
      duration: 5000,
      isClosable: true,
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await authRequest.register(data);
      notif("Sukses!", "Daftar berhasil, silahkan login", "success");
      setData({});
    } catch (error) {
      notif("Ooops!", error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Daftar</title>
      </Helmet>
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
            mb={3}
            onClick={handleRegister}
            isLoading={isLoading}
            loadingText="Harap tunggu..."
          >
            Daftar
          </Button>
          <Text>
            Kembali ke halaman
            <Link to="/">
              <Button
                size="sm"
                variant="link"
                color="black"
                fontSize="16px"
                ml={1}
              >
                login
              </Button>
            </Link>
          </Text>
        </Card>
      </AuthLayout>
    </>
  );
}
