"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { memo, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { PlusCircle, Save, XCircle } from "lucide-react";

// Define the validation schema using Zod
const linkSchema = z.object({
  key: z.string().min(1, { message: "Key is required" }),
  value: z.string().min(1, { message: "Value is required" }),
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

const ProjectInfoForm = () => {
  const { details } = useSelector((state) => state.project);

  const defaultValues = useMemo(() => {
    return details[0]
      ? {
          ...details[0],
          links: details[0].links.flatMap((link: any) =>
            Object.keys(link).map((key) => ({
              key: key, // Extract key
              value: link[key], // Extract value
            }))
          ),
        }
      : {
          links: [{ key: "", value: "" }],
          meeting_link: "",
          project_manager_email: "",
          project_manager_name: "",
          project_manager_phone: "",
          completion_percentage: 0,
          note: "",
          project: 0,
        };
  }, [details]);

  const form = useForm({
    resolver: zodResolver(projectInfoSchema),
    defaultValues: defaultValues,
    values: details[0],
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const onSubmit = async (values: any) => {
    try {
      // Convert the 'links' array into an array of objects where each object has one key-value pair
      const transformedLinks = values.links.map((link: any) => ({
        [link.key]: link.value,
      }));

      console.log("Form Submitted", {
        ...values,
        links: transformedLinks, // Adding the transformed links data
      });

      // Handle your API submission logic here
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  console.log(fields);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-end">
          <Button type="submit" className="bg-gray-800">
            Save
            <Save />
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 p-3 space-y-6 ">
          <div className="space-y-6">
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
                    <Input
                      placeholder="Enter project manager email"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter project manager name"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter project manager phone"
                      {...field}
                    />
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
          </div>
          <div>
            <div className="space-x-5  w-fit">
              <div className="flex justify-end mb-5 space-x-5 ">
                <Button
                  onClick={() => append({ key: "", value: "" })}
                  className="bg-white text-green-400 hover:bg-white"
                >
                  <PlusCircle className="text-green-500 cursor-pointer" />
                  Add
                </Button>
              </div>
              <div className=" ">
                {/* Dynamically render each link */}
                <div className="overflow-auto max-h-[600px] space-y-4 border rounded-lg p-4">
                  {fields.map((link, index) => (
                    <div key={link.id} className="space-y-4">
                      <FormLabel className="font-semibold">
                        Link {index + 1}
                      </FormLabel>
                      <div className="flex gap-4">
                        <FormField
                          control={form.control}
                          name={`links.${index}.key`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Enter key" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`links.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Enter value" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <XCircle
                          className="text-red-500 cursor-pointer"
                          onClick={() => remove(index)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default memo(ProjectInfoForm);
