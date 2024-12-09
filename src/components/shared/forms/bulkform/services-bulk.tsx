import React, { useState } from "react";
import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateServices } from "@/redux/actions/form-action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";
type Props = {};

const ServicesForm = (props: Props) => {
  const dispatch = useDispatch();
  const { services, project } = useSelector((state: any) => state.project);
  const [newServiceName, setNewServiceName] = useState("");

  const handleAddService = () => {
    if (newServiceName.trim() === "") return;

    const newService = {
      id: crypto.randomUUID(),
      service_name: newServiceName,
      project: project?.id,
    };
    const updatedServices = [...services, newService];
    dispatch(updateServices(updatedServices));
    setNewServiceName("");
  };

  const handleRemoveService = (index: number) => {
    const updatedServices = services.filter((_, i) => i !== index);
    dispatch(updateServices(updatedServices)); // Dispatch updated services
  };

  return (
    <div className="min-h-[400px] gap-4 w-full rounded-lg border p-4">
      <div className="flex justify-between w-full">
        <dl>
          <dt>Project Services</dt>
          <dd className="text-sm text-muted-foreground">
            Services can be added here.
          </dd>
        </dl>
      </div>
      <Separator className="mt-10 mb-4" />
      <div className="max-h-[300px] rounded-lg overflow-auto w-full border p-4">
        <FormItem className="flex-grow">
          <Label>Service Name</Label>
          <div className="flex gap-2 items-center mb-4">
            <Input
              placeholder="Enter service name"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
            />
            <Button
              type="button"
              className="p-2 bg-blue-500 text-white rounded"
              onClick={handleAddService}
            >
              Add
              <PlusCircle className="ml-2" />
            </Button>
          </div>
        </FormItem>
        <div className="flex flex-row flex-wrap gap-2 mt-3">
          {services?.map((service: any, index: number) => {
            return (
              <Badge
                key={index}
                className="border w-fit flex gap-2 bg-white text-muted-foreground"
              >
                {service?.service_name || ""}
                <XCircle
                  className="text-red-500 w-4 cursor-pointer"
                  onClick={() => handleRemoveService(index)}
                />
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesForm;
