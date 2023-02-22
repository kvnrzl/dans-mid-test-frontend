import {
  Container,
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  FormHelperText,
  Text,
  Button,
  Input,
  Center,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../redux/slice/authSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const payload = { email, password };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(login(payload));
    // navigate("/");
  };

  const handleLink = () => {
    dispatch(reset());
  };

  return (
    <Card>
      <CardBody>
        <Center>
          {isSuccess && <Text color="teal">User Registered Successfully</Text>}
        </Center>
        <form onSubmit={handleSubmit}>
          <Center>
            {isError && (
              <Text color="tomato" fontWeight="semibold">
                {message}
              </Text>
            )}
          </Center>
          <FormControl my={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </InputGroup>
          </FormControl>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Text color="black" fontWeight="bold">
              <Link onClick={handleLink} to="/register">
                {" "}
                Daftar
              </Link>
            </Text>
            <Button
              isLoading={isLoading}
              loadingText="Submitting"
              type="submit"
              colorScheme="green"
            >
              Login
            </Button>
          </Box>
        </form>
      </CardBody>
    </Card>
  );
}

export default LoginPage;
