"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

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

// Define the validation schema using Zod
const linkSchema = z.object({
  url: z.string().url({ message: "Must be a valid URL" }),
  description: z.string().min(1, { message: "Description is required" }),
});

const projectInfoSchema = z.object({
  links: z
    .array(linkSchema)
    .min(1, { message: "At least one link is required" }),
  meeting_link: z.string().url({ message: "Must be a valid URL" }),
  project_manager_email: z.string().email({ message: "Must be a valid email" }),
  project_manager_name: z.string().min(1, { message: "Name is required" }),
  project_manager_phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  completion_percentage: z
    .number()
    .min(0)
    .max(100, { message: "Percentage must be between 0 and 100" }),
  note: z.string().optional(),
  project: z
    .number()
    .int()
    .positive({ message: "Project ID must be a positive integer" }),
});

export function ProjectInfoForm() {
  const form = useForm({
    resolver: zodResolver(projectInfoSchema),
    defaultValues: {
      links: [{ url: "", description: "" }],
      meeting_link: "",
      project_manager_email: "",
      project_manager_name: "",
      project_manager_phone: "",
      completion_percentage: 0,
      note: "",
      project: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const onSubmit = async (values) => {
    try {
      // Here you would typically call your API to create or update project info
      console.log("Form Submitted", values);
      // await createOrUpdateProjectInfo(values); // Uncomment and implement this function
    } catch (error) {
      console.error("Error submitting form", error);
      // Handle error appropriately
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="meeting_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meeting Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter meeting link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project_manager_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Manager Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter project manager email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project_manager_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Manager Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project manager name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project_manager_phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Manager Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter project manager phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="completion_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Completion Percentage</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter completion percentage"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Input placeholder="Enter any notes" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project ID</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter project ID"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Seperator />
        {fields.map((field, index) => (
          <div key={field.id}>
            <FormField
              control={form.control}
              name={`links.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link URL {index + 1}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter link URL" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.links?.[index]?.url?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`links.${index}.description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Description {index + 1}</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter link description" {...field} />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.links?.[index]?.description?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <Button type="button" onClick={() => remove(index)}>
              Remove Link
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => append({ url: "", description: "" })}
        >
          Add Another Link
        </Button>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
