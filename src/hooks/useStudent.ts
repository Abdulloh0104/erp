import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { studentService } from "@service";
import type { Student, ParamsType } from "@types";

export const useStudent = (params:ParamsType) => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["students",params],
    queryFn: async () => studentService.getStudents(params),
  });
  //Mutations
  const useStudentCreate = () => {
    return useMutation({
      mutationFn: async (data: Student) => studentService.createStudent(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });
  };

  const useStudentUpdate = () => {
    return useMutation({
      mutationFn: async (data: Student) => studentService.updateStudent(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });
  };

  const useStudentDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => studentService.deleteStudent(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["students"] });
      },
    });
  };
  return {
    data,
    useStudentCreate,
    useStudentUpdate,
    useStudentDelete,
  };
};
