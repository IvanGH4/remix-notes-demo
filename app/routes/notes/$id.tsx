import { Form, Link, redirect, useLoaderData } from 'remix'
import type { ActionFunction, LoaderFunction } from "remix";
import axios from "axios";
import moment from 'moment';

export const action: ActionFunction = async ({ request, params }) => {
  const api_url: string = process.env.API_URL;
  try {
    const method = (await request.formData()).get("_method");

    if (method === "delete") {
      await axios.delete(`${api_url}/notes/${params.id}`);
    }
    return redirect('/notes');
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
    const note = await axios(api_url + '/notes/' + params.id);
    return note.data;
  } catch (error) {
    return {error: true};
  }
}

export default function SingleNote() {
  const data = useLoaderData();

  if (data.error) return <p>Error fetching note</p>

  return (
    <div>
      <Link to='/notes'>Back</Link>
      <h2>{data.title}</h2>
      <small>{moment(data.createdAt).format('MMM DD, YYYY')}</small>
      <p>{data.content}</p>
      <Form method='post'>
        <input type="hidden" name="_method" value="delete" />
        <button type="submit">Delete</button>
      </Form>
    </div>
  )
}
