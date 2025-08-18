import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../services/api";
import { toast } from "react-hot-toast";

interface UpdateUserStatusData {
  status: "active" | "suspended" | "banned";
  reason?: string;
  adminNotes?: string;
  suspensionDuration?: number; // days
}

interface UpdateUserStatusParams {
  userId: string;
  data: UpdateUserStatusData;
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, data }: UpdateUserStatusParams) => {
      const response = await updateUserStatus(userId, data);
      return response;
    },
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
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    },
  });
}
