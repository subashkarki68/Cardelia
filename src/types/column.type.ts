import { TTask } from "./task.type";

// export type ColumnID = "todo" | "in-progress" | "done";

export type TColumn = {
    // id: ColumnID;
    id: string;
    title: string;
    items: TTask[];
}