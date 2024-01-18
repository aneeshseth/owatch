import express, {Request, Response} from "express";
import cors from "cors";
const app = express();
import {Queue, Worker} from 'bullmq'

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json())


app.post("/initadd", async (req:Request, res: Response) => {
    console.log(req.body)
    const {username, thumbnail} = req.body;
    console.log(username)
    console.log(thumbnail)
    const {data, error} = await supabase.from('videos').insert({username: username, thumbnail: thumbnail, transcoded: []})
    console.log(data)
    console.log(error)
    return res.status(200).json({
        success: true
    })
}) 

app.get('/videos', async (_req: Request, res: Response) => {
    const {data} = await supabase.from('videos').select();
    return res.status(200).json({
        data: data
    })
})


new Worker('url_db', async (job) => {
    console.log("JOB ACTIVATED")
    const jobdata = job.data;
    console.log(jobdata)
    const {data} = await supabase
      .from("videos")
      .select()
      .eq("username", jobdata.username);
    console.log("data ", data);
    let currTranscoded = data![0].transcoded;
    currTranscoded = [...currTranscoded, jobdata.url];
    await supabase
      .from("videos")
      .update({ transcoded: currTranscoded })
      .eq("username", jobdata.username);
},{
    connection: {
        host: process.env.REDIS_HOST!,
        port: 24980,
        username: "default",
        password: process.env.REDIS_PASS!,
    },
    concurrency: 1
})


app.listen(3005, () => {
  console.log("server running.");
});

