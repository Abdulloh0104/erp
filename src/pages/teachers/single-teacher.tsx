import { useParams } from "react-router-dom"
import { useTeacher } from "@hooks"


const SingleTeacher=()=>{
    const {id}=useParams<{id:string}>()
    const {students}=useTeacher({page:1,limit:10},Number(id))
    console.log("students",students);
    return(
        <div>
            <h1>Single group</h1>
            <h1>Id:{id}</h1>
        </div>
    )
}

export default SingleTeacher