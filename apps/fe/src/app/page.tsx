"use client";
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
    <div className="fadeInUp-animation">
      <div className="bg-[url('https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2hpdGUlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D')]">
        <nav className="py-6 flex justify-between items-center px-8 mb-20">
          <div className="text-2xl font-bold">
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
        <div className="flex flex-col items-center justify-center mb-10 text-center space-y-8">
          <h1 className="text-6xl font-bold leading-tight">Organic Watch.</h1>
          <h3 className="text-2xl font-semibold tracking-tight">
            just upload.
            <br />
            and watch.
          </h3>
          <Button
            className="bg-transparent text-white bg-black hover:bg-white hover:text-black"
            onClick={() => {
              router.push("/how");
            }}
          >
            Start Watching
          </Button>
        </div>
        <div className="mb-16">
          <Tiles />
        </div>
      </div>
    </div>
  );
}
