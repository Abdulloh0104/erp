// import { useState } from "react";
// import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import { courseService } from "../../service/course.service";
// import { useCourse } from "@hooks";
// import type { Course } from "../../types";
// interface FormType {
//   title: string;
//   description: string;
//   price: number;
//   duration: string;
//   lesson_in_a_week: number;
//   lesson_duration: string;
//   is_active: boolean;
//   created_at: string;
//   updated_at: string;
// }

// // interface CourseIDi {
// //   id: number;
// //   name: string;
// //   course_id: number;
// //   price: string;
// //   start_date: string;
// //   end_date: string;
// // }

// interface ProductModalProps {
//   isOpen: boolean;
//   toggle: () => void;
//   courses: Course[];
//   setCourses: (products: Course[]) => void;
//   update: Course | null;
// }

// const CourseModal: React.FC<ProductModalProps> = ({
//   isOpen,
//   toggle,
//   update,
// }) => {
//   const { useCourseUpdate } = useCourse({page:1,limit:11});
//   const { mutate: UpdateFn } = useCourseUpdate();

//   const [form, setForm] = useState<FormType>({
//     title: "",
//     description: "",
//     price: 1,
//     duration: "",
//     lesson_in_a_week: 1,
//     lesson_duration: "",
//     is_active: true,
//     created_at: "",
//     updated_at: "",
//   });
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: name === "course_id" ? Number(value) : value });
//   };
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (update === null) {
//       console.log({ ...form });
//       courseService.createCourse({ ...form });
//     } else {
//       const updated = {
//         ...form,
//         id: update.id,
//         title: form.title ? form.title : update.title,
//         description: form.description ? form.description : update.description,
//         price: form.price ? form.price : update.price,
//         duration: form.duration ? form.duration : update.duration,
//         lesson_in_a_week: form.lesson_in_a_week
//           ? form.lesson_in_a_week
//           : update.lesson_in_a_week,
//         lesson_duration: form.lesson_duration
//           ? form.lesson_duration
//           : update.lesson_duration,
//         is_active: form.is_active ? form.is_active : update.is_active,
//         created_at: form.created_at ? form.created_at : update.created_at,
//         updated_at: form.updated_at ? form.updated_at : update.updated_at,
//       };
//       UpdateFn(updated);
//     }
//     toggle();
//   };
//   return (
//     <Modal isOpen={isOpen} toggle={toggle}>
//       <ModalHeader>
//         {update === null ? <span>Add Course</span> : <span>Update Course</span>}
//       </ModalHeader>
//       <ModalBody>
//         <form id="course" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             defaultValue={update?.title}
//             required
//             name="title"
//             onChange={handleChange}
//             placeholder="Title..."
//             className="form-control my-2"
//           />
//           <input
//             type="text"
//             defaultValue={update?.description}
//             required
//             name="description"
//             onChange={handleChange}
//             placeholder="Description..."
//             className="form-control my-2"
//           />
//           <input
//             type="number"
//             defaultValue={update?.price}
//             required
//             name="price"
//             onChange={handleChange}
//             placeholder="Price..."
//             className="form-control my-2"
//           />
//           <input
//             type="duration"
//             defaultValue={update?.duration}
//             required
//             name="duration"
//             onChange={handleChange}
//             placeholder="Duration..."
//             className="form-control my-2"
//           />
//           <input
//             type="number"
//             defaultValue={update?.lesson_in_a_week}
//             required
//             name="lesson_in_a_week"
//             onChange={handleChange}
//             placeholder="Lesson in a week..."
//             className="form-control my-2"
//           />
//           <input
//             type="text"
//             defaultValue={update?.lesson_duration}
//             required
//             name="lesson_duration"
//             onChange={handleChange}
//             placeholder="Lesson duration..."
//             className="form-control my-2"
//           />
//           <input
//             type="text"
//             defaultValue={update?.is_active!}
//             required
//             name="is_active"
//             onChange={handleChange}
//             placeholder="is_active..."
//             className="form-control my-2"
//           />
//           <input
//             type="string"
//             defaultValue={update?.created_at}
//             required
//             name="created_at"
//             onChange={handleChange}
//             placeholder="Created at..."
//             className="form-control my-2"
//           />
//           <input
//             type="string"
//             defaultValue={update?.updated_at}
//             required
//             name="updated_at"
//             onChange={handleChange}
//             placeholder="Updated at..."
//             className="form-control my-2"
//           />
//         </form>
//       </ModalBody>
//       <ModalFooter>
//         <button className="btn btn-danger" onClick={toggle}>
//           cancel
//         </button>
//         <button className="btn btn-info" form="course">
//           save
//         </button>
//       </ModalFooter>
//     </Modal>
//   );
// };

// export default CourseModal;
