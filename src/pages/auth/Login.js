import React, { useEffect } from "react";
import { CardAuth, AuthLayout } from "components";
import {
  Flex,
  Text,
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
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

  useEffect(() => {
    document.title = `Login - Sijour`;
  });

  return (
    <>
      <AuthLayout>
        <CardAuth>
          <Heading mb={8} mt={2}>
            <Flex fontSize="24">
              <Text mr={1}>LOGIN TO SIJOUR</Text>
              <FiBook />
            </Flex>
          </Heading>
          <FormControl mb={4}>
            <FormLabel fontSize="xs">E M A I L</FormLabel>
            <Input
              type="text"
              variant="filled"
              rounded="sm"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </FormControl>
          <FormControl mb={6}>
            <FormLabel fontSize="xs">P A S S W O R D</FormLabel>
            <Input
              type="password"
              variant="filled"
              rounded="sm"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </FormControl>
          <Button
            w="full"
            variant="dark"
            rounded="sm"
            mb={5}
            fontSize="xs"
            onClick={handleLogin}
            isLoading={isLoading}
            loadingText="Please wait."
          >
            LOGIN
          </Button>
          <Button
            as={Link}
            to="/register"
            variant="link"
            fontWeight="normal"
            align="center"
            color="blue.500"
          >
            Don't have an account? Sign Up
          </Button>
        </CardAuth>
      </AuthLayout>
    </>
  );
}
