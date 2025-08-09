export enum Role {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "TEACHER" | "STUDENT";
}
