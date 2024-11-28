"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
  const data = useSelector((state) => state.form.data);
  const edit = useSelector((state) => state.form.edit);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: "", // Optional, can be set if editing an existing project
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
  });
  useEffect(() => {
    if (edit) form.reset(data);
  }, [edit, data]);

  const onSubmit = async (values) => {
    try {
      console.log("Form Submitted", values);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              <FormDescription>Set a budget for your project.</FormDescription>
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
              <FormLabel>Approved</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
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
              <FormLabel>Active</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Check if the project is currently active.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
