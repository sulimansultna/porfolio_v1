import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: string;
}

export default function BlogPostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        try {
          const docRef = doc(db, "blogPosts", id as string);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setPost({ id: docSnap.id, ...docSnap.data() } as BlogPost);
          } else {
            setError("Blog post not found.");
          }
        } catch (err) {
          console.error("Error fetching blog post:", err);
          setError("Failed to load blog post.");
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading blog post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No blog post to display.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/blog">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl mb-2">{post.title}</CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span>• By {post.author}</span>
            </CardDescription>
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags && post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>{post.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
