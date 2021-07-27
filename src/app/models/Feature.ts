import { Classroom } from "./Classroom";

export interface Feature {
    id?: number;
    classroom: Classroom;
    feature: string;
  }