import { User } from "./User";

export interface Class {
    id?: number;
    name: string;
    teacher: User;
    year: number;
    section: string;
  }