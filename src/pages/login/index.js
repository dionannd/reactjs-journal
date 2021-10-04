import React from "react";
import { Helmet } from "react-helmet";
import { Card, AuthLayout } from "components";
import {
  Flex,
  Text,
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
  Center,
} from "@chakra-ui/react";
import authRequest from "api/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const toast = useToast();
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await authRequest.login(data);
      localStorage.setItem("token", response.token);

      toast({
        title: "Sukses",
        description: "login berhasil",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      window.location.href = "/home";
    } catch (err) {
      toast({
        title: "Oops!",
        description: err.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Masuk</title>
      </Helmet>
      <AuthLayout>
        <Card>
          <Center fontWeight="bold" fontSize="20px">
            Login
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
            onClick={handleLogin}
            isLoading={isLoading}
            loadingText="Please wait."
          >
            Masuk
          </Button>
          <Flex>
            <Text>
              Tidak punya akun?
              <Link to="/register">
                <Button
                  size="sm"
                  variant="link"
                  color="black"
                  fontSize="16px"
                  ml={1}
                >
                  Daftar disni
                </Button>
              </Link>
            </Text>
          </Flex>
        </Card>
      </AuthLayout>
    </>
  );
}
