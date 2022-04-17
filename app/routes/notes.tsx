import { useSearchParams } from 'remix';
import { useLoaderData, Outlet } from "remix";
import type { LoaderFunction } from "remix";
import { Note } from "~/types";
import NoteCard from "~/components/NoteCard";
import { Button, Container } from "@mui/material";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchParam = url.searchParams.get("search");

  const api_url: string = process.env.API_URL;
  const response = await fetch(api_url + "/notes");
  const notes = await response.json();

  if (searchParam) {
    return notes.filter((note: Note) =>
      note.title.toLowerCase().includes(searchParam.toLowerCase())
    );
  }
  return notes;
};

export default function Notes() {
  const notes: Note[] = useLoaderData();
  const [_, setSearchParams] = useSearchParams()

  const handleClearFilters = () => {
    setSearchParams({ search: '' });
  }

  return (
    <>
      <Outlet />
      <Container maxWidth='sm'>
        {!notes?.length && (
          <div>
            <p>No notes found</p>
            <Button variant='text' color='error' onClick={handleClearFilters}>
              Clear filters
            </Button>
          </div>
        )}
        {notes && notes.map((note) => <NoteCard key={note._id} note={note} />)}
      </Container>
    </>
  );
}
