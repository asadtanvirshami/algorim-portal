"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Define the schema for the form
const formSchema = z.object({
  documents: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "At least one file is required",
    }),
  project: z.number().min(1, { message: "Value is required" }).optional(),
});

const DocumentForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      project: undefined,
    },
  });

  const onSubmit = (data) => {
    const files = data.documents;
    console.log("Uploaded Files:", files);
    // Implement file upload logic here
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* File Upload Field */}
        <FormField
          control={form.control}
          name="documents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Documents</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.documents?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Project Field */}
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage>{form.formState.errors.project?.message}</FormMessage>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DocumentForm;
