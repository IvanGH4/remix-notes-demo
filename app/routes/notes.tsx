import { useLoaderData, Link, Outlet } from "remix";
import type { LoaderFunction } from "remix";
import { Note } from "~/types";
import NoteCard from "~/components/NoteCard";

export const loader: LoaderFunction = async () => {
  const api_url: string = process.env.API_URL;
  const response = await fetch(api_url + "/notes");
  return response.json();
};

export default function Notes() {
  const notes: Note[] = useLoaderData();

  return (
    <>
      <h1>Notes</h1>
      <Link to='new'>Add new note</Link>
      <Outlet />
      <div className='notes'>
        {notes && notes.map((note) => <NoteCard key={note._id} note={note} />)}
      </div>
    </>
  );
}
