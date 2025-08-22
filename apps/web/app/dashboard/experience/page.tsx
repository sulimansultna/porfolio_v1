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

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    responsibilities: '',
  });
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/experience');
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch experiences.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching experiences:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching experiences.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newExperience,
          responsibilities: newExperience.responsibilities.split('\n').map(r => r.trim()).filter(r => r.length > 0),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Experience added successfully.",
        });
        setNewExperience({ title: '', company: '', startDate: '', endDate: '', description: '', responsibilities: '' });
        fetchExperiences();
      } else {
        toast({
          title: "Error",
          description: "Failed to add experience.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding experience:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding experience.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/experience/${editingExperience.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingExperience.title,
          company: editingExperience.company,
          startDate: editingExperience.startDate,
          endDate: editingExperience.endDate,
          description: editingExperience.description,
          responsibilities: editingExperience.responsibilities,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Experience updated successfully.",
        });
        setEditingExperience(null);
        fetchExperiences();
      } else {
        toast({
          title: "Error",
          description: "Failed to update experience.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating experience:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating experience.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteExperience = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/experience/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Experience deleted successfully.",
        });
        fetchExperiences();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete experience.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting experience.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Experience Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddExperience} className="space-y-4">
            <div>
              <Label htmlFor="new-title">Job Title</Label>
              <Input
                id="new-title"
                value={newExperience.title}
                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="new-company">Company</Label>
              <Input
                id="new-company"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="new-startDate">Start Date</Label>
              <Input
                id="new-startDate"
                type="date"
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="new-endDate">End Date (or Present)</Label>
              <Input
                id="new-endDate"
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
                placeholder="YYYY-MM-DD or Present"
              />
            </div>
            <div>
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                value={newExperience.description}
                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                required
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="new-responsibilities">Responsibilities (one per line)</Label>
              <Textarea
                id="new-responsibilities"
                value={newExperience.responsibilities}
                onChange={(e) => setNewExperience({ ...newExperience, responsibilities: e.target.value })}
                placeholder="- Developed mobile apps\n- Integrated Firebase services"
                rows={5}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Experience'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Experiences</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading experiences...</p>
          ) : experiences.length === 0 ? (
            <p>No experiences found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Job Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {experiences.map((exp) => (
                  <TableRow key={exp.id}>
                    <TableCell className="font-medium">{exp.title}</TableCell>
                    <TableCell>{exp.company}</TableCell>
                    <TableCell>{exp.startDate} - {exp.endDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingExperience(exp)}>
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Edit Experience</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditExperience} className="space-y-4 py-4">
                              <div>
                                <Label htmlFor="edit-title">Job Title</Label>
                                <Input
                                  id="edit-title"
                                  value={editingExperience?.title || ''}
                                  onChange={(e) => setEditingExperience({ ...editingExperience!, title: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-company">Company</Label>
                                <Input
                                  id="edit-company"
                                  value={editingExperience?.company || ''}
                                  onChange={(e) => setEditingExperience({ ...editingExperience!, company: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-startDate">Start Date</Label>
                                <Input
                                  id="edit-startDate"
                                  type="date"
                                  value={editingExperience?.startDate || ''}
                                  onChange={(e) => setEditingExperience({ ...editingExperience!, startDate: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-endDate">End Date (or Present)</Label>
                                <Input
                                  id="edit-endDate"
                                  value={editingExperience?.endDate || ''}
                                  onChange={(e) => setEditingExperience({ ...editingExperience!, endDate: e.target.value })}
                                  placeholder="YYYY-MM-DD or Present"
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingExperience?.description || ''}
                                  onChange={(e) => setEditingExperience({ ...editingExperience!, description: e.target.value })}
                                  required
                                  rows={3}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-responsibilities">Responsibilities (one per line)</Label>
                                <Textarea
                                  id="edit-responsibilities"
                                  value={editingExperience?.responsibilities.join('\n') || ''}
                                  onChange={(e) => setEditingExperience({ ...editingExperience!, responsibilities: e.target.value.split('\n').map(r => r.trim()).filter(r => r.length > 0) })}
                                  placeholder="- Developed mobile apps\n- Integrated Firebase services"
                                  rows={5}
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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteExperience(exp.id)} disabled={loading}>
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