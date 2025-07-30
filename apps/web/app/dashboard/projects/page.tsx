import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectManagement() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    tech: '',
    github: '',
    demo: '',
  });
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch projects.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching projects.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProject,
          tech: newProject.tech.split(',').map(t => t.trim()).filter(t => t.length > 0),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project added successfully.",
        });
        setNewProject({ title: '', description: '', image: '', tech: '', github: '', demo: '' });
        fetchProjects();
      } else {
        toast({
          title: "Error",
          description: "Failed to add project.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding project.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${editingProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingProject.title,
          description: editingProject.description,
          image: editingProject.image,
          tech: editingProject.tech,
          github: editingProject.github,
          demo: editingProject.demo,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project updated successfully.",
        });
        setEditingProject(null);
        fetchProjects();
      } else {
        toast({
          title: "Error",
          description: "Failed to update project.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating project.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Project deleted successfully.",
        });
        fetchProjects();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete project.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting project.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Project Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddProject} className="space-y-4">
            <div>
              <Label htmlFor="new-title">Title</Label>
              <Input
                id="new-title"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                required
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="new-image">Image URL</Label>
              <Input
                id="new-image"
                value={newProject.image}
                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                placeholder="/images/your-project.png"
              />
            </div>
            <div>
              <Label htmlFor="new-tech">Technologies (comma-separated)</Label>
              <Input
                id="new-tech"
                value={newProject.tech}
                onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                placeholder="e.g., Flutter, Firebase, IoT"
              />
            </div>
            <div>
              <Label htmlFor="new-github">GitHub URL</Label>
              <Input
                id="new-github"
                value={newProject.github}
                onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                placeholder="https://github.com/your-repo"
              />
            </div>
            <div>
              <Label htmlFor="new-demo">Demo URL</Label>
              <Input
                id="new-demo"
                value={newProject.demo}
                onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
                placeholder="https://your-demo.com"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Project'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Tech</TableHead>
                  <TableHead>GitHub</TableHead>
                  <TableHead>Demo</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.tech.map((t, idx) => (
                          <Badge key={idx} variant="secondary">{t}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Link
                      </a>
                    </TableCell>
                    <TableCell>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Link
                      </a>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingProject(project)}>
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Edit Project</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditProject} className="space-y-4 py-4">
                              <div>
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                  id="edit-title"
                                  value={editingProject?.title || ''}
                                  onChange={(e) => setEditingProject({ ...editingProject!, title: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingProject?.description || ''}
                                  onChange={(e) => setEditingProject({ ...editingProject!, description: e.target.value })}
                                  required
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-image">Image URL</Label>
                                <Input
                                  id="edit-image"
                                  value={editingProject?.image || ''}
                                  onChange={(e) => setEditingProject({ ...editingProject!, image: e.target.value })}
                                  placeholder="/images/your-project.png"
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-tech">Technologies (comma-separated)</Label>
                                <Input
                                  id="edit-tech"
                                  value={editingProject?.tech.join(', ') || ''}
                                  onChange={(e) => setEditingProject({ ...editingProject!, tech: e.target.value.split(',').map(t => t.trim()).filter(t => t.length > 0) })}
                                  placeholder="e.g., Flutter, Firebase, IoT"
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-github">GitHub URL</Label>
                                <Input
                                  id="edit-github"
                                  value={editingProject?.github || ''}
                                  onChange={(e) => setEditingProject({ ...editingProject!, github: e.target.value })}
                                  placeholder="https://github.com/your-repo"
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-demo">Demo URL</Label>
                                <Input
                                  id="edit-demo"
                                  value={editingProject?.demo || ''}
                                  onChange={(e) => setEditingProject({ ...editingProject!, demo: e.target.value })}
                                  placeholder="https://your-demo.com"
                                />
                              </div>
                              <DialogFooter>
                                <Button type="submit" disabled={loading}>
                                  {loading ? 'Saving...' : 'Save Changes'}
                                </Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project.id)} disabled={loading}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
