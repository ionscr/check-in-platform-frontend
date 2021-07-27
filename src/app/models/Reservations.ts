import { Schedule } from "./Schedule";
import { User } from "./User";

export interface Reservations {
    id?: number;
    schedule: Schedule;
    student: User;
  }