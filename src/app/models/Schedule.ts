import { Class } from "./Class";
import { Classroom } from "./Classroom";

export interface Schedule {
    id?: number;
    date: string;
    time: string;
    classroom: Classroom;
    classn: Class;
  }