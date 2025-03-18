import useLocalStorage from "@/config/hooks/useLocalStorage.hooks";
import { loginAPI } from "@/service/login.services";
import { localstorageKeys } from "@utils/contant";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormInputs } from "./Login";

const useLogin = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage(localstorageKeys.IS_LOGGED_IN, "false");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    setIsLoginLoading(true);
    setIsLoginError(false);
    loginAPI(data.email, data.password)
      .then(() => {
        reset();
        setIsLoggedIn("true");
        navigate("/", { replace: true });
      })
      .catch(() => {
        setIsLoginError(true);
      })
      .finally(() => {
        setIsLoginLoading(false);
      });
  };

  return {
    isLoggedIn,
    isLoginLoading,
    isLoginError,
    register,
    handleSubmit,
    errors,
    showPassword,
    setShowPassword,
    handleTogglePasswordVisibility,
    onSubmit,
  };
};

export default useLogin;
