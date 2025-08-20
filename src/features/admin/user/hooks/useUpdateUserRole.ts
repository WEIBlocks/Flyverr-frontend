import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRole } from "../services/api";
import Swal from "sweetalert2";
import { ErrorResponse } from "@/lib/types";
import { createUserFriendlyError } from "@/lib/errorUtils";

interface UpdateUserRoleData {
  role: "user" | "admin";
  reason: string;
}

interface UpdateUserRoleParams {
  userId: string;
  data: UpdateUserRoleData;
}

// Wrapper function to convert axios response to standard promise
const updateUserRoleWrapper = async (
  userId: string,
  data: UpdateUserRoleData
) => {
  const response = await updateUserRole(userId, data);
  return response.data;
};

export function useUpdateUserRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: UpdateUserRoleParams) =>
      updateUserRoleWrapper(userId, data),
    onSuccess: (data, variables) => {
      // Invalidate and refetch user data
      Swal.fire({
        title: "User role updated",
        icon: "success",
        text: "User role updated successfully",
      }).then(async () => {
        await queryClient.invalidateQueries({
          queryKey: ["admin-user", variables.userId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["admin-users"],
        });
      });
    },
    onError: (error: ErrorResponse) => {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: createUserFriendlyError(error),
      });
    },
  });
}
