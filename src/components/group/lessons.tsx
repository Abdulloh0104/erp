import type {GroupLessonsType} from '@types'
import LessonsLists from '../lessons-lists/lessons-lists';
// import LessonsLists from '../lessons-lists/lessons-lists'
const GroupLessons = ({lessons}:GroupLessonsType) => {
 return <div>
  <h1>Lessons</h1>
  <LessonsLists lessons={lessons}/>
 </div>
}

export default GroupLessons