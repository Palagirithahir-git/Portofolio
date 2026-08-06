import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);


export async function POST(req: Request) {
  try {

    const formData = await req.formData();

    const file = formData.get("file") as File;


    if (!file) {
      return NextResponse.json(
        {
          error: "No file uploaded",
        },
        {
          status: 400,
        }
      );
    }


    const fileName = `${Date.now()}-${file.name}`;


    const { error } = await supabase.storage
      .from("projects")
      .upload(fileName, file, {
        upsert: true,
      });


    if (error) {
      console.error("Upload Error:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        {
          status: 500,
        }
      );
    }


    const { data } = supabase.storage
      .from("projects")
      .getPublicUrl(fileName);


    return NextResponse.json({
      url: data.publicUrl,
    });


  } catch (error) {

    console.error("Upload Error:", error);


    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}