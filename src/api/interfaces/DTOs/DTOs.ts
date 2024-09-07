// DTOs for Prisma Models

export enum Role {
  STUDENT = "STUDENT",
  INSTRUCTOR = "INSTRUCTOR",
  ADMIN = "ADMIN",
}

export enum TestLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export class UserDTO {
  email!: string;
  passwordHash!: string;
  firstName!: string;
  lastName!: string;
  role!: Role;
  profilePictureUrl?: string;
}

export class TestSeriesDTO {
  id!: string;
  title!: string;
  description!: string;
  price!: number;
  language!: string;
  level!: TestLevel;
  createdAt!: Date;
  updatedAt!: Date;
  instructor!: UserDTO;
  instructorId!: string;
  categories!: CategoryDTO[];
  tests!: TestDTO[];
  enrollments!: EnrollmentDTO[];
  reviews!: ReviewDTO[];
}

export class CategoryDTO {
  id!: string;
  name!: string;
  testSeries!: TestSeriesDTO[];
}

export class TestDTO {
  id!: string;
  title!: string;
  duration!: number;
  testSeries!: TestSeriesDTO;
  testSeriesId!: string;
  questions!: QuestionDTO[];
  createdAt!: Date;
  updatedAt!: Date;
}

export class QuestionDTO {
  id!: string;
  text!: string;
  options!: Record<string, string>; // Assuming the JSON structure is a map of options
  correctOption!: string;
  test!: TestDTO;
  testId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class EnrollmentDTO {
  id!: string;
  user!: UserDTO;
  userId!: string;
  testSeries!: TestSeriesDTO;
  testSeriesId!: string;
  enrolledAt!: Date;
}

export class ReviewDTO {
  id!: string;
  rating!: number;
  comment?: string;
  testSeriesId!: string;
  testSeries!: TestSeriesDTO;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
  user!: UserDTO;
}
