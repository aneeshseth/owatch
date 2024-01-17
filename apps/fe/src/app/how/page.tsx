"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
export default function Build() {
    const router = useRouter()
    let [color, setColor] = useState("#841212");
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1500)
    }, [])
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
        <div className="">
            <div className="flex justify-center items-center gap-5">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-3 mt-2">
            the design:
        </h1>
        <Button onClick={() => {
            router.push('/dashboard')
        }}>go to dashboard</Button>
      </div>
      <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+4.14.35+PM.png"/>
      <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+3.16.16+PM.png"/>
      <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+3.16.54+PM.png"/>
            <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+3.13.01+PM.png"/>
            <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+3.18.11+PM.png"/>
            <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+3.19.11+PM.png"/>
            <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+3.19.21+PM.png"/>
            <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+3.20.43+PM.png"/>
            <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+4.08.13+PM.png"/>
            <img src="https://myawsbucketaneesh.s3.eu-west-3.amazonaws.com/Screen+Shot+2024-01-17+at+4.08.29+PM.png"/>
        </div>
    )
}

