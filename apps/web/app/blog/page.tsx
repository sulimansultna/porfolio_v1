"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const blogPostsCollection = collection(db, "blogPosts");
        const blogPostsSnapshot = await getDocs(query(blogPostsCollection, orderBy("createdAt", "desc")));
        const blogPostsData = blogPostsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as BlogPost[];
        setBlogPosts(blogPostsData);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>

          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">Thoughts on mobile development, IoT, and technology</p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading blog posts...</p>
        ) : blogPosts.length === 0 ? (
          <p className="text-center text-muted-foreground">No blog posts found.</p>
        ) : (
          <div className="space-y-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    {/* Assuming readTime is not stored in Firestore, or calculate it dynamically */}
                    {/* <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div> */}
                  </div>

                  <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                    {post.title}
                  </CardTitle>

                  <CardDescription className="text-base leading-relaxed">{post.content.substring(0, 150)}...</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags && post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="outline" asChild>
                    <Link href={`/blog/${post.id}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            More posts coming soon! Connect with me on{" "}
            <a
              href="https://www.linkedin.com/in/suliman-sultan-a8873a2a4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>{" "}
            or{" "}
            <a
              href="https://github.com/sulimansultna"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub
            </a>{" "}
            for updates.
          </p>
        </div>
      </div>
    </div>
  )
}
