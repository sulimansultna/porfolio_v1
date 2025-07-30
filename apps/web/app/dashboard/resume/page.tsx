import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (selectedFile.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Only PDF files are allowed.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const response = await fetch('/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResumeUrl(data.url);
        toast({
          title: "Success",
          description: "Resume uploaded successfully!",
        });
        setSelectedFile(null);
      } else {
        const errorData = await response.json();
        toast({
          title: "Upload Failed",
          description: errorData.message || "Failed to upload resume.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred during upload.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Resume Management</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload New Resume (PDF)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <Label htmlFor="resume-file">Select PDF File</Label>
              <Input
                id="resume-file"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
            </div>
            <Button type="submit" disabled={loading || !selectedFile}>
              {loading ? 'Uploading...' : 'Upload Resume'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {resumeUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Current Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your resume has been uploaded. You can access it here:</p>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Uploaded Resume
            </a>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
