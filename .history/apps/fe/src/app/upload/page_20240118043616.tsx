"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import "../page.css";
import AWS from "aws-sdk";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client, S3 } from "@aws-sdk/client-s3";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation";

import axios from 'axios'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChangeEvent, ChangeEventHandler, useState } from "react";

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: "",
  secretAccessKey: "",
});

const s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: { Bucket: "final-pt2" },
});

export default function CardDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>("");
  const router = useRouter()
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { toast } = useToast()
  const uploadFile = async () => {
    if (!file || !thumbnail || username == "" || file.type != 'video/mp4' || (thumbnail.type != 'image/png' && thumbnail.type != 'image/jpeg' && thumbnail.type != 'image/jpg')) {
      toast({
        variant: "default",
        title: "please select a thumbnail in PNG and video in MP4/enter a username.",
      })
      return;
    }
    toast({
      variant: "default",
      title: "uploading your video.",
      description: "please wait for transcoding's starting confirmation."
    })
    const keyToSend = username.replace(/\s/g, "")
    console.log(keyToSend)
    try {

      const creds = {
        accessKeyId: "",
        secretAccessKey: "",
      };

      await axios.post('ec2-184-72-72-50.compute-1.amazonaws.com:3005/initadd', {
        username: keyToSend,
        thumbnail: `https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/${keyToSend}.png`
      })

      try {
        const params = {
          Key: `${keyToSend}.mp4`,
          Body: file,
          Bucket: 'final-pt2',
        };
  
        await s3.upload(params, (err: any, data: any) => {
          if (err) {
            console.error('Error uploading file:', err);
          } else {
            console.log('File uploaded successfully:', data.Location);
          }
        });
      } catch (err) {
        console.log(err)
      }
      console.log("/////")
      const thumbnailTarget = {
        Bucket: "myawsbucketaneesh",
        Key: `${keyToSend}.png`,
        Body: thumbnail,
      };
      const parallelUploadS3 = new Upload({
        client: new S3Client({ region: "eu-west-3", credentials: creds }),
        leavePartsOnError: false,
        params: thumbnailTarget
      });
      parallelUploadS3.on("httpUploadProgress", (progress) => {
        console.log(progress);
      });
      await parallelUploadS3.done();
      console.log('rfwc')
      toast({
        variant: "default",
        title: "video transcoding & processing has started on ECS Containers, please check back later!",
        description: "Thanks for uploading!"
      })
      router.push('/dashboard')
    } catch (error) {
      alert("Error uploading file");
      console.log(error);
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    setFile(selectedFile);
  };
  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    setThumbnail(selectedFile);
  };
  return (
    <div className="flex justify-center items-center h-screen my-4 mx-4 bg-[url('https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D')] fadeInUp-animation">
      <Card className={cn("w-[380px]")}>
        <CardHeader>
          <CardTitle className="mb-1">Upload</CardTitle>
          <CardDescription>
            Fill in the Details to upload a video.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <Input
              placeholder="enter a random username"
              className="mb-4"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <CardDescription className="mb-2">Choose the Video</CardDescription>
            <Input
              onChange={handleFileChange}
              placeholder="a random username"
              type="file"
              className="mb-5"
            />
            <CardDescription className="mb-2">
              Choose the Thumbnail
            </CardDescription>
            <Input
              onChange={handleThumbnailChange}
              type="file"
              className="mb-5"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={uploadFile}>
            <CheckIcon className="mr-2 h-4 w-4" /> Upload
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
