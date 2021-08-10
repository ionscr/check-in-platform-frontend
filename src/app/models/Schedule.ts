import { Class } from "./Class";
import { Classroom } from "./Classroom";

export interface Schedule {
    id?: number;
    date: string;
    localTime: string;
    classroom: Classroom;
    classn: Class;
  }