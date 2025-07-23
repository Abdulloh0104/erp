import type { GroupLessonsType, Lessons} from "@types";
import { Button } from "antd";
import { useRef, useState } from "react";

const GroupLessons = ({lessons}: GroupLessonsType) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollPosition,setScrollPosition]=useState(0)
  const handleScroll=()=>{
    if(containerRef.current){
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }
  const goNext=()=>{
    if (containerRef.current) {
      containerRef.current.scrollBy({left:50,behavior:"smooth"});
    }
  }
  
  const goPrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -50, behavior: "smooth" });
    }
  };

  const isStartDisabled=()=>{
    if (!containerRef.current) return true 
    return scrollPosition<=5
  } 
  
  const isEndDisabled = () => {
    if (!containerRef.current) return true;
    const container = containerRef.current
    return scrollPosition + container.clientWidth >= container.scrollWidth - 3
  }; 
   return (
    <div className="flex gap-2 items-center">
      <Button type="primary" onClick={goPrev} disabled={isStartDisabled()}>prev</Button>
      <div className="overflow-scroll flex gap-1 [&::-webkit-scrollbar]:hidden" ref={containerRef} onScroll={handleScroll}>
        {
          lessons.map((lesson:Lessons,index:number)=>{
            return <div key={lesson.id} className="p-3 bg-[#ccc] rounded-lg"><span>{index+1}</span></div>
          })
        }
      </div>
      <Button type="primary" onClick={goNext} disabled={isEndDisabled()}>next</Button>

    </div>
  );
};

export default GroupLessons;
