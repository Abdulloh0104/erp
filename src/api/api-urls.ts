export class ApiUrls {
  // AUTH
  public static AUTH: string = "/log";

  // GROUP
  public static GROUPS: string = "/group";

  // Courses
  public static COURSES: string = "/courses";

  // Cranches
  public static BRANCHES: string = "/branches";

  // Teachers
  public static TEACHERS: string = "/teacher";

  // Students
  public static STUDENTS: string = "/students";

  // ROOMS
  public static ROOMS: string = "/rooms";

  //LESSON
  public static LESSONS: string = "/lessons";
  public static GROUP_LESSONS: string = this.LESSONS + "/group";

  //GROUP TEACHERS
  public static GROUP_TEACHERS: string = "/group-teachers";
  public static GROUP_TEACHERS_BY_GROUP_ID: string =this.GROUP_TEACHERS + "/by-group";

  //GROUP STUDENTS
  public static GROUP_STUDENTS: string = "/group-students";
  public static GROUP_STUDENTS_BY_GROUP_ID: string =this.GROUP_STUDENTS + "/by-group";

}
