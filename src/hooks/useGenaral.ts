  import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { useNavigate } from "react-router-dom";
  import type { Lessons, PaginationConfig } from "@types";
  import { generalService } from "../service/general.service";

  export const useGeneral = () => {
  const queryClient = useQueryClient();
    // HANDLE PAGINATION
    const navigate = useNavigate();
    const handlePagination = ({ pagination, setParams }: PaginationConfig) => {
      const { current, pageSize } = pagination;
      setParams({
        page: current!,
        limit: pageSize!,
      });
      const searchParams = new URLSearchParams();
      searchParams.set("page", current!.toString());
      searchParams.set("limit", pageSize!.toString());
      navigate({ search: `?${searchParams.toString()}` });
    };

    //UPDATE A GGROUP-LESSON
    const useGroupLessonUpdate = () => {
      return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: Lessons }) =>
          generalService.updateGroupLesson(id, data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["group-lessons"] });
        },
      });
    };

    // RETURN THE FUNCTION
    return {
      handlePagination,
      useGroupLessonUpdate,
    };
  };
