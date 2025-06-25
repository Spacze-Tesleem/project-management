"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays, Sparkles, FileText, Clock, User, AlertCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Dummy employees data
const employees = [
  { id: 1, status: "completed", progress: 100, deadline: "2024-07-10" },
  { id: 2, status: "in-progress", progress: 60, deadline: "2024-07-20" },
  { id: 3, status: "in-progress", progress: 40, deadline: "2024-08-01" },
  { id: 4, status: "completed", progress: 100, deadline: "2024-06-15" },
];

export default function EmployeesManagementPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [segment, setSegment] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleFilter = () => setIsDialogOpen(false);

  const handleAIAssistant = () => {
    alert("AI Assistant coming soon!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Projects Management
          </h1>
          <p className="text-muted-foreground">
            Here's today's report and performance
          </p>
        </div>
        {/* Header Controls */}
        <div className="flex items-center gap-2 bg-[#181828] px-4 py-2 rounded-xl">
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-white"
                title="Pick a date"
              >
                <CalendarDays className="w-4 h-4" />
                <span>
                  {selectedDate
                    ? format(selectedDate, "MMM d, yyyy")
                    : "Pick a date"}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-background">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {/* Frequency Selector */}
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="bg-transparent text-white px-2 py-1 rounded hover:bg-[#23233a] focus:outline-none"
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>
          {/* Segment Dropdown */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" className="text-white">
                {segment || "All Segment"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Select Segment</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">All Segment</option>
                  <option value="Segment 1">Segment 1</option>
                  <option value="Segment 2">Segment 2</option>
                </select>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={handleFilter}>
                  Filter
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* AI Assistant */}
          <Button
            className="bg-[#7c3aed] text-white hover:bg-[#6d28d9] ml-2 flex items-center gap-2"
            onClick={handleAIAssistant}
          >
            <Sparkles className="w-4 h-4" />
            AI Assistant
          </Button>
        </div>
      </div>
      {/* Overview Tab */}
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Employees
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">
                {employees.filter((p) => p.status === "completed").length} completed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                In Progress
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {employees.filter((p) => p.status === "in-progress").length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  employees
                    .filter((p) => p.status === "in-progress")
                    .reduce((acc, p) => acc + p.progress, 0) /
                    Math.max(
                      1,
                      employees.filter((p) => p.status === "in-progress").length
                    )
                )}
                % avg. progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Team Members
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                Across {employees.length} employees
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Upcoming Deadlines
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {
                  employees.filter(
                    (p) =>
                      new Date(p.deadline) > new Date() &&
                      p.status !== "completed"
                  ).length
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Within the next 30 days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}