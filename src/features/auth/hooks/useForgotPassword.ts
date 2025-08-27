import { useMutation } from "@tanstack/react-query";

import { forgotPassword } from "../services/api";
import type { ForgotPasswordData } from "../auth.types";
import Swal from "sweetalert2";
import { swal } from "@/lib/utils";
import router from "next/router";
import { ErrorResponse } from "@/lib/types";
import { formatErrorMessage } from "@/lib/errorUtils";

export function useForgotPassword() {
  const mutation = useMutation({
    mutationFn: async (data: ForgotPasswordData) => await forgotPassword(data),
    onSuccess: (response) => {
      swal("Password reset email sent!", "Please check your inbox.", "success");
    },
    onError: (error: ErrorResponse) => {
      swal("Error", formatErrorMessage(error), "error");
    },
  });

  return {
    sendResetEmail: mutation.mutateAsync,
    isSending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
}
