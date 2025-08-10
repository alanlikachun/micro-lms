import type { User } from "./user";

export interface Society {
  _id: string;
  name: string;
  managedBy: Pick<User, "_id" | "name">[];
}
