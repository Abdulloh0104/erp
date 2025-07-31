import type {GroupLessonsType} from '@types'
import LessonsLists from '../lessons-lists/lessons-lists';
// import LessonsLists from '../lessons-lists/lessons-lists'
const GroupLessons = ({lessons}:GroupLessonsType) => {
 console.log("lessons", lessons);
 return <div>
  <h1>Lessons</h1>
  <LessonsLists lessons={lessons}/>
 </div>
}

export default GroupLessons