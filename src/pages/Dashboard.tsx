import DragAndDrop from "@/components/dnd";
import { PageHeader, PageHeaderHeading } from "@/components/page-header";

export default function Dashboard() {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Dashboard</PageHeaderHeading>
      </PageHeader>
      <DragAndDrop />
    </>
  );
}
