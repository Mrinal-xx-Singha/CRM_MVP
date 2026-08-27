"use client";

import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { CalendarIcon, Trash2, UserIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jobsApi } from "@/lib/api";
import { toast } from "sonner";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { JobForm } from "./job-form";
import { Edit2 } from "lucide-react";


export interface Job {
  id: number;
  customer_id: number;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
  due_date?: string;
  customer_name?: string;
  deal_value?: number;
}

interface JobCardProps {
  job: Job;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  const queryClient = useQueryClient();
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  const deleteMutaion = useMutation({
    mutationFn: (id: number) => jobsApi.deleteJob(id),
    onSuccess: () => {
      // Show success toast
      toast.success("Job deleted successfully!");

      queryClient.invalidateQueries({ queryKey: ["jobs"] });

      queryClient.invalidateQueries({ queryKey: ["dashboard"] });

    },
    onError: () => {
      toast.error("Failed to delete job. Please try again.");
    }
  })


  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      deleteMutaion.mutate(id)
    }
  }
  
  // Format the Indian Rupee value
  const formattedValue = job.deal_value ? new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(job.deal_value) : null;

  return (
    <Draggable draggableId={job.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`group relative flex flex-col gap-2 rounded-lg border bg-card p-4 shadow-sm transition-all hover:border-primary/50 ${snapshot.isDragging ? "rotate-2 scale-105 shadow-xl ring-1 ring-primary/20 cursor-grabbing" : "cursor-grab"
            }`}
        >
          <div className="flex justify-between items-start gap-2">
            <Link href={`/jobs/${job.id}`} className="hover:underline hover:text-blue-600">
              <h4 className="font-medium leading-none text-foreground">{job.title}</h4>
            </Link>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Job</DialogTitle>
                  </DialogHeader>
                  <JobForm 
                    jobId={job.id} 
                    initialData={job} 
                    onSuccessCallback={() => setIsEditOpen(false)} 
                  />
                </DialogContent>
              </Dialog>
              <Button
                onClick={() => handleDelete(job.id)}
                variant="destructive" size="sm" className="h-7 w-7 p-0">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {job.description && (
            <p className="line-clamp-2 text-xs text-muted-foreground">{job.description}</p>
          )}

          {formattedValue && (
            <div className="mt-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                {formattedValue}
              </span>
            </div>
          )}

          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <UserIcon className="h-3.5 w-3.5" />
              <span>{job.customer_name || "Unknown"}</span>
            </div>

            {job.due_date && (
              <div className="flex items-center gap-1.5 font-medium text-foreground/70">
                <CalendarIcon className="h-3.5 w-3.5" />
                <span>{new Date(job.due_date).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
