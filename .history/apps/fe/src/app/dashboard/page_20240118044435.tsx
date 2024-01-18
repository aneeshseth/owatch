"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import "../page.css";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useRecoilState } from "recoil";
import { vidState } from "../state/state";
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
interface VideoType {
  id: number, 
  username: string, 
  thumbnail: string,
  transcoded: string[]
}
export default function Component() {
  const [videos, setVideos] = useState<VideoType[]>([])
  const [loading, setLoading] = useState(true)
  let [color, setColor] = useState("#841212");
  const [video, setVideo] = useRecoilState(vidState);
  async function fetchData() {
    const res = await axios.get('http://ec2-184-72-72-50.compute-1.amazonaws.com:3005/videos')
    const data = await res.data;
    setVideos(data.data)
    setLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const router = useRouter();
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D')]">
      <ClipLoader
      color={color}
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>
    )
  }
  return (
    <div className="flex flex-col h-screen fadeInUp-animation bg-[url('https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D')]">
      <header className="flex items-center justify-between px-4 py-2">
        <img
          src="https://freelogopng.com/images/all_img/1658586823instagram-logo-transparent.png"
          style={{
            objectFit: "cover",
          }}
          className="w-11"
          onClick={() => [
            router.push("/")
          ]}
        />
        <Button
          onClick={() => {
            router.push("/upload");
          }}
        >
          Upload (+)
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 p-4 overflow-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {videos.map((video: VideoType) => (
      video.transcoded.length == 4 && (
        <div
          key={video.id}
          className=" p-4 hover:cursor-pointer transform transition-all duration-200 hover:scale-105"
          onClick={() => {
            //@ts-ignore
            setVideo(video);
            router.push('/video');
          }}
        >
          <img
            alt="Video thumbnail"
            className="w-full h-72 object-cover mb-2 rounded-xl"
            height="200"
            src={video.thumbnail}
            style={{
              aspectRatio: "350/200",
              objectFit: "cover",
            }}
            width="350"
          />
        </div>
      )
    ))}
  </div>
</main>

      </div>
    </div>
  );
}
