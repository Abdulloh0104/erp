// import { useRef, useState } from "react";
// import type { GroupLessonsType, Lessons } from "@types";
// import { Button } from "antd";
// import { EditOutlined } from "@ant-design/icons";
// import dayjs from "dayjs";
// import LessonsListsModal from "./modal";
// const LessonsLists = ({ lessons }: GroupLessonsType) => {
//    const [open, setOpen] = useState(false);
//     const [update, setUpdate] = useState<Lessons | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [scrollPosition, setScrollPosition] = useState(0);
//   const handleScroll = () => {
//     if (containerRef.current) {
//       setScrollPosition(containerRef.current.scrollLeft);
//     }
//   };
//   const goNext = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: 50, behavior: "smooth" });
//     }
//   };
//   const goPrev = () => {
//     if (containerRef.current) {
//       containerRef.current.scrollBy({ left: -50, behavior: "smooth" });
//     }
//   };
//   const isStartDisabled = () => {
//     if (!containerRef.current) return true;
//     return scrollPosition <= 5;
//   };
//   const isEndDisabled = () => {
//     if (!containerRef.current) return true;
//     const container = containerRef.current;
//     return scrollPosition + container.clientWidth >= container.scrollWidth - 3;
//   };
//   //UPDATE A LESSON
//   const editItem = (record: Lessons) => {
//     setUpdate(record);
//     setOpen(true);
//   };

//   const toggle = () => {
//     setOpen(!open);
//     if (update) {
//       setUpdate(null);
//     }
//   };

//   return (
//     <>
//       {open && (
//         <LessonsListsModal open={open} toggle={toggle} update={update} />
//       )}
//       <div className="flex gap-2 items-center">
//         <Button type="primary" onClick={goPrev} disabled={isStartDisabled()}>
//           prev
//         </Button>
//         <div
//           className="overflow-scroll flex gap-1 [&::-webkit-scrollbar]:hidden"
//           ref={containerRef}
//           onScroll={handleScroll}
//         >
//           {lessons.map((lesson: Lessons, index: number) => {
//             return (
//               <div
//                 key={lesson.id}
//                 className="bg-[#ccc] rounded-sm cursor-pointer"
//               >
//                 <span className="text-[13px]">
//                   {dayjs(lesson.date).format("DD-MM")}
//                 </span>
//                 <Button
//                   type="primary"
//                   onClick={() => editItem(lesson)}
//                   size="small"
//                 >
//                   <EditOutlined />
//                 </Button>
//               </div>
//             );
//           })}
//         </div>
//         <Button type="primary" onClick={goNext} disabled={isEndDisabled()}>
//           next
//         </Button>
//       </div>
//     </>
//   );
// };

// export default LessonsLists;

import { useRef, useState, useEffect } from "react";
import type { GroupLessonsType, Lessons } from "@types";
import { Button } from "antd";
import dayjs from "dayjs";
import LessonsModal from "./modal";

const LessonsLists = ({ lessons }: GroupLessonsType) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [selectedLesson, setSelectedLesson] = useState<Lessons | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll to in_progress lesson on mount and when lessons change
  useEffect(() => {
    if (!containerRef.current || lessons.length === 0) return;

    const inProgressIndex = lessons.findIndex(
      (lesson) => lesson.status === "in_progress"
    );

    if (inProgressIndex !== -1) {
      setTimeout(() => {
        if (containerRef.current) {
          const container = containerRef.current;
          const cardWidth = 60; // Approximate card width including gap
          const containerWidth = container.offsetWidth;
          const scrollLeft =
            inProgressIndex * cardWidth - containerWidth / 2 + cardWidth / 2;
          container.scrollTo({
            left: Math.max(0, scrollLeft),
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [lessons]);

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft);
    }
  };

  const goNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const goPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const isStartDisabled = () => {
    if (!containerRef.current) return true;
    return scrollPosition <= 5;
  };

  const isEndDisabled = () => {
    if (!containerRef.current) return true;
    const container = containerRef.current;
    return scrollPosition + container.clientWidth >= container.scrollWidth - 5;
  };

  // Get status color classes
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "new":
        return "bg-gray-400 hover:bg-gray-500";
      case "in_progress":
        return "bg-yellow-400 hover:bg-yellow-500 ring-2 ring-yellow-300 ring-offset-1";
      case "completed":
        return "bg-green-400 hover:bg-green-500";
      case "cancelled":
        return "bg-blue-400 hover:bg-blue-500";
      default:
        return "bg-gray-400 hover:bg-gray-500";
    }
  };

  // Open lesson modal
  const openLessonModal = (lesson: Lessons) => {
    setSelectedLesson(lesson);
    setModalMode("view");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedLesson(null);
  };

  const switchToEditMode = () => {
    setModalMode("edit");
  };

  return (
    <>
      <LessonsModal
        open={modalOpen}
        toggle={closeModal}
        lesson={selectedLesson}
        mode={modalMode}
        onSwitchToEdit={switchToEditMode}
      />

      <div className="flex gap-3 items-center p-4 bg-gray-50 rounded-lg">
        <Button
          type="primary"
          onClick={goPrev}
          disabled={isStartDisabled()}
          className="flex-shrink-0 shadow-md hover:shadow-lg transition-shadow"
          size="small"
        >
          ←
        </Button>

        <div
          className="flex-1 overflow-x-auto flex gap-2 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {lessons.map((lesson: Lessons) => {
            const statusStyles = getStatusStyles(lesson.status);
            const isToday =
              dayjs(lesson.date).format("YYYY-MM-DD") ===
              dayjs().format("YYYY-MM-DD");
            const isPast = dayjs(lesson.date).isBefore(dayjs(), "day");

            return (
              <div
                key={lesson.id}
                onClick={() => openLessonModal(lesson)}
                className={`
                  min-w-[50px] max-w-[50px] h-[60px] rounded-lg cursor-pointer 
                  flex flex-col items-center justify-center text-white text-xs font-medium
                  transition-all duration-200 hover:scale-110 hover:shadow-lg transform-gpu
                  ${statusStyles}
                  ${isPast && lesson.status !== "completed" ? "opacity-80" : ""}
                `}
              >
                {/* Day */}
                <div className="text-sm font-bold leading-none">
                  {dayjs(lesson.date).format("DD")}
                </div>

                {/* Month */}
                <div className="text-[10px] leading-none mt-1 opacity-90">
                  {dayjs(lesson.date).format("MMM")}
                </div>

                {/* Today indicator */}
                {isToday && (
                  <div className="w-1 h-1 bg-white rounded-full mt-1 animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>

        <Button
          type="primary"
          onClick={goNext}
          disabled={isEndDisabled()}
          className="flex-shrink-0 shadow-md hover:shadow-lg transition-shadow"
          size="small"
        >
          →
        </Button>
      </div>
    </>
  );
};

export default LessonsLists;