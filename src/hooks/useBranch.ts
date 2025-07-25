import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { branchService } from "@service";
import type { Branch, ParamsType } from "@types";

export const useBranch = (params:ParamsType) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["branches",params],
    queryFn: async () => branchService.getBranches(params),
  });
  
  //Mutations
  const useBranchCreate = () => {
    return useMutation({
      mutationFn: async (data: Branch) => branchService.createBranch(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };

  const useBranchUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Branch }) => branchService.updateBranch(id,data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };

  const useBranchDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => branchService.deleteBranch(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["branches"] });
      },
    });
  };
  return {
    data,
    useBranchCreate,
    useBranchUpdate,
    useBranchDelete,
  };
};
