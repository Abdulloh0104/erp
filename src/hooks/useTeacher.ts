import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teacherService } from "@service";
import type { Teacher, ParamsType } from "@types";

export const useTeacher = (params?: ParamsType) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    enabled: !!params,
    queryKey: ["teachers", params],
    queryFn: async () => teacherService.getTeachers(params!),
  });

  const teacherGroupsQuery = useQuery({
    queryKey: ["teacher-my-groups"],
    queryFn: async () => teacherService.getTeacherMyGroups(),
  });
  const myGroups = teacherGroupsQuery?.data?.data;

  //Mutations
  const useTeacherCreate = () => {
    return useMutation({
      mutationFn: async (data: Teacher) => teacherService.createTeacher(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });
  };

  const useTeacherUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Teacher }) =>
        teacherService.updateTeacher(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });
  };

  const useTeacherDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => teacherService.deleteTeacher(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
      },
    });
  };
  return {
    data,
    myGroups,
    useTeacherCreate,
    useTeacherUpdate,
    useTeacherDelete,
  };
};
