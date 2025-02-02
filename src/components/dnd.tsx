import { columnData } from "@/data/column-data";
import { TColumn } from "@/types/column.type";
import { TTask } from "@/types/task.type";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import Column from "./column";
import Task from "./task";

export default function DragAndDrop() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );
  const [columns, setColumns] = useState<TColumn[]>(() => {
    const saved = localStorage.getItem("taskBoardState");
    return saved ? JSON.parse(saved) : columnData;
  });

  useEffect(() => {
    localStorage.setItem("taskBoardState", JSON.stringify(columns));
  }, [columns]);

  const findColumn = (itemId: TTask["id"]) => {
    return columns.find((col) => col.items.some((item) => item.id === itemId));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumn = findColumn(active.id as TTask["id"]);
    const overColumn =
      findColumn(over.id as TTask["id"]) ||
      columns.find((col) => col.id === over.id);

    if (!sourceColumn || !overColumn) return;
    const sourceIndex = sourceColumn.items.findIndex(
      (item) => item.id === active.id
    );
    const overIndex = overColumn.items.findIndex((item) => item.id === over.id);

    //move in same col
    if (sourceColumn.id === overColumn.id) {
      const newItems = arrayMove(sourceColumn.items, sourceIndex, overIndex);
      setColumns(
        columns.map((col) =>
          col.id === sourceColumn.id ? { ...col, items: newItems } : col
        )
      );
    } else {
      //move to diff
      const item = sourceColumn.items[sourceIndex];
      const newSourceItems = [...sourceColumn.items];
      newSourceItems.splice(sourceIndex, 1);

      const newOverItems = [...overColumn.items];
      newOverItems.splice(overIndex > 0 ? overIndex : 0, 0, item);

      setColumns(
        columns.map((col) => {
          if (col.id === sourceColumn.id)
            return { ...col, items: newSourceItems };
          if (col.id === overColumn.id) return { ...col, items: newOverItems };
          return col;
        })
      );
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* <div className="flex gap-4 overflow-auto flex-nowrap"> */}
        {columns.map((column) => (
          <Column key={column.id} id={column.id} title={column.title}>
            <SortableContext
              items={column.items?.map((task) => task.id)}
              strategy={verticalListSortingStrategy}
            >
              {column.items?.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                />
              ))}
            </SortableContext>
          </Column>
        ))}
      </div>
    </DndContext>
  );
}
