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
  password!: string;
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
  instructor!: UserDTO;
  instructorId!: string;
  categories!: CategoryDTO[];
  tests!: TestDTO[];
  enrollments!: EnrollmentDTO[];
  reviews!: ReviewDTO[];
}

export class TestDTO {
  id!: string;
  title!: string;
  duration!: number;
  durationType!: string;
  questions!: QuestionDTO[];
}

export class QuestionDTO {
  text!: string;
  options!: Record<string, string>; // Assuming the JSON structure is a map of options
  correctOption!: string;
}
export class CategoryDTO {
  id!: string;
  name!: string;
  testSeries!: TestSeriesDTO[];
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
