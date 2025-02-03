import TaskForm from "@/forms/task-form";
import { TTask } from "@/types/task.type";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type TaskProps = {
  id: string;
  title: string;
  description: string;
  handleDelete: (taskId: TTask["id"]) => void;
  handleEdit: (
    taskId: string,
    data: { title: string; description: string }
  ) => void;
};

export default function Task({
  id,
  title,
  description,
  handleDelete,
  handleEdit,
}: TaskProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    listeners,
    attributes,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div className="relative">
      {!isDragging && (
        <div className="absolute right-5 top-5 z-10 flex align-middle gap-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <Pencil
                className="cursor-pointer hover:text-blue-500 hover:scale-125 transition-all duration-500"
                size={20}
              />
            </SheetTrigger>
            <SheetContent side={"bottom"}>
              <SheetHeader className="py-10 px-4">
                <SheetTitle>
                  <TaskForm
                    title={title}
                    description={description}
                    onSubmit={({ title, description }) => {
                      handleEdit(id, { title, description });
                      setIsSheetOpen(false);
                    }}
                  />
                </SheetTitle>
              </SheetHeader>
            </SheetContent>
          </Sheet>

          <Trash
            className="cursor-pointer  hover:text-red-500 hover:scale-125 transition-all duration-700"
            onClick={() => handleDelete(id)}
            size={20}
          />
        </div>
      )}
      <Card
        className={`cursor-grab active:cursor-grabbing ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
