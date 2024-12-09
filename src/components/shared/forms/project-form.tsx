"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CrossCircledIcon, CheckCircledIcon } from "@radix-ui/react-icons";
import { Save } from "lucide-react";
import { updateProject } from "@/redux/actions/form-action";
import { UnknownAction } from "@reduxjs/toolkit";

// Define the validation schema using Zod
const formSchema = z.object({
  id: z.string().uuid().optional(), // Assuming ID can be a UUID and is optional for new projects
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  budget: z.number().min(0, {
    message: "Budget must be a positive number.",
  }),
  start_date: z.string().nonempty({
    message: "Start date is required.",
  }),
  end_date: z.string().nonempty({
    message: "End date is required.",
  }),
  deadline: z.string().nonempty({
    message: "Deadline is required.",
  }),
  status: z.string().min(1, {
    message: "Status is required.",
  }),
  approved: z.boolean(),
  active: z.boolean(),
});

export function ProjectForm() {
  const { project } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const defaultValues = useMemo(() => {
    return project
      ? project
      : {
          id: "",
          title: "",
          description: "",
          budget: 0,
          start_date: "",
          end_date: "",
          deadline: "",
          status: "",
          approved: false,
          active: false,
        };
  }, [project]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      budget: 0,
      start_date: "",
      end_date: "",
      deadline: "",
      status: "",
      approved: false,
      active: false,
    },
    values: project,
  });

  const onChange = (data) => {
    dispatch(updateProject(data)) as UnknownAction;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onChange)} className="space-y-8">
        <div className="flex justify-end">
          <Button className="bg-gray-800" type="submit">
            Save <Save />
          </Button>
        </div>
        <div className="grid grid-cols-2">
          <div className="p-3 space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project title" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the title of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project description" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a brief description of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter project budget"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Set a budget for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Select the start date for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="end_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormDescription>
                    Select the end date for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Set a deadline for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="p-3 space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project status" {...field} />
                  </FormControl>
                  <FormDescription>
                    Specify the current status of your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="approved"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel>Approved</FormLabel>
                    <FormControl>
                      <Switch
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400"
                        checkedIcon={
                          <CheckCircledIcon className="w-5 h-5 text-green-500 " />
                        } // change the icons based on your need
                        uncheckedIcon={
                          <CrossCircledIcon className="w-5 h-5 text-red-500 " />
                        }
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Check if the project is approved.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel>Active</FormLabel>
                    <FormControl>
                      <Switch
                        className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-400"
                        checkedIcon={
                          <CheckCircledIcon className="w-5 h-5 text-green-500 " />
                        } // change the icons based on your need
                        uncheckedIcon={
                          <CrossCircledIcon className="w-5 h-5 text-red-500 " />
                        }
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Check if the project is currently active.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
