import { NextRequest } from "next/server";
import { connectToDatabase } from "../../../../mongodb/mongodb"
import Item from "../../../../models/model";

export async function POST(req: NextRequest) {
    try {
      await connectToDatabase();
  
      const { title, description } = await req.json(); 
  
      const newItem = await Item.create({ title, description });
  
      return new Response(JSON.stringify(newItem), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Server Error:", error);
      return new Response(JSON.stringify({ message: "Internal server error" }), {
        status: 500,
      });
    }
  }
