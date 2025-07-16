import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { branchService } from "@service";
import type { Branch, ParamsType } from "@types";

export const useBranch = (params:ParamsType,id?:number) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["branches",params],
    queryFn: async () => branchService.getBranches(params),
  });
  
  const branchTeachersQuery = useQuery({
    enabled:!!id,
    queryKey: ["branch-students", params],
    queryFn: async () => branchService.getBranchStudents(params,id!),
  });
  const teachers = branchTeachersQuery.data
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
      mutationFn: async (data: Branch) => branchService.updateBranch(data),
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
    teachers,
    useBranchCreate,
    useBranchUpdate,
    useBranchDelete,
  };
};
