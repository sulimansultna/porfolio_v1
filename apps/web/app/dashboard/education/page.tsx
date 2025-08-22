import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

interface Education {
  id: string;
  degree: string;
  institution: string;
  year: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export default function EducationManagement() {
  const [educationEntries, setEducationEntries] = useState<Education[]>([]);
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    description: '',
  });
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEducationEntries();
  }, []);

  const fetchEducationEntries = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/education');
      if (response.ok) {
        const data = await response.json();
        setEducationEntries(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch education entries.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching education entries:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching education entries.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/education', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEducation),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Education entry added successfully.",
        });
        setNewEducation({ degree: '', institution: '', year: '', description: '' });
        fetchEducationEntries();
      } else {
        toast({
          title: "Error",
          description: "Failed to add education entry.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding education entry:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding education entry.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/education/${editingEducation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingEducation),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Education entry updated successfully.",
        });
        setEditingEducation(null);
        fetchEducationEntries();
      } else {
        toast({
          title: "Error",
          description: "Failed to update education entry.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating education entry:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating education entry.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEducation = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/education/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Education entry deleted successfully.",
        });
        fetchEducationEntries();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete education entry.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting education entry:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting education entry.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Education Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Education Entry</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddEducation} className="space-y-4">
            <div>
              <Label htmlFor="new-degree">Degree</Label>
              <Input
                id="new-degree"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="new-institution">Institution</Label>
              <Input
                id="new-institution"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="new-year">Year</Label>
              <Input
                id="new-year"
                type="number"
                value={newEducation.year}
                onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="new-description">Description</Label>
              <Textarea
                id="new-description"
                value={newEducation.description}
                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                required
                rows={3}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Education'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Education Entries</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading education entries...</p>
          ) : educationEntries.length === 0 ? (
            <p>No education entries found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Degree</TableHead>
                  <TableHead>Institution</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {educationEntries.map((edu) => (
                  <TableRow key={edu.id}>
                    <TableCell className="font-medium">{edu.degree}</TableCell>
                    <TableCell>{edu.institution}</TableCell>
                    <TableCell>{edu.year}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingEducation(edu)}>
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Edit Education Entry</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditEducation} className="space-y-4 py-4">
                              <div>
                                <Label htmlFor="edit-degree">Degree</Label>
                                <Input
                                  id="edit-degree"
                                  value={editingEducation?.degree || ''}
                                  onChange={(e) => setEditingEducation({ ...editingEducation!, degree: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-institution">Institution</Label>
                                <Input
                                  id="edit-institution"
                                  value={editingEducation?.institution || ''}
                                  onChange={(e) => setEditingEducation({ ...editingEducation!, institution: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-year">Year</Label>
                                <Input
                                  id="edit-year"
                                  type="number"
                                  value={editingEducation?.year || ''}
                                  onChange={(e) => setEditingEducation({ ...editingEducation!, year: e.target.value as any })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-description">Description</Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingEducation?.description || ''}
                                  onChange={(e) => setEditingEducation({ ...editingEducation!, description: e.target.value })}
                                  required
                                  rows={3}
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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteEducation(edu.id)} disabled={loading}>
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
