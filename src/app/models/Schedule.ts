import { Class } from "./Class";
import { Classroom } from "./Classroom";

export interface Schedule {
    id?: number;
    localDate: string;
    localTime: string;
    classroom: Classroom;
    classn: Class;
  }