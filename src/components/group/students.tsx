// import type { GroupStudentType } from "@types";

// const GroupStudents = ({ studentData }: GroupStudentType) => {
//   console.log("students", studentData);
//   return (
//     <div>
//       <h1>Students</h1>
//     </div>
//   );
// };

// export default GroupStudents;

import { useRef, useEffect, useState } from "react";
import type { GroupStudentType, Lessons, SingleGroupStudentType } from "@types";
import { Tooltip, Dropdown, Button, Badge } from "antd";
import { DownOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-gray-400";
    case "came":
      return "bg-green-500";
    case "did_not_came":
      return "bg-red-500";
    case "late":
      return "bg-yellow-400";
    default:
      return "bg-gray-300";
  }
};

const GroupStudents = ({ studentData }: GroupStudentType) => {
  const [activeStudentIndex, setActiveStudentIndex] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeStudentIndex === null || !containerRef.current) return;

    const lessons = studentData[activeStudentIndex]?.student.attendance || [];
    const todayIndex = lessons.findIndex(
      (lesson) =>
        dayjs(lesson.date).format("YYYY-MM-DD") === dayjs().format("YYYY-MM-DD")
    );

    if (todayIndex !== -1) {
      const container = containerRef.current;
      const cardWidth = 60;
      const scrollLeft =
        todayIndex * cardWidth - container.offsetWidth / 2 + cardWidth / 2;

      setTimeout(() => {
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: "smooth",
        });
      }, 100);
    }
  }, [activeStudentIndex, studentData]);

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-xl font-bold mb-4">Group Students</h1>

      {studentData?.map((item: SingleGroupStudentType, index: number) => (
        <div
          key={item.student.id}
          className="flex justify-between items-center bg-white shadow-md border border-gray-200 rounded-xl px-4 py-3"
        >
          <Tooltip title={item.student.phone}>
            <div className="text-base font-medium cursor-pointer hover:underline">
              {item.student.last_name} {item.student.first_name}
            </div>
          </Tooltip>

          <div className="flex items-center gap-4">
            <Badge
              color={item.status ? "green" : "gray"}
              text={item.status ? "Active" : "Inactive"}
              className="text-sm"
            />

            <Dropdown
              trigger={["click"]}
              popupRender={() => (
                <div className="p-3 w-[100%] max-w-[600px]">
                  <div
                    className="flex gap-2 overflow-x-auto py-2 scrollbar-hide"
                    ref={containerRef}
                  >
                    {item?.student?.attendance?.map((lesson: Lessons) => {
                      const isToday =
                        dayjs(lesson.date).format("YYYY-MM-DD") ===
                        dayjs().format("YYYY-MM-DD");

                      return (
                        <Tooltip
                          key={lesson.id}
                          title={lesson.description || "No description"}
                        >
                          <div
                            className={`min-w-[50px] h-[60px] rounded-lg cursor-pointer 
                                flex flex-col items-center justify-center text-white text-xs font-medium
                                transition-all hover:scale-105 ${getStatusColor(
                                  lesson.status
                                )} 
                                ${isToday ? "ring-2 ring-black" : ""}
                              `}
                          >
                            <div className="text-sm font-bold">
                              {dayjs(lesson.date).format("DD")}
                            </div>
                            <div className="text-[10px] mt-1 opacity-90">
                              {dayjs(lesson.date).format("MM")}
                            </div>
                          </div>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              )}
            >
              <Button
                icon={<DownOutlined />}
                onClick={() => setActiveStudentIndex(index)}
                size="small"
                className="shadow-md"
              >
                Attendance
              </Button>
            </Dropdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GroupStudents;
