import { commentsData } from "../data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const comment = commentsData.find((comment) => comment.id === parseInt(id));

  return Response.json(comment);
}
