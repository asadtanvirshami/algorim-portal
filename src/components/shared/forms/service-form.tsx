"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Input } from "@/components/ui/input"; // Ensure you import your Input component
import { useSelector } from "react-redux";
import { useMemo } from "react";

// Define the validation schema using Zod
const serviceSchema = z.object({
  id: z.string().min(1, { message: "id is required" }).optional(),
  service_name: z.string().min(1, { message: "Value is required" }),
});

const formSchema = z.object({
  services: z.array(serviceSchema),
  project: z.number().min(1, { message: "Value is required" }).optional(),
});

const ServiceForm = () => {
  const { services } = useSelector((state) => state.project);

  const defaultValues = useMemo(() => {
    return services ? services : [{ id: "", service_name: "" }];
  }, [services]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: defaultValues,
      project: 0,
      values: services,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "service",
  });

  function onSubmit(values) {
    console.log(values); // Handle form submission
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((item, index) => {
          return (
            <FormField
              key={item.id} // Use a unique key
              control={form.control}
              name={`service.${index}.service_name`} // Dynamic name
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter service" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the service of your project.
                  </FormDescription>
                  <FormMessage />
                  <Button type="button" onClick={() => remove(index)}>
                    Remove
                  </Button>
                </FormItem>
              )}
            />
          );
        })}
        <Button
          type="button"
          onClick={() => append({ id: "", service_name: "" })}
        >
          Add Service
        </Button>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default ServiceForm;
