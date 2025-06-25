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
import { CalendarDays, Sparkles } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function employeesManagementPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [segment, setSegment] = useState("");
  const [dateRange, setDateRange] = useState("Jun 1 - Jun 30");
  const [frequency, setFrequency] = useState("Monthly");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  // Dummy date range change logic
  const handleDateRangeClick = () => {
    setDateRange(
      dateRange === "Jun 1 - Jun 30" ? "Jul 1 - Jul 31" : "Jun 1 - Jun 30"
    );
  };

  const handleFilter = () => setIsDialogOpen(false);

  const handleAIAssistant = () => {
    // Add your AI assistant logic here
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
        {/* Employees */}
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
                  {employees.filter((p) => p.status === "completed").length}{" "}
                  completed
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
                        employees.filter((p) => p.status === "in-progress")
                          .length
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
    </div>
  );
}
