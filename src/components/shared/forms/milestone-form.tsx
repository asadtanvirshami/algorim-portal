import React, { useEffect, useMemo } from "react";
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
import { PlusCircle, SaveIcon, XCircle } from "lucide-react";

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
});

const MilestoneForm = () => {
  const {
    milestones: data,
    project,
    edit,
  } = useSelector((state) => state.project);

  const defaultValues = useMemo(() => {
    return data
      ? data
      : [
          {
            id: "",
            title: "",
            description: "",
            dueDate: "",
            isCompleted: "",
            amount: "",
          },
        ];
  }, [data]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      milestones: defaultValues,
      values: data,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "milestones",
  });
  console.log(data);

  const onSubmit = (values) => {
    console.log(values);
    // Handle the form submission logic here (e.g., API call)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-end gap-5 mb-8  ">
          {/* <Button
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
        > */}
          <Button
            onClick={() => append({ key: "", value: "" })}
            className="bg-white text-green-400 hover:bg-white"
          >
            <PlusCircle className="text-green-500 cursor-pointer" />
            Add
          </Button>
          <Button type="submit" className="bg-gray-800">
            Save
            <SaveIcon />
          </Button>
        </div>
        <div className="overflow-auto max-h-[700px] rounded-lg p-4 space-y-5">
          {fields.map((field, index) => (
            <div key={field.id} className="bg-card border rounded-lg p-3 ">
              <h1 className="font-semibold">{"Milestone" + (index + 1)}</h1>
              <div className="flex float-right ">
                <XCircle
                  className="text-red-500 cursor-pointer "
                  onClick={() => remove(index)}
                />
              </div>
              <div className="space-y-4">
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
                    <Input
                      {...form.register(`milestones.${index}.description`)}
                    />
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
                    {
                      form.formState.errors?.milestones?.[index]?.dueDate
                        ?.message
                    }
                  </FormMessage>
                </FormItem>

                <FormItem>
                  <FormLabel>Is Completed</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register(`milestones.${index}.isCompleted`)}
                    />
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
                    {
                      form.formState.errors?.milestones?.[index]?.amount
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              </div>
            </div>
          ))}
        </div>
      </form>
    </Form>
  );
};

export default MilestoneForm;
