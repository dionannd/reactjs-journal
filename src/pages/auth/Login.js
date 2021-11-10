import React, { useState, useEffect } from "react";
import { CardAuth, AuthLayout } from "components";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiBook, FiEye, FiEyeOff } from "react-icons/fi";
import authRequest from "api/auth";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const toast = useToast();

  const handleClick = () => setShow(!show);

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

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await authRequest.login(data);
      localStorage.setItem("token", response.token);

      window.location.href = "/home";
    } catch (err) {
      notification("Error!", err.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `Login - Sijour`;
  });

  return (
    <AuthLayout>
      <CardAuth boxShadow="md">
        <Heading mb={8} mt={2}>
          <Flex fontSize="24">
            <Text mr={1}>LOGIN TO SIJOUR</Text>
            <FiBook />
          </Flex>
        </Heading>
        <FormControl mb={4}>
          <FormLabel fontSize="xs" fontWeight="bold">
            E M A I L
          </FormLabel>
          <Input
            type="text"
            variant="filled"
            rounded="sm"
            fontSize="sm"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </FormControl>
        <FormControl mb={6}>
          <FormLabel fontSize="xs" fontWeight="bold">
            P A S S W O R D
          </FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              variant="filled"
              rounded="sm"
              fontSize="sm"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <InputRightElement width="3rem">
              <Text as="button" size="sm" onClick={handleClick}>
                {show ? <FiEyeOff /> : <FiEye />}
              </Text>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          w="full"
          variant="dark"
          rounded="sm"
          mb={5}
          fontSize="xs"
          onClick={handleLogin}
          isLoading={isLoading}
          loadingText="Please wait..."
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
      <Flex
        bg="black"
        w="1.5rem"
        h="25rem"
        roundedRight="full"
        boxShadow="md"
        px={0}
        py={0}
      ></Flex>
    </AuthLayout>
  );
}
