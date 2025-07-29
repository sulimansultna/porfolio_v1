"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function Blog() {
  const blogPosts = [
    {
      title: "Building Scalable IoT Applications with Flutter",
      excerpt:
        "Learn how to create robust IoT applications that can handle thousands of connected devices using Flutter and Firebase.",
      date: "2024-01-15",
      readTime: "8 min read",
      tags: ["Flutter", "IoT", "Firebase"],
      slug: "building-scalable-iot-applications",
    },
    {
      title: "Firebase Real-time Database vs Firestore: Which to Choose?",
      excerpt:
        "A comprehensive comparison of Firebase's database solutions and when to use each one in your mobile applications.",
      date: "2024-01-08",
      readTime: "6 min read",
      tags: ["Firebase", "Database", "Mobile"],
      slug: "firebase-database-comparison",
    },
    {
      title: "Dart 3.0: New Features Every Flutter Developer Should Know",
      excerpt: "Explore the latest features in Dart 3.0 and how they can improve your Flutter development workflow.",
      date: "2024-01-01",
      readTime: "10 min read",
      tags: ["Dart", "Flutter", "Programming"],
      slug: "dart-3-new-features",
    },
  ]

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

        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>

                <CardTitle className="text-2xl hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>

                <CardDescription className="text-base leading-relaxed">{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="outline">Read More</Button>
              </CardContent>
            </Card>
          ))}
        </div>

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
