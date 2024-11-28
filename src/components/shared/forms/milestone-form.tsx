import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSelector } from "react-redux";

const milestoneSchema = z.object({
  id: z.string().min(1, { message: "Key is required" }),
  title: z.string().min(1, { message: "Key is required" }),
  description: z.string().min(1, { message: "Value is required" }),
  dueDate: z.string().min(1, { message: "Value is required" }),
  isCompleted: z.string().min(1, { message: "Value is required" }),
  amount: z.string().min(1, { message: "Value is required" }),
});

const formSchema = z.object({
  milestone: z.array(milestoneSchema),
  project: z.number().min(1, { message: "Value is required" }).optional(),
});

const MilestoneForm = () => {
  const data = useSelector((state) => state.form.data);
  const edit = useSelector((state) => state.form.edit);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      milestones: [
        {
          id: "",
          title: "",
          description: "",
          dueDate: "",
          isCompleted: "",
          amount: "",
        },
      ],
      project: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "milestones",
  });

  useEffect(() => {
    if (edit) form.reset(data);
  }, [edit, data]);

  const onSubmit = (values) => {
    console.log(values);
    // Handle the form submission logic here (e.g., API call)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <div key={field.id}>
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...form.register(`milestones.${index}.title`)} />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.milestones?.[index]?.title?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...form.register(`milestones.${index}.description`)} />
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors?.milestones?.[index]?.description
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...form.register(`milestones.${index}.dueDate`)}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.milestones?.[index]?.dueDate?.message}
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Is Completed</FormLabel>
              <FormControl>
                <Input {...form.register(`milestones.${index}.isCompleted`)} />
              </FormControl>
              <FormMessage>
                {
                  form.formState.errors?.milestones?.[index]?.isCompleted
                    ?.message
                }
              </FormMessage>
            </FormItem>

            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input {...form.register(`milestones.${index}.amount`)} />
              </FormControl>
              <FormMessage>
                {form.formState.errors?.milestones?.[index]?.amount?.message}
              </FormMessage>
            </FormItem>

            <Button type="button" onClick={() => remove(index)}>
              Remove Milestone
            </Button>
          </div>
        ))}

        <Button
          type="button"
          onClick={() =>
            append({
              id: "",
              title: "",
              description: "",
              dueDate: "",
              isCompleted: "",
              amount: "",
            })
          }
        >
          Add Milestone
        </Button>

        <Button type="submit">Submit </Button>
      </form>
    </Form>
  );
};

export default MilestoneForm;
