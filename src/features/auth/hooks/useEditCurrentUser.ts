import { useMutation, useQueryClient } from "@tanstack/react-query";


import { editUser } from "../services/api";
import type { EditUserData } from "../auth.types";
import { storage, swal } from "@/lib/utils";
import { createUserFriendlyError } from "@/lib/errorUtils";

export function useEditCurrentUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: EditUserData) => {
      // Ensure we're on the client side
      if (typeof window === "undefined") {
        throw new Error("Cannot update profile on server side");
      }
      return await editUser(data);
    },
    onSuccess: (response) => {
      const responseData: any = response.data;
      console.log("responseData", responseData);
      if (!responseData?.success) {
        throw new Error(responseData?.message || "Failed to update profile");
      }

      const updatedUser = responseData.data?.user;
      if (!updatedUser) {
        throw new Error("Invalid update profile response");
      }

      storage.setUser(updatedUser);

      swal("Success", "Profile updated successfully!", "success", () => {
        queryClient.invalidateQueries({ queryKey: ["auth", "current-user"] });
      });
    },
    onError: (error: any) => {
      swal("Error", createUserFriendlyError(error), "error");
    },
  });

  return {
    updateProfile: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
