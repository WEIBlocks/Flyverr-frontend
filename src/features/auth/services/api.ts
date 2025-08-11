import api from "@/lib/api";
import {
  EditUserData,
  ForgotPasswordData,
  LoginData,
  SignupData,
} from "../auth.types";

export function signup(data: SignupData) {
  return api.post("/auth/signup", data);
}

export function login(data: LoginData) {
  return api.post("/auth/login", data);
}

export function forgotPassword(data: ForgotPasswordData) {
  return api.post("/auth/forgot-password", data);
}

export function getUser() {
  return api
    .get("/auth/profile")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function editUser(data: EditUserData) {
  return api.put("/auth/profile", data);
}
