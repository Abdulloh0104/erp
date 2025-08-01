import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { groupService } from "@service";
import type { Group, ParamsType } from "@types";
// paramsni ko'rib chiqishim kerak
export const useGroup = (params?:ParamsType,id?:number) => {
  const queryClient = useQueryClient();
  
  const SingleGroupQuery = useQuery({
    enabled: !!id, // faqat ID bor bo‘lsa fetch qilinsin
    queryKey: ["admin", id],
    queryFn: () => groupService.getGroupById(id!),
  });
  const singleGroup = SingleGroupQuery.data;
  

  const { data } = useQuery({
    enabled:!id,
    queryKey: ["groups",params],
    queryFn: async () => groupService.getGroups(params!),
  });
  
  const groupStudentsQuery = useQuery({
    enabled:!!id,
    queryKey: ["group-students"],
    queryFn: async () => groupService.getGroupStudents(id!),
  });
  const students = groupStudentsQuery.data
  
  
  const groupLessonsQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-lessons"],
    queryFn: async () => groupService.getGroupLessons(id!),
  });
  const lessons = groupLessonsQuery.data;

  
  const groupsTeachersQuery = useQuery({
    enabled: !!id,
    queryKey: ["group-teachers"],
    queryFn: async () => groupService.getGroupTeachers(id!),
  });
  const teachers = groupsTeachersQuery.data;

  //Mutations
  const useGroupCreate = () => {
    return useMutation({
      mutationFn: async (data: Group) => groupService.createGroup(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupUpdate = () => {
    return useMutation({
      mutationFn: async ({ id, data }: { id: number; data: Group }) => groupService.updateGroup(id,data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };

  const useGroupDelete = () => {
    return useMutation({
      mutationFn: async (id: number) => groupService.deleteGroup(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["groups"] });
      },
    });
  };
  return {
    data,
    singleGroup,
    students,
    lessons,
    teachers,
    SingleGroupQuery,
    useGroupCreate,
    useGroupUpdate,
    useGroupDelete,
  };
};
