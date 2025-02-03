import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FC, FormEvent, useRef } from "react";

type TaskFormProps = {
  title: string;
  description: string;
  onSubmit: (data: { title: string; description: string }) => void;
};

const TaskForm: FC<TaskFormProps> = ({ title, description, onSubmit }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const submittedData = {
      title: titleRef.current?.value || "",
      description: descRef.current?.value || "",
    };
    onSubmit(submittedData);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start gap-4">
          <Label htmlFor="title" className="w-20 mt-2">
            Title:
          </Label>
          <div className="flex-1">
            <Input
              id="title"
              defaultValue={title}
              type="text"
              ref={titleRef}
              placeholder="Enter title"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Label htmlFor="desc" className="w-20 mt-2">
            Description:
          </Label>
          <div className="flex-1">
            <Textarea
              id="desc"
              ref={descRef}
              defaultValue={description}
              placeholder="Enter Description"
              className="resize-none h-32 w-full"
            />
          </div>
        </div>
        <Button className="m-auto" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
