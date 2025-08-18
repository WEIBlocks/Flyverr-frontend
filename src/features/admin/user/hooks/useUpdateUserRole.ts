import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserRole } from "../services/api";

interface UpdateUserRoleData {
  role: "user" | "admin";
  reason: string;
}

interface UpdateUserRoleParams {
  userId: string;
  data: UpdateUserRoleData;
}

// Wrapper function to convert axios response to standard promise
const updateUserRoleWrapper = async (userId: string, data: UpdateUserRoleData) => {
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
      queryClient.invalidateQueries({
        queryKey: ["admin-user", variables.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["admin-users"],
      });
    },
    onError: (error) => {
      console.error("Error updating user role:", error);
    },
  });
}
