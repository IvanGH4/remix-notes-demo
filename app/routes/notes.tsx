import { useLoaderData, Link, Outlet } from "remix";
import type { LoaderFunction } from "remix";
import { Note } from "~/types";
import NoteCard from "~/components/NoteCard";
import Navbar from "~/components/Nav/Navbar";
import { Container } from "@mui/material";

export const loader: LoaderFunction = async () => {
  const api_url: string = process.env.API_URL;
  const response = await fetch(api_url + "/notes");
  return response.json();
};

export default function Notes() {
  const notes: Note[] = useLoaderData();

  return (
    <>
      <Navbar />
      <Outlet />
      <Container maxWidth='sm'>
        {notes && notes.map((note) => <NoteCard key={note._id} note={note} />)}
      </Container>
    </>
  );
}
