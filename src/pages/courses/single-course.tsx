import { useParams } from "react-router-dom"
import { useCourse} from "@hooks"


const SingleGroup=()=>{
    const {id}=useParams<{id:string}>()
    const {data:group}=useCourse({page:1,limit:10})
    console.log("group",group);
    return (
      <div>
        <h1>Single course</h1>
        <h1>Id:{id}</h1>
        {/* <h1>Lesson in a week:{data?.data?.course?.lessons_in_a_week}</h1> */}
      </div>
    );
}

export default SingleGroup