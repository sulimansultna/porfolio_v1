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

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogManagement() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 'Admin',
    tags: '',
  });
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/blog');
      if (response.ok) {
        const data = await response.json();
        setBlogPosts(data);
      } else {
        toast({
          title: "Error",
          description: "Failed to fetch blog posts.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while fetching blog posts.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newPost,
          tags: newPost.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post added successfully.",
        });
        setNewPost({ title: '', content: '', author: 'Admin', tags: '' });
        fetchBlogPosts();
      } else {
        toast({
          title: "Error",
          description: "Failed to add blog post.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding blog post:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding blog post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${editingPost.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: editingPost.title,
          content: editingPost.content,
          author: editingPost.author,
          tags: editingPost.tags,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post updated successfully.",
        });
        setEditingPost(null);
        fetchBlogPosts();
      } else {
        toast({
          title: "Error",
          description: "Failed to update blog post.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while updating blog post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Blog post deleted successfully.",
        });
        fetchBlogPosts();
      } else {
        toast({
          title: "Error",
          description: "Failed to delete blog post.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while deleting blog post.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blog Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddPost} className="space-y-4">
            <div>
              <Label htmlFor="new-title">Title</Label>
              <Input
                id="new-title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="new-content">Content</Label>
              <Textarea
                id="new-content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="new-tags">Tags (comma-separated)</Label>
              <Input
                id="new-tags"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                placeholder="e.g., Flutter, IoT, Firebase"
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Post'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading blog posts...</p>
          ) : blogPosts.length === 0 ? (
            <p>No blog posts found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag, idx) => (
                          <Badge key={idx} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Edit Blog Post</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleEditPost} className="space-y-4 py-4">
                              <div>
                                <Label htmlFor="edit-title">Title</Label>
                                <Input
                                  id="edit-title"
                                  value={editingPost?.title || ''}
                                  onChange={(e) => setEditingPost({ ...editingPost!, title: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-content">Content</Label>
                                <Textarea
                                  id="edit-content"
                                  value={editingPost?.content || ''}
                                  onChange={(e) => setEditingPost({ ...editingPost!, content: e.target.value })}
                                  required
                                  rows={8}
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-author">Author</Label>
                                <Input
                                  id="edit-author"
                                  value={editingPost?.author || ''}
                                  onChange={(e) => setEditingPost({ ...editingPost!, author: e.target.value })}
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="edit-tags">Tags (comma-separated)</Label>
                                <Input
                                  id="edit-tags"
                                  value={editingPost?.tags.join(', ') || ''}
                                  onChange={(e) => setEditingPost({ ...editingPost!, tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) })}
                                  placeholder="e.g., Flutter, IoT, Firebase"
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
                        <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post.id)} disabled={loading}>
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
