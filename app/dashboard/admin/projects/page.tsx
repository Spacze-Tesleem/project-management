"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Project = {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
  deadline: string;
  teamMembers: Array<{
    name: string;
    avatar?: string;
    initials: string;
  }>;
  tasksTotal: number;
  tasksCompleted: number;
};

export default function Project() {
  const [projects] = useState<Project[]>([
    {
      id: "1",
      name: "Website Redesign",
      description:
        "Complete overhaul of the company website with new branding and improved UX",
      status: "in-progress",
      priority: "high",
      deadline: "2025-06-15",
      teamMembers: [
        { name: "Sophia Taylor", initials: "ST" },
        { name: "James Wilson", initials: "JW" },
        { name: "Emma Davis", initials: "ED" },
      ],
      tasksTotal: 24,
      tasksCompleted: 16,
    },
    {
      id: "2",
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      status: "planning",
      priority: "medium",
      deadline: "2025-08-30",
      teamMembers: [
        { name: "Alex Johnson", initials: "AJ" },
        { name: "Sophia Taylor", initials: "ST" },
      ],
      tasksTotal: 32,
      tasksCompleted: 4,
    },
    {
      id: "3",
      name: "Marketing Campaign Q3",
      description: "Comprehensive marketing strategy for Q3 product launches",
      status: "review",
      priority: "high",
      deadline: "2025-06-01",
      teamMembers: [
        { name: "Emma Davis", initials: "ED" },
        { name: "Michael Brown", initials: "MB" },
      ],
      tasksTotal: 18,
      tasksCompleted: 15,
    },
    {
      id: "4",
      name: "Database Migration",
      description: "Migration to cloud-based database infrastructure",
      status: "completed",
      priority: "medium",
      deadline: "2025-05-15",
      teamMembers: [
        { name: "James Wilson", initials: "JW" },
        { name: "Alex Johnson", initials: "AJ" },
      ],
      tasksTotal: 12,
      tasksCompleted: 12,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" || project.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      planning: { label: "Planning", variant: "secondary" as const },
      "in-progress": { label: "In Progress", variant: "default" as const },
      review: { label: "Review", variant: "outline" as const },
      completed: { label: "Completed", variant: "secondary" as const },
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: {
        label: "Low",
        className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      },
      medium: {
        label: "Medium",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      },
      high: {
        label: "High",
        className: "bg-red-100 text-red-800 hover:bg-red-100",
      },
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              Manage and oversee all company projects
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          {/* <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select> */}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>Manage Team</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Archive Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Status and Priority */}
                <div className="flex items-center justify-between">
                  {getStatusBadge(project.status)}
                  {getPriorityBadge(project.priority)}
                </div>

                {/* Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      {Math.round(
                        (project.tasksCompleted / project.tasksTotal) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{
                        width: `${
                          (project.tasksCompleted / project.tasksTotal) * 100
                        }%`,
                      }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {project.tasksCompleted} of {project.tasksTotal} tasks
                    completed
                  </div>
                </div>

                {/* Deadline */}
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>
                    Due{" "}
                    {new Date(project.deadline).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Team Members */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Team</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.teamMembers.slice(0, 3).map((member, index) => (
                      <Avatar
                        key={index}
                        className="border-2 border-background h-8 w-8"
                      >
                        <AvatarImage
                          src={member.avatar || "/placeholder.svg"}
                          alt={member.name}
                        />
                        <AvatarFallback className="text-xs">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted border-2 border-background text-xs font-medium">
                        +{project.teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No projects found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
