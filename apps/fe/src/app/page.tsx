"use client"
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import Tiles from "@/components/ui/Tiles";
import "./page.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container w-screen fadeInUp-animation">
      <div className="content">
        <nav className="py-6 flex justify-between items-center px-8 mb-20">
          <div className="text-2xl font-bold absolute left-4 top-10">
            <img
              src="https://freelogopng.com/images/all_img/1658586823instagram-logo-transparent.png"
              className="w-14"
            />
          </div>
          <Link
            href="https://github.com/aneeshseth/owatch"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute right-4 top-4 md:right-8 md:top-8"
            )}
          >
            <img src="https://favicon.twenty.com/github.com" className="h-12" />
          </Link>
        </nav>
        <div className="flex flex-col items-center justify-center h-full mb-10 text-center space-y-8">
          <h1 className="text-6xl font-bold leading-tight">Organic Watch.</h1>
          <h3 className="text-2xl font-semibold tracking-tight">
            just upload.
            <br />
            and watch.
          </h3>
          <Button
            className="bg-transparent text-white bg-black hover:bg-white hover:text-black"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Start Watching
          </Button>
        </div>
      </div>
      <div className="bottom-0">
        <Tiles />
      </div>
    </div>
  );
}
