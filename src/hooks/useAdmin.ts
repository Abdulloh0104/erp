// hooks/useAdminProfile.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@service";
import { getUserIdFromToken } from "@helpers";
import type { Password } from "@types";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  const id = getUserIdFromToken();
  const { data } = useQuery({
    enabled: !!id, // faqat ID bor bo‘lsa fetch qilinsin
    queryKey: ["admin", id],
    queryFn: () => adminService.getAdminById(id!),
  });

  //Mutations
  const usePasswordUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Password }) =>
        adminService.updatePassword(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["password"] });
      },
    });
  };
  return {
    data,
    usePasswordUpdate,
  };
};
