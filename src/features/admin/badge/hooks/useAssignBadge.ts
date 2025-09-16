import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assignBadge } from "../services/api";
import Swal from "sweetalert2";
import { createUserFriendlyError } from "@/lib/errorUtils";

interface AssignBadgeRequest {
  userId: string;
  badgeType: "reseller" | "creator";
}

export function useAssignBadge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: assignBadge,
    onSuccess: (data, variables) => {
      Swal.fire({
        title: "Badge Assigned",
        icon: "success",
        text: data.message || "Badge assigned successfully!",
      }).then(async () => {
        // Invalidate user-related queries to refresh the UI
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
