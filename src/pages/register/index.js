import React from "react";
import { Card, AuthLayout } from "components";
import {
  Flex,
  Text,
  FormControl,
  Input,
  FormLabel,
  Button,
  useToast,
} from "@chakra-ui/react";
import authRequest from "api/auth";

export default function Register() {
  const toast = useToast();
  const [isLoading, setLoading] = React.useState(false);
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  // const handleLogin = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await authRequest.login(data);
  //     localStorage.setItem("token", response.token);

  //     toast({
  //       title: "Sukses",
  //       description: "login berhasil",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });

  //     window.location.href = "/home";
  //   } catch (err) {
  //     toast({
  //       title: "Oops!",
  //       description: err.response.data.message,
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const register = () => {
  //   window.location.href = "/register";
  // };

  return (
    <AuthLayout>
      <Card>
        <FormControl mb={4}>
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
          // onClick={handleLogin}
          isLoading={isLoading}
          loadingText="Please wait."
        >
          Masuk
        </Button>
      </Card>
    </AuthLayout>
  );
}
