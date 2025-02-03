import { TColumn } from "@/types/column.type";

export const columnData:TColumn[] = [
    {
        id: "todo",
        title: "To Do",
        items: [
        {
            id: "1",
            title: "Task 1",
            description: "Make a Cup of Tea",
            columnId: "todo",
        },
        {
            id: "2",
            title: "Task 2",
            description: "Go to the Gym.",
            columnId: "todo",
        },
        ],
    },
    {
        id: "in-progress",
        title: "In Progress",
        items: [
        {
            id: "3",
            title: "Task 3",
            description: "Take Out the Trash",
            columnId: "in-progress",
        },
        ],
    },
    {
        id: "done",
        title: "Done",
        items: [
        {
            id: "5",
            title: "Introduction",
            description: "Introduce yourself to the team",
            columnId: "done",
        },
        ],
    },
]