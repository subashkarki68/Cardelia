import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { PropsWithChildren } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type ColumnProps = {
  id: string;
  title: string;
  className?: string;
};

export default function Column({
  children,
  id,
  title,
  className,
}: PropsWithChildren<ColumnProps>) {
  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <Card className={cn("", className)} ref={setNodeRef}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </Card>
  );
}
