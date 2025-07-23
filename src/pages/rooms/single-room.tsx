import { useParams } from "react-router-dom"
import { useCourse} from "@hooks"


const SingleRoom=()=>{
    const {id}=useParams<{id:string}>()
    const {data:room}=useCourse({page:1,limit:10})
    console.log("room",room);
    return (
      <div>
        <h1>Single room</h1>
        <h1>Id:{id}</h1>
        {/* <h1>Lesson in a week:{data?.data?.course?.lessons_in_a_week}</h1> */}
      </div>
    );
}

export default SingleRoom