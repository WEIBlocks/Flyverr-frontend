import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserStatus } from "../services/api";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { createUserFriendlyError } from "@/lib/errorUtils";

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
      Swal.fire({
        title: "User status updated",
        icon: "success",
        text: "User status updated successfully",
      }).then(async () => {
        await queryClient.invalidateQueries({
          queryKey: ["admin-user", variables.userId],
        });
        await queryClient.invalidateQueries({
          queryKey: ["admin-users"],
        });
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: createUserFriendlyError(error),
      });
    },
  });
}
