import TaskForm from "@/forms/task-form";
import { cn } from "@/lib/utils";
import { TTask } from "@/types/task.type";
import { useDroppable } from "@dnd-kit/core";
import { Plus } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ColumnProps = {
  id: string;
  title: string;
  className?: string;
  handleAddTask: (task: TTask) => void;
};

export default function Column({
  children,
  id,
  title,
  className,
  handleAddTask,
}: PropsWithChildren<ColumnProps>) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <Card className={cn("", className)} ref={setNodeRef}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger>
                  <Button className="p-2">
                    <Plus size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side={"bottom"}>
                  <SheetHeader className="py-10 px-4">
                    <SheetTitle>
                      <TaskForm
                        onSubmit={({ title, description }) => {
                          handleAddTask({
                            id: uuidv4(),
                            title,
                            description,
                            columnId: id,
                          });
                          setIsSheetOpen(false);
                        }}
                        title=""
                        description=""
                      />
                    </SheetTitle>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a Task</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
}
