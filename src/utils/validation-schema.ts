import * as yup from "yup";

// GROUP FORM
export const groupFormSchema = yup.object().shape({
  name: yup.string().min(5).required("Name is required"),
  status: yup.string().required("Status is required"),
  course_id: yup.number().required("Course is required"),
  start_date: yup.date().required("Start date is required"),
  end_date: yup.date().required("End date is required"),
});

// OURSE FORM
export const courseFormSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  duration: yup.string().required("Duration is required"),
  lessons_in_a_week: yup.number().required("Lesson count is required for a week"),
  lesson_duration: yup.string().required("Lesson duration is required by minutes"),
  price: yup.number().required("Price is required"),
  // is_active: yup.boolean().required("Is group active or no"),
  // created_at: yup.date().required("Start date is required"),
  // updated_at: yup.date().required("End date is required"),
  description: yup.string(),
});
