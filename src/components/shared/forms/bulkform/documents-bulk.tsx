import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, XCircle } from "lucide-react";
import React, from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDetails } from "@/redux/actions/form-action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


type Props = {};

const DocumentsBulk = (props: Props) => {
  const dispatch = useDispatch()
  const {documents} = useSelector(state=>state.project)

const handleRemove = ()=>{}
const handleChange = ()=>{}
const handUpload = ()=>{}

  return (
    <div>
      <form className="flex  w-full gap-3">
        <div className="min-h-[400px] gap-4 w-full ounded-lg border p-4">
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
              {documents.map((doc: any, index: number) => {
                const key = Object.keys(doc)[0];
                const value = doc[key];

                return (
                  <div key={index} className="flex items-center">
                    <div className="grid grid-cols-2 gap-3 w-full justify-evenly  mb-4">
                      <FormItem>
                        <Label>Title</Label>
                        <Input
                          placeholder="Enter title"
                          value={key}
                          onChange={(e) =>
                            handleChange(index, key, e.target.value, true)
                          }
                        />
                      </FormItem>
                      <FormItem>
                        <Label>Value</Label>
                        <Input
                          placeholder="Enter value"
                          value={value}
                          onChange={(e) =>
                            handleChange(index, key, e.target.value, false)
                          }
                        />
                      </FormItem>
                    </div>
                    {index >= 0 && (
                      <XCircle
                        className="text-red-500 mt-4 ml-2 cursor-pointer"
                        onClick={() => handleRemove(index)}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DocumentsBulk;
