"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Sparkles,
  FileText,
  Clock,
  User,
  AlertCircle,
  MoreHorizontal,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Color palette
const colors = {
  turquoise: "#1DE9B6",
  bluishGreen: "#1CB5E0",
  silver: "#E3E8EE",
  bgGradient: "linear-gradient(135deg, #1CB5E0 0%, #1DE9B6 100%)",
  cardGlass: "rgba(255,255,255,0.15)",
  cardBorder: "rgba(30, 200, 190, 0.2)",
  text: "#0f172a",
  tabActive: "#1CB5E0",
  tabInactive: "#94a3b8",
  shadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
};

// Dummy employees data
const employees = [
  { id: 1, status: "completed", progress: 100, deadline: "2024-07-10" },
  { id: 2, status: "in-progress", progress: 60, deadline: "2024-07-20" },
  { id: 3, status: "in-progress", progress: 40, deadline: "2024-08-01" },
  { id: 4, status: "completed", progress: 100, deadline: "2024-06-15" },
];

// Types
type Person = {
  name: string;
  initials: string;
  avatar?: string;
};

type Project = {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  deadline: string;
  assignedTo: Person[];
  priority: string;
  tasks: number;
  completedTasks: number;
};

// Badge helpers
function getStatusBadge(status: string) {
  switch (status) {
    case "in-progress":
      return (
        <Badge style={{ background: colors.bluishGreen, color: "#fff" }}>
          In Progress
        </Badge>
      );
    case "completed":
      return (
        <Badge style={{ background: colors.turquoise, color: "#fff" }}>
          Completed
        </Badge>
      );
    case "planning":
      return (
        <Badge
          variant="outline"
          style={{ borderColor: colors.turquoise, color: colors.text }}
        >
          Planning
        </Badge>
      );
    case "review":
      return <Badge variant="destructive">Review</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
function getPriorityBadge(priority: string) {
  switch (priority) {
    case "high":
      return (
        <Badge style={{ background: "#ff6b6b", color: "#fff" }}>High</Badge>
      );
    case "medium":
      return (
        <Badge style={{ background: "#ffd166", color: "#222" }}>Medium</Badge>
      );
    case "low":
      return (
        <Badge style={{ background: "#e0e0e0", color: "#222" }}>Low</Badge>
      );
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}

export default function EmployeesManagementPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [segment, setSegment] = useState("");
  const [frequency, setFrequency] = useState("Monthly");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from API (with fallback)
  useEffect(() => {
    async function fetchProjects() {
      try {
        // Replace with your real API endpoint
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data.projects);
        } else {
          throw new Error("API failed");
        }
      } catch {
        // Fallback to dummy data
        setProjects([
          {
            id: "1",
            name: "Website Redesign",
            description: "Redesign the company website with new branding",
            status: "in-progress",
            progress: 65,
            deadline: "2025-06-15",
            assignedTo: [
              { name: "Sophia Taylor", initials: "ST" },
              { name: "James Wilson", initials: "JW" },
            ],
            priority: "high",
            tasks: 12,
            completedTasks: 8,
          },
          {
            id: "2",
            name: "Mobile App Development",
            description: "Develop a new mobile app for customers",
            status: "planning",
            progress: 20,
            deadline: "2025-08-30",
            assignedTo: [
              { name: "Sophia Taylor", initials: "ST" },
              { name: "Alex Johnson", initials: "AJ" },
            ],
            priority: "medium",
            tasks: 18,
            completedTasks: 4,
          },
          {
            id: "3",
            name: "Marketing Campaign",
            description: "Q3 marketing campaign for new product launch",
            status: "review",
            progress: 90,
            deadline: "2025-06-01",
            assignedTo: [{ name: "Emma Davis", initials: "ED" }],
            priority: "high",
            tasks: 8,
            completedTasks: 7,
          },
          {
            id: "4",
            name: "Database Migration",
            description: "Migrate to the new cloud database system",
            status: "completed",
            progress: 100,
            deadline: "2025-05-15",
            assignedTo: [
              { name: "James Wilson", initials: "JW" },
              { name: "Alex Johnson", initials: "AJ" },
            ],
            priority: "medium",
            tasks: 10,
            completedTasks: 10,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const handleFilter = () => setIsDialogOpen(false);

  const handleAIAssistant = () => {
    alert("AI Assistant coming soon!");
  };

  // URL-controlled Tabs
  const currentTab = searchParams.get("tab") || "employee";
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "employee") {
      params.delete("tab");
    } else {
      params.set("tab", value);
    }
    router.push(`/dashboard/admin/project-management?${params.toString()}`);
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1
            className="text-4xl font-extrabold tracking-tight"
            style={{ color: colors.text }}
          >
            Projects Dashboard
          </h1>
          <p className="text-silver" style={{ color: colors.silver }}>
            Today's report and performance overview
          </p>
        </div>
        {/* Header Controls */}
        <div
          className="flex items-center gap-2 px-4 py-2 rounded-2xl shadow-lg"
          style={{
            background: "rgba(255,255,255,0.22)",
            border: `1.5px solid ${colors.cardBorder}`,
            backdropFilter: "blur(10px)",
            boxShadow: colors.shadow,
          }}
        >
          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-[16px] font-semibold"
                style={{ color: colors.bluishGreen }}
                title="Pick a date"
              >
                <CalendarDays className="w-5 h-5" />
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
            className="bg-transparent text-[16px] font-semibold"
            style={{
              color: colors.turquoise,
              border: "none",
              outline: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.12)",
              transition: "background 0.2s",
            }}
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>
          {/* Segment Dropdown */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                className="font-semibold"
                style={{
                  color: colors.bluishGreen,
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                }}
              >
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
            className="ml-2 flex items-center gap-2 font-semibold shadow"
            style={{
              background: colors.bluishGreen,
              color: "#fff",
              borderRadius: "8px",
              boxShadow: colors.shadow,
            }}
            onClick={handleAIAssistant}
          >
            <Sparkles className="w-5 h-5" />
            AI Assistant
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={currentTab}
        onValueChange={handleTabChange}
        className="space-y-6"
      >
        <TabsList
          className="flex gap-3 rounded-xl p-2"
          style={{
            background: "rgba(255,255,255,0.10)",
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.shadow,
          }}
        >
          <TabsTrigger
            value="employee"
            style={{
              color:
                currentTab === "employee"
                  ? colors.tabActive
                  : colors.tabInactive,
              background:
                currentTab === "employee"
                  ? "rgba(28,181,224,0.09)"
                  : "transparent",
              borderRadius: "8px",
              fontWeight: 600,
              padding: "0.5rem 1.5rem",
              transition: "all 0.2s",
            }}
          >
            Employee
          </TabsTrigger>
          <TabsTrigger
            value="overview"
            style={{
              color:
                currentTab === "overview"
                  ? colors.tabActive
                  : colors.tabInactive,
              background:
                currentTab === "overview"
                  ? "rgba(28,181,224,0.09)"
                  : "transparent",
              borderRadius: "8px",
              fontWeight: 600,
              padding: "0.5rem 1.5rem",
              transition: "all 0.2s",
            }}
          >
            Project Overview
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            style={{
              color:
                currentTab === "projects"
                  ? colors.tabActive
                  : colors.tabInactive,
              background:
                currentTab === "projects"
                  ? "rgba(28,181,224,0.09)"
                  : "transparent",
              borderRadius: "8px",
              fontWeight: 600,
              padding: "0.5rem 1.5rem",
              transition: "all 0.2s",
            }}
          >
            All Projects
          </TabsTrigger>
        </TabsList>

        {/* Employee Tab */}
        <TabsContent value="employee" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card
              style={{
                background: colors.cardGlass,
                border: `1.5px solid ${colors.cardBorder}`,
                borderRadius: "18px",
                boxShadow: colors.shadow,
                color: colors.text,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  Total Employees
                </CardTitle>
                <FileText className="h-5 w-5 text-bluishGreen" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">
                  {employees.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {employees.filter((p) => p.status === "completed").length}{" "}
                  completed
                </p>
              </CardContent>
            </Card>
            <Card
              style={{
                background: colors.cardGlass,
                border: `1.5px solid ${colors.cardBorder}`,
                borderRadius: "18px",
                boxShadow: colors.shadow,
                color: colors.text,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  In Progress
                </CardTitle>
                <Clock className="h-5 w-5 text-bluishGreen" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">
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
            <Card
              style={{
                background: colors.cardGlass,
                border: `1.5px solid ${colors.cardBorder}`,
                borderRadius: "18px",
                boxShadow: colors.shadow,
                color: colors.text,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  Team Members
                </CardTitle>
                <User className="h-5 w-5 text-bluishGreen" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">4</div>
                <p className="text-xs text-muted-foreground">
                  Across {employees.length} employees
                </p>
              </CardContent>
            </Card>
            <Card
              style={{
                background: colors.cardGlass,
                border: `1.5px solid ${colors.cardBorder}`,
                borderRadius: "18px",
                boxShadow: colors.shadow,
                color: colors.text,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  Upcoming Deadlines
                </CardTitle>
                <AlertCircle className="h-5 w-5 text-bluishGreen" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">
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
        </TabsContent>

        {/* Project Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Repeat similar Card structure for project stats */}
            <Card
              style={{
                background: colors.cardGlass,
                border: `1.5px solid ${colors.cardBorder}`,
                borderRadius: "18px",
                boxShadow: colors.shadow,
                color: colors.text,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  Total Projects
                </CardTitle>
                <FileText className="h-5 w-5 text-bluishGreen" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">{projects.length}</div>
                <p className="text-xs text-muted-foreground">
                  {projects.filter((p) => p.status === "completed").length}{" "}
                  completed
                </p>
              </CardContent>
            </Card>
            <Card
              style={{
                background: colors.cardGlass,
                border: `1.5px solid ${colors.cardBorder}`,
                borderRadius: "18px",
                boxShadow: colors.shadow,
                color: colors.text,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  In Progress
                </CardTitle>
                <Clock className="h-5 w-5 text-bluishGreen" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">
                  {projects.filter((p) => p.status === "in-progress").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round(
                    projects
                      .filter((p) => p.status === "in-progress")
                      .reduce((acc, p) => acc + p.progress, 0) /
                      Math.max(
                        1,
                        projects.filter((p) => p.status === "in-progress")
                          .length
                      )
                  )}
                  % avg. progress
                </p>
              </CardContent>
            </Card>
            <Card
              style={{
                background: colors.cardGlass,
                border: `1.5px solid ${colors.cardBorder}`,
                borderRadius: "18px",
                boxShadow: colors.shadow,
                color: colors.text,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  Team Members
                </CardTitle>
                <User className="h-5 w-5 text-bluishGreen" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">4</div>
                <p className="text-xs text-muted-foreground">
                  Across {projects.length} projects
                </p>
              </CardContent>
            </Card>
            <Card
              style={{
                background: colors.cardGlass,
                border: `1.5px solid ${colors.cardBorder}`,
                borderRadius: "18px",
                boxShadow: colors.shadow,
                color: colors.text,
              }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-semibold">
                  Upcoming Deadlines
                </CardTitle>
                <AlertCircle className="h-5 w-5 text-bluishGreen" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">
                  {
                    projects.filter(
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
          {/* Recent Projects */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: colors.text }}
            >
              Recent Projects
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.slice(0, 3).map((project) => (
                <Card
                  key={project.id}
                  style={{
                    background: colors.cardGlass,
                    border: `1.5px solid ${colors.cardBorder}`,
                    borderRadius: "18px",
                    boxShadow: colors.shadow,
                    color: colors.text,
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {project.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          {getStatusBadge(project.status)}
                        </div>
                        {getPriorityBadge(project.priority)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">
                            {project.progress}%
                          </span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* All Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-3 text-center text-lg py-8 text-slate-500">
                Loading projects...
              </div>
            ) : (
              projects.map((project) => (
                <Card
                  key={project.id}
                  style={{
                    background: colors.cardGlass,
                    border: `1.5px solid ${colors.cardBorder}`,
                    borderRadius: "18px",
                    boxShadow: colors.shadow,
                    color: colors.text,
                  }}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{project.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {project.description}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Delete Project
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          {getStatusBadge(project.status)}
                        </div>
                        {getPriorityBadge(project.priority)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
                          <span className="font-medium">
                            {project.progress}%
                          </span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>
                            {new Date(project.deadline).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="text-muted-foreground">
                          {project.completedTasks}/{project.tasks} tasks
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex -space-x-2">
                        {project.assignedTo.map((person, i) => (
                          <Avatar
                            key={i}
                            className="border-2 border-background h-8 w-8"
                            style={{
                              marginLeft: i === 0 ? 0 : -12,
                              boxShadow: colors.shadow,
                            }}
                          >
                            <AvatarImage
                              src={person.avatar || "/placeholder.svg"}
                              alt={person.name}
                            />
                            <AvatarFallback className="text-xs">
                              {person.initials}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
      <div className="space-y-4"></div>
    </div>
  );
}
