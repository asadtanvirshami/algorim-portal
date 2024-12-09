import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMilestones } from "@/redux/actions/form-action"; // Adjust the path accordingly
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { XCircle, PlusCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const MilestoneBulk = () => {
  const dispatch = useDispatch();
  const milestones = useSelector(
    (state: any) => state.project.milestones || []
  );
  const project = useSelector(
    (state: any) => state.project.project || {}
  );
  console.log(project, "proj");
  

  // Handle change for milestone fields
  const handleMilestoneChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMilestones = milestones.map((milestone: any, i: number) => {
      if (i === index) {
        return { ...milestone, [field]: value }; // Update the specific field
      }
      return milestone;
    });
    dispatch(updateMilestones(updatedMilestones));
  };

  // Add a new milestone
  const handleAddMilestone = () => {
    const newMilestone = {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      dueDate: "",
      isCompleted: false,
      amount: "",
      project: project?.id
    };
    const updatedMilestones = [...milestones, newMilestone];
    dispatch(updateMilestones(updatedMilestones));
  };

  // Remove a milestone
  const handleRemoveMilestone = (index: number) => {
    const updatedMilestones = milestones.filter(
      (_: any, i: number) => i !== index
    );
    dispatch(updateMilestones(updatedMilestones));
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg ">Milestones</h2>
        <Button className="bg-blue-500" onClick={handleAddMilestone}>
          Add Milestone <PlusCircle className="ml-2" />
        </Button>
      </div>
      <Separator className="mb-4" />
      <div className="space-y-4 min-h-[500px] max-h-[650px] overflow-auto">
        {milestones.map((milestone: any, index: number) => (
          <div
            key={milestone.id}
            className="flex flex-col gap-4 border p-4 rounded-lg"
          >
            <div className="flex justify-between">
              <h1 className="font-semibold">Milestone {index + 1} </h1>
              {/* Remove Button */}
              <XCircle
                className="text-red-500 cursor-pointer"
                onClick={() => handleRemoveMilestone(index)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium">Title</label>
                <Input
                  value={milestone.title}
                  onChange={(e) =>
                    handleMilestoneChange(index, "title", e.target.value)
                  }
                  placeholder="Enter milestone title"
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium">Due Date</label>
                <Input
                  type="date"
                  value={milestone.dueDate}
                  onChange={(e) =>
                    handleMilestoneChange(index, "dueDate", e.target.value)
                  }
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  value={milestone.amount}
                  onChange={(e) =>
                    handleMilestoneChange(index, "amount", e.target.value)
                  }
                  placeholder="Enter amount"
                />
              </div>

              {/* Is Completed */}
              <div className="flex items-center">
                <label className="block text-sm font-medium mr-2">
                  Completed
                </label>
                <Checkbox
                  className="text-red-500"
                  checked={milestone.isCompleted}
                  onCheckedChange={(checked) =>
                    handleMilestoneChange(index, "isCompleted", checked)
                  }
                />
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium">Description</label>
                <Textarea
                  className="min-h-[200px]"
                  value={milestone.description}
                  onChange={(e) =>
                    handleMilestoneChange(index, "description", e.target.value)
                  }
                  placeholder="Enter milestone description"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MilestoneBulk;
