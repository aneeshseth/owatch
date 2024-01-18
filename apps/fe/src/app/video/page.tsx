"use client"
import React, { useEffect, useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { vidCurrentState } from '../state/state';
import './page.css'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Button
} from '@/components/ui/button';
import { videoQuality } from '../state/state';
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"

function Video() {
  const current = useRecoilValue(vidCurrentState);
  const { toast } = useToast()
  const [vid, setVid] = useRecoilState(videoQuality);
  const router = useRouter();
  const currentVideoPlay = useRecoilValue(videoQuality);
  const videoRef = useRef(null);

  const handleQualityChange = (quality: string) => {
    return () => {
      const newVideo = current.transcoded.find((src: string) => src.includes(quality));
      console.log("New Video URL:", newVideo);
      //@ts-ignore
      const currentTime = videoRef.current.currentTime
      setVid(newVideo!);
      alert(`Video quality changing to ${quality}p!`)
      loadNewSource(newVideo!, currentTime, quality);
    };
  };

  const loadNewSource = (newVid: string, time: any, quality: string) => {
    const videoElement = videoRef.current;
    //@ts-ignore
    videoElement.src = newVid;
    //@ts-ignore
    console.log(videoElement.src)
    //@ts-ignore
    videoElement.currentTime = time;
    //@ts-ignore
    videoElement.load();
  };

  useEffect(() => {
    if (current.transcoded.length === 0) {
      router.push("/dashboard");
    }
    setVid(current.transcoded[0]);
  }, []);

  return (
    <div className="h-screen w-screen bg-[url('https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D')] flex items-center justify-center">
      <div>
        <div className="ml-5 mr-5">
          <DropdownMenu>
            <DropdownMenuTrigger className='py-1 px-2 rounded-md border-2 border-fuchsia-200'>Quality?</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuSeparator />
                <div className='flex gap-2 flex-row'>
                <Button onClick={handleQualityChange('1080')} className='hover:bg-white'>
                  <DropdownMenuItem>1080p</DropdownMenuItem>
                </Button>
                <Button onClick={handleQualityChange('720')} className='hover:bg-white'>
                  <DropdownMenuItem>720p</DropdownMenuItem>
                </Button>
                <Button onClick={handleQualityChange('480')} className='hover:bg-white'>
                  <DropdownMenuItem>480p</DropdownMenuItem>
                </Button>
                <Button onClick={handleQualityChange('360')} className='hover:bg-white'>
                  <DropdownMenuItem>360p</DropdownMenuItem>
                </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
        <div className="mx-auto mt-4 max-w-[650px] video-div-sm">
            <video ref={videoRef} controls className="max-w-full max-h-full border-4 border-emerald-600" autoPlay>
                <source key={currentVideoPlay} src={currentVideoPlay} type='video/mp4' />
            </video>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
