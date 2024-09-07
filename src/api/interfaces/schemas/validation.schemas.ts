import * as Yup from "yup";

// User Schema
export const signUpSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password hash is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  role: Yup.mixed<"STUDENT" | "INSTRUCTOR" | "ADMIN">()
    .oneOf(["STUDENT", "INSTRUCTOR", "ADMIN"], "Invalid role")
    .required("Role is required"),
  profilePictureUrl: Yup.string()
    .url("Profile picture URL must be a valid URL")
    .nullable(),
  bio: Yup.string().nullable(),
});

// user sign in schema
export const signInSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password hash is required"),
});

// TestSeries Schema
export const testSeriesSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .positive("Price must be a positive number")
    .required("Price is required"),
  language: Yup.string().required("Language is required"),
  instructorId: Yup.string()
    .uuid("Invalid UUID format")
    .required("Instructor ID is required"),
});

// Category Schema
export const categorySchema = Yup.object({
  name: Yup.string().required("Name is required"),
});

// Test Schema
export const testSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  duration: Yup.number()
    .positive("Duration must be a positive number")
    .required("Duration is required"),
  testSeriesId: Yup.string()
    .uuid("Invalid UUID format")
    .required("Test Series ID is required"),
});

// Question Schema
export const questionSchema = Yup.object({
  text: Yup.string().required("Text is required"),
  options: Yup.object().required("Options are required"), // Using object type for options JSON
  correctOption: Yup.string()
    .oneOf(["A", "B", "C", "D"], "Invalid option")
    .required("Correct option is required"),
  testId: Yup.string()
    .uuid("Invalid UUID format")
    .required("Test ID is required"),
});

// Enrollment Schema
export const enrollmentSchema = Yup.object({
  userId: Yup.string()
    .uuid("Invalid UUID format")
    .required("User ID is required"),
  testSeriesId: Yup.string()
    .uuid("Invalid UUID format")
    .required("Test Series ID is required"),
  enrolledAt: Yup.date().required("Enrollment date is required"),
});

// Review Schema
export const reviewSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
  comment: Yup.string().nullable(),
  testSeriesId: Yup.string()
    .uuid("Invalid UUID format")
    .required("Test Series ID is required"),
  userId: Yup.string()
    .uuid("Invalid UUID format")
    .required("User ID is required"),
});
