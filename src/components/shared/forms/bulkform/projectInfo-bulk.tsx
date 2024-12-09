import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, XCircle } from "lucide-react";
import React, from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "@/redux/actions/form-action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


const ProjectInfoForm = () => {
  const dispatch = useDispatch();
  const { details } = useSelector((state: any) => state.project);
  const links = details[0]?.links || [];


  const handleLinkChange = (
    index: number,
    field: string,
    value: string,
    isKey: boolean
  ) => {
    const updatedLinks = links.map((link: any, i: number) => {
      const currentKey = Object.keys(link)[0];
      const currentValue = link[currentKey];
      if (i !== index) return link;
      return isKey ? { [value]: currentValue } : { [currentKey]: value };
    });
    const detailsState = { ...details[0], links: updatedLinks };
    dispatch(updateDetails([detailsState]));
  };

  const handleDetailChange = (field: string, value: any) => {
    const updatedDetail = { ...details[0], [field]: value };
    dispatch(updateDetails([updatedDetail]));
  };

  const handleAddLink = () => {
    const newLink = { key: "", value: "" };
    const updatedLinks = [...(details[0].links || []), newLink];
    const updatedDetails = [
      {
        ...details[0],
        links: updatedLinks,
      },
      ...details.slice(1),
    ];
    dispatch(updateDetails(updatedDetails));
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    const detailsState = { ...details[0], links: updatedLinks };
    dispatch(updateDetails([detailsState]));
  };

  console.log(details);

  return (
    <div>
      <form className="flex  w-full gap-3">
        <div className="min-h-[400px] gap-4 w-full rounded-lg border p-4">
          <div className="w-full">
            <div className="flex justify-between w-full">
              <dl>
                <dt>Project Links</dt>
                <dd className="text-sm text-muted-foreground">
                  Important links can be added with custom title.
                </dd>
              </dl>
              <Button
                type="button"
                className="mt-4 p-2 float-top mb-4 bg-blue-500 text-white rounded"
                onClick={handleAddLink}
              >
                Add More
                <PlusCircle />
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="max-h-[300px] rounded-lg overflow-auto w-full border p-4">
              {links.map((link: any, index: number) => {
                const key = Object.keys(link)[0];
                const value = link[key];

                return (
                  <div key={index} className="flex items-center" >

    
                  <div className="grid grid-cols-2 gap-3 w-full justify-evenly  mb-4">
                    <FormItem>
                      <Label>Title</Label>
                      <Input
                        placeholder="Enter title"
                        value={key}
                        onChange={(e) =>
                          handleLinkChange(index, key, e.target.value, true)
                        }
                      />
                    </FormItem>
                    <FormItem>
                      <Label>Value</Label>
                      <Input
                        placeholder="Enter value"
                        value={value}
                        onChange={(e) =>
                          handleLinkChange(index, key, e.target.value, false)
                        }
                      />
                    </FormItem>
                    </div>
                    {index >= 0 && (
                      <XCircle
                        className="text-red-500 mt-4 ml-2 cursor-pointer"
                        onClick={() => handleRemoveLink(index)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
        <div className="min-h-[400px] w-full rounded-lg border p-4">
          <div className="flex ">
            <dl>
              <dt>Project Manager</dt>
              <dd className="text-sm text-muted-foreground">
                Dedicated project manager information.
              </dd>
            </dl>
          </div>
          <Separator className="my-4" />
          <div className="max-h-[300px] rounded-lg overflow-auto  border p-4">
            <div className="grid grid-cols-2 gap-4">
              <FormItem>
                <Label>Project Manager</Label>
                <Input
                  placeholder="Enter project manager name"
                  defaultValue={details[0]?.project_manager_name || ""}
                  onChange={(e) =>
                    handleDetailChange("project_manager_name", e.target.value)
                  }
                />
              </FormItem>
              <FormItem>
                <Label>Project Manager Email</Label>
                <Input
                  placeholder="Enter project manager email"
                  defaultValue={details[0]?.project_manager_email || ""}
                  onChange={(e) =>
                    handleDetailChange("project_manager_email", e.target.value)
                  }
                />
              </FormItem>
              <FormItem>
                <Label>Project Manager Phone No</Label>
                <Input
                  placeholder="Enter project manager phone no"
                  defaultValue={details[0]?.project_manager_phone || ""}
                  onChange={(e) =>
                    handleDetailChange("project_manager_phone", e.target.value)
                  }
                />
              </FormItem>
              <FormItem>
                <Label>Meeting Link</Label>
                <Input
                  placeholder="Enter meeting link"
                  defaultValue={details[0]?.meeting_link || ""}
                  onChange={(e) =>
                    handleDetailChange("meeting_link", e.target.value)
                  }
                />
              </FormItem>
              <FormItem>
                <Label>Completion Value</Label>
                <Input
                  placeholder="Enter completion value"
                  defaultValue={details[0]?.completion_percentage || ""}
                  onChange={(e) =>
                    handleDetailChange("completion_percentage", e.target.value)
                  }
                />
              </FormItem>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectInfoForm;
