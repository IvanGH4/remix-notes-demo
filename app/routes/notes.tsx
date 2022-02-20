import { useLoaderData, Link, Outlet } from "remix";
import type { LoaderFunction } from "remix";

interface Note {
  _id: string;
  title: string;
  content: string;
  important: boolean;
  createdAt: string;
  updatedAt: string;
}

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
        {notes &&
          notes.map((note) => (
            <div
              key={note._id}
              className={`note ${note.important ? "important" : ""}`}
            >
              <Link to={note._id}>
                <h2>{note.title}</h2>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
