import Column from "@/components/column";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import Task from "@/components/task";
import { columnData } from "@/data/column-data";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

export default function Dashboard() {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      console.log(`Moved task ${active.id} to ${over.id}`);
    }
  };
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* <div className="flex gap-4 overflow-auto flex-nowrap"> */}
          {columnData.map((column) => (
            <Column key={column.id} id={column.id} title={column.title}>
              {column.items?.map((task) => (
                <Task
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                />
              ))}
            </Column>
          ))}
        </div>
      </DndContext>
    </>
  );
}
