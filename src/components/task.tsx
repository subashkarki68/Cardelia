import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

type TaskProps = {
  id: string;
  title: string;
  description: string;
};

export default function Task({ id, title, description }: TaskProps) {
  const { listeners, attributes, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
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
  );
}
