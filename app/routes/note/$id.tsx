import { Form, Link, redirect, useLoaderData } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import axios from "axios";
import { marked } from "marked";
import Note from '~/components/SingleNote';
import { Container } from "@mui/material";

export const action: ActionFunction = async ({ request, params }) => {
  const api_url: string = process.env.API_URL;
  try {
    const method = (await request.formData()).get("_method");

    if (method === "delete") {
      await axios.delete(`${api_url}/notes/${params.id}`);
    }
    return redirect("/notes");
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};

export const loader: LoaderFunction = async ({ params }) => {
  const api_url: string = process.env.API_URL;

  try {
    const note = await axios(api_url + "/notes/" + params.id);
    const MDcontent = marked(note.data.content);
    return {
      title: note.data.title,
      content: MDcontent,
      important: note.data.important,
    };
  } catch (error) {
    return { error: true };
  }
};

export default function SingleNote() {
  const data = useLoaderData();

  if (data.error) return <p>Error fetching note</p>;

  return (
    <Container maxWidth="sm">
      <Note note={data} />
    </Container>
  );
}
