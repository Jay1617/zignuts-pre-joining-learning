import { commentsData } from "./data";

export async function GET() {
  return Response.json(commentsData);
}

export async function POST(request: Request){
    const comment = await request.json();

    const newComment : {id:number, text:string} = {
        id : commentsData.length + 1,
        text: comment.text
    };

    // commentsData.push(newComment);

    return new Response(JSON.stringify(newComment), {
        headers : {"Content-Type" : "application/json"},
        status: 201
    })
}
