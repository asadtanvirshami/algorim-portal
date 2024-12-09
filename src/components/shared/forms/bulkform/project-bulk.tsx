import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { updateProject } from "@/redux/actions/form-action";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { CheckCircle, Loader2, Save } from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDispatch, useSelector } from "react-redux";
import ProjectInfoForm from "./projectInfo-bulk";
import MilestoneBulk from "./milestone-bulk";
import ServicesForm from "./services-bulk";
import { projectApi } from "@/services/project/project-api";
import { toast } from "@/hooks/use-toast";

type Props = {};

const ProjectForm = (props: Props) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const data = useSelector((state: any) => state.project);
  const { project } = useSelector((state: any) => state.project);
  const [confirm, setConfirm] = React.useState(false);
  const handleChange = (field, value) => {
    console.log(value);

    dispatch(updateProject({ [field]: value }));
  };

  const handleClickMutation = useMutation({
    mutationFn: (data) => projectApi.bulkUpdate(data), // Correctly set mutation function
    onSuccess: () => {
      queryClient.invalidateQueries("project"); // Ensure it invalidates correctly
      setConfirm(false);
      toast({
        variant: "success",
        title: "Success",
        description: "Project updated successfully.",
        duration: 900,
      });
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Failed to updated project.",
        duration: 900,
      });
    },
  });
  const handleBulkUpdate = (e) => {
    e.preventDefault();
    handleClickMutation.mutate(data);
  };

  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex justify-between">
          <h1 className="font-semibold text-2xl mb-3 px-3 border rounded-lg">
            {project?.serial_number}
          </h1>
          <Dialog open={confirm} onOpenChange={setConfirm}>
            <DialogTrigger asChild>
              <Button onClick={() => setConfirm(true)} variant="outline">
                Save <Save />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Save Project</DialogTitle>
                <DialogDescription>
                  Are you sure you want to save current changes?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="bg-blue-500 w-min"
                  disabled={handleClickMutation.isPending}
                  onClick={(e) => {
                    handleBulkUpdate(e);
                  }}
                >
                  {handleClickMutation.isPending ? (
                    <Loader2 className="animate-spin" size={22} />
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <form className="grid grid-cols-2 gap-4 border p-4 rounded-lg">
          <div className="grid grid-cols-1 gap-2 ">
            <div>
              <div className="grid grid-cols-2 gap-4 ">
                <FormItem>
                  <Label>Title</Label>
                  <Input
                    placeholder="Enter project title"
                    defaultValue={project?.title || ""}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </FormItem>
                <FormItem>
                  <Label>Budget</Label>
                  <Input
                    type="number"
                    placeholder="Enter project budget"
                    defaultValue={project?.budget || 0}
                    onChange={(e) => handleChange("budget", e.target.value)}
                  />
                </FormItem>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-5">
                <FormItem>
                  <Label>Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !project?.start_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {project?.start_date ? (
                          format(project?.start_date, "MM-yy dd")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={project?.start_date || undefined}
                        onSelect={(e) => {
                          const date = format(e, "yyyy-MM-dd").toString();
                          handleChange("start_date", date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
                <FormItem>
                  <Label>End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !project?.end_date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {project?.end_date ? (
                          format(project?.end_date, "MM-yy dd")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={project?.end_date || undefined}
                        onSelect={(e) => {
                          const date = format(e, "yyyy-MM-dd").toString();
                          handleChange("end_date", date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
                <FormItem>
                  <Label>Deadline</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !project?.deadline && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon />
                        {project?.deadline ? (
                          format(project?.deadline, "MM-yy dd")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={project?.deadline || undefined}
                        onSelect={(e) => {
                          const date = format(e, "yyyy-MM-dd").toString();
                          handleChange("deadline", date);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </div>
            </div>
            <div className=" flex gap-4 w-full mt-3">
              <FormItem className="w-[180px]">
                <Label>Status</Label>
                <div>
                  <Select onValueChange={(e) => handleChange("status", e)}>
                    <SelectTrigger
                      className={`${
                        project?.status === "on hold"
                          ? "text-red-500"
                          : project?.status === "completed"
                          ? "text-green-500"
                          : project?.status === "near completion"
                          ? "text-yellow-500"
                          : project?.status === "in progress"
                          ? "text-blue-500"
                          : "text-gray-500"
                      }"w-[180px]`}
                    >
                      <SelectValue
                        className={
                          project?.status === "on hold"
                            ? "bg-red-500"
                            : project?.status === "completed"
                            ? "text-green-500"
                            : project?.status === "near completion"
                            ? "text-yellow-500"
                            : project?.status === "in progress"
                            ? "text-blue-500"
                            : "text-gray-500"
                        }
                        defaultValue={project?.status || ""}
                        placeholder={project?.status || "Select status"}
                        onChange={(e) => handleChange("status", e)}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="on hold" className="capitalize">
                        On Hold
                      </SelectItem>
                      <SelectItem value="in progress" className="capitalize">
                        In Progress
                      </SelectItem>
                      <SelectItem value="paused" className="capitalize">
                        Paused
                      </SelectItem>
                      <SelectItem value="completed" className="capitalize">
                        Completed
                      </SelectItem>
                      <SelectItem
                        value="near completion"
                        className="capitalize"
                      >
                        Near Completion
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </FormItem>

              <FormItem>
                <Label>Active</Label>
                <div>
                  <Switch
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400"
                    checkedIcon={
                      <CheckCircle className="w-5 h-5 text-green-500 " />
                    } // change the icons based on your need
                    uncheckedIcon={
                      <CrossCircledIcon className="w-5 h-5 text-red-500 " />
                    }
                    checked={project?.active || false}
                    onCheckedChange={(e) => handleChange("active", e)}
                  />
                </div>
              </FormItem>
              <FormItem>
                <Label>Approved</Label>
                <div>
                  <Switch
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400"
                    checkedIcon={
                      <CheckCircle className="w-5 h-5 text-green-500 " />
                    } // change the icons based on your need
                    uncheckedIcon={
                      <CrossCircledIcon className="w-5 h-5 text-red-500 " />
                    }
                    checked={project?.approved || false}
                    onCheckedChange={(e) => handleChange("approved", e)}
                  />
                </div>
              </FormItem>
            </div>
          </div>
          <div>
            <FormItem>
              <Label>Description</Label>
              <Textarea
                className="h-48"
                placeholder="Enter project description"
                defaultValue={project?.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </FormItem>
          </div>
        </form>
        <Separator className="my-4" />
        <ProjectInfoForm />
        <Separator className="my-4" />
        <ServicesForm />
        <Separator className="my-4" />
        <MilestoneBulk />
      </div>
    </React.Fragment>
  );
};

export default ProjectForm;
