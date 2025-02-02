import { Task } from "./task.type";

// export type ColumnID = "todo" | "in-progress" | "done";

export type Column = {
    // id: ColumnID;
    id: string;
    title: string;
    items?: Task[];
}