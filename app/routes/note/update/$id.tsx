import { Form, Link, redirect, useActionData, useLoaderData, useNavigate, useTransition } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";
import axios from "axios";

export const action: ActionFunction = async ({ request, params }) => {
  const api_url: string = process.env.API_URL;
  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const important = formData.get("important");

    await axios.put(api_url + `/notes/${params.id}`, {
      title,
      content,
      important,
    });
    return redirect('/notes');
  } catch (error) {
    console.log('Put error', error);
    return { error: true };
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const api_url: string = process.env.API_URL;
  try {
    const response = await axios(api_url + `/notes/${params.id}`);
    return response.data;
  } catch (error) {
    console.log('Get data error', error);
    return { error: true };
  }
}

export default function UpdateNote() {
  const data = useLoaderData();
  const actionData = useActionData();
  const transition = useTransition();
  const navigate = useNavigate();

  return (
    <div className='add_note-form'>
      <div className='add_note-form_header'>
        <h2>New note</h2>
        <button onClick={() => navigate(-1)}>Back</button>
      </div>
      <Form method='post' action={`/note/update/${data._id}`}>
        <div className='form-control'>
          <label htmlFor='title'>Title</label>
          <input id='title' name='title' type='text' defaultValue={data.title} />
        </div>
        <div className='form-control'>
          <label htmlFor='content'>Content</label>
          <textarea id='content' name='content' rows={4} defaultValue={data.content} />
        </div>
        <div className='form-control checkbox'>
          <input id='important' type='checkbox' name='important' value='true' defaultChecked={data.important === 'true'} />
          <label htmlFor='important'>Important</label>
        </div>
        <div className='form-control'>
          <button type='submit' disabled={transition.state === 'submitting'}>Save</button>
        </div>
      </Form>
      {actionData?.error && <p>There was an error, try again</p>}
    </div>
  )
}
