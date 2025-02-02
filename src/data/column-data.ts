import { Column } from "@/types/column.type";

export const columnData:Column[] = [
    {
        id: "todo",
        title: "To Do",
        items: [
        {
            id: "1",
            title: "Task 1",
            description: "Description 1",
            columnId: "todo",
        },
        {
            id: "2",
            title: "Task 2",
            description: "Description 2",
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
            description: "Description 3",
            columnId: "in-progress",
        },
        ],
    },
    {
        id: "inw-progress",
        title: "Inw Progress",
        items: [
        {
            id: "4",
            title: "Task 4",
            description: "Description 3",
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
            title: "Task 4",
            description: "Description 4",
            columnId: "done",
        },
        ],
    },
]