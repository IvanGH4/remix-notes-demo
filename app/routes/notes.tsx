import { useLoaderData, Outlet } from "remix";
import type { LoaderFunction } from "remix";
import { Note } from "~/types";
import NoteCard from "~/components/NoteCard";
import { Container } from "@mui/material";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("search");

  const api_url: string = process.env.API_URL;
  const response = await fetch(api_url + "/notes");
  const notes = await response.json();

  if(searchParam) {
    return notes.filter((note: Note) => note.title.toLowerCase().includes(searchParam.toLowerCase()));
  }
  return notes;
};

export default function Notes() {
  const notes: Note[] = useLoaderData();

  return (
    <>
      <Outlet />
      <Container maxWidth='sm'>
        {notes && notes.map((note) => <NoteCard key={note._id} note={note} />)}
      </Container>
    </>
  );
}
