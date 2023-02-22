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
  Select,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/slice/authSlice";
function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");
  const handlePassword = () => setShowPassword(!showPassword);
  const payload = {
    name,
    email,
    password,
    password_confirmation: confirmPassword,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrMessage("Password and confirmation is not match");
    }
    await dispatch(register(payload));
  };
  const handleLink = () => {
    dispatch(reset());
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess]);
  return (
    <Card>
      <CardBody>
        <form onSubmit={handleSubmit}>
          {isError && (
            <Text color="tomato" fontWeight="semibold">
              {message}
            </Text>
          )}
          <FormControl my={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </FormControl>
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
            {errMessage && (
              <Text color="tomato" fontWeight="semibold">
                {errMessage}
              </Text>
            )}
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </InputGroup>
          </FormControl>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Text fontWeight="bold">
              <Link onClick={handleLink} to="/login">
                Login
              </Link>
            </Text>
            <Button
              isLoading={isLoading}
              loadingText="Submitting"
              type="submit"
              colorScheme="green"
            >
              Submit
            </Button>
          </Box>
        </form>
      </CardBody>
    </Card>
  );
}

export default RegisterPage;
