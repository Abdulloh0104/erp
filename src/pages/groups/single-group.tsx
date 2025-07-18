import { useParams } from "react-router-dom"
import { useGroup } from "../../hooks"


const SingleGroup=()=>{
    const {id}=useParams<{id:string}>()
    const {data:student}=useGroup({page:1,limit:10},Number(id))

    return(
        <div>
            <h1>Single group</h1>
            <h1>Id:{id}</h1>
        </div>
    )
}

export default SingleGroup