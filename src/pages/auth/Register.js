import React, { useState, useEffect } from "react";
import { CardAuth, AuthLayout } from "components";
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiBook } from "react-icons/fi";
import { Link } from "react-router-dom";
import authRequest from "api/auth";

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const toast = useToast();
  const notif = (title, message, type) => {
    toast({
      title: title,
      description: message,
      status: type,
      variant: "left-accent",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await authRequest.register(data);
      notif("Success!", "Done, please login", "success");
      setData({});
    } catch (error) {
      notif("Error!", error.response.data.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Sign Up — Sijour";
  });

  return (
    <AuthLayout>
      <Flex
        bg="black"
        w="1.5rem"
        h="25rem"
        roundedLeft="full"
        boxShadow="md"
        px={0}
        py={0}
      ></Flex>
      <CardAuth px={10} py={5}>
        <Heading fontSize="32" color="black">
          Join with
        </Heading>
        <Heading mb={5}>
          <Flex fontSize="34">
            <Text>SiJour</Text>
            <FiBook />
          </Flex>
        </Heading>
        <FormControl mb={3}>
          <Input
            type="text"
            variant="flushed"
            size="sm"
            fontSize="sm"
            placeholder="N A M E"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </FormControl>
        <FormControl mb={3}>
          <Input
            type="email"
            variant="flushed"
            size="sm"
            fontSize="sm"
            placeholder="E M A I L"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </FormControl>
        <FormControl mb={3}>
          <Input
            type="password"
            variant="flushed"
            size="sm"
            fontSize="sm"
            placeholder="P A S S W O R D"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </FormControl>
        <FormControl mb={5}>
          <Input
            type="password"
            variant="flushed"
            size="sm"
            fontSize="sm"
            placeholder="R E P E A T  P A S S W O R D"
            onChange={(e) =>
              setData({ ...data, password_confirm: e.target.value })
            }
          />
        </FormControl>
        <Button
          w="full"
          rounded="sm"
          variant="dark"
          fontSize="xs"
          mb={5}
          onClick={handleRegister}
          isLoading={isLoading}
          loadingText="Harap tunggu..."
        >
          SIGN UP
        </Button>
        <Flex>
          <Text>Already have an account?</Text>
          <Button
            as={Link}
            to="/"
            ml={1}
            variant="link"
            color="blue.500"
            fontWeight="normal"
          >
            Log in
          </Button>
        </Flex>
      </CardAuth>
    </AuthLayout>
  );
}
