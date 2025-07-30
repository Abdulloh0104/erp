import * as yup from "yup";

// GROUP FORM
export const groupFormSchema = yup.object().shape({
  name: yup.string().min(2).required("Name is required"),
  status: yup.string().required("Status is required"),
  courseId: yup.number().required("Course is required"),
  roomId: yup.number().required("Room is required"),
  start_date: yup.string().required("Start date is required"),
  start_time: yup.string().required("Start time is required"),
});

// COURSE FORM
export const courseFormSchema = yup.object().shape({
  title: yup.string().min(2).required("Title is required"),
  duration: yup.number().required("Duration is required"),
  lessons_in_a_month: yup
    .number()
    .required("Lesson count is required for a month"),
  lessons_in_a_week: yup
    .number()
    .required("Lesson count is required for a week"),
  lesson_duration: yup
    .number()
    .required("Lesson duration is required by minutes"),
  price: yup.number().required("Price is required"),
  description: yup.string(),
});

// BRANCH FORM
export const branchFormSchema = yup.object().shape({
  name: yup.string().min(2).required("Name is required"),
  address: yup.string().required("Address is required"),
  call_number: yup.string().required("Call number is required"),
});

// TEACHER FORM
export const teacherFormSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup.string().required("Email is required"),
  password: yup.string(),
  phone: yup.string().required("Phone number is required"),
  role: yup.string().required("Role is required"),
  branchId: yup.array().of(yup.number()).required("Choose branch"), //------
  avatar_url: yup.string(),
});

// STUDENT FORM
export const studentFormSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup
    .string()
    .email("Email format is invalid (must include @)")
    .required("Email is required"),
  password_hash: yup
    .string()
    // .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, etc.)"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password_hash")], "Passwords must match"),
  // .required("Please confirm your password"),
  gender: yup.string().required("Gender is required"),
  date_of_birth: yup.string().required("Birth date is required"),
});

// ROOM FORM
export const roomFormSchema = yup.object().shape({
  name: yup.string().min(5).required("Name is required"),
  capacity: yup.number().required("Capacity is required"),
  branchId: yup.number().required("Branch is required"),
});

export const passwordFormSchema = yup.object().shape({
  old_password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character (@, $, !, etc.)"
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/,"Password must contain at least one special character (@, $, !, etc.)"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
