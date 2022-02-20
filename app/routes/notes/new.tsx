import { useActionData, useTransition, Form, Link } from "remix";
import type { ActionFunction } from "remix";
import axios from "axios";
import { useEffect, useRef } from "react";

export const action: ActionFunction = async ({ request }) => {
  const api_url: string = process.env.API_URL;

  try {
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const important = formData.get("important");

    await axios.post(api_url + "/notes", {
      title,
      content,
      important: important === "true" ? true : false,
    });
    return { errors: false };
  } catch (error) {
    console.log(error);
    return { error: true };
  }
};

export default function New() {
  const actionData = useActionData();
  const transition = useTransition();

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (transition.state === "loading") {
      formRef?.current?.reset();
    }
  }, [transition.state]);

  return (
    <div className='add_note-form'>
      <div className='add_note-form_header'>
        <h2>New note</h2>
        <Link to='/notes'>Back</Link>
      </div>
      <Form method='post' action='/notes/new' ref={formRef}>
        <div className='form-control'>
          <label htmlFor='title'>Title</label>
          <input id='title' name='title' type='text' />
        </div>
        <div className='form-control'>
          <label htmlFor='content'>Content</label>
          <textarea id='content' name='content' rows={4} />
        </div>
        <div className='form-control checkbox'>
          <input id='important' type='checkbox' name='important' value='true' />
          <label htmlFor='important'>Important</label>
        </div>
        <div className='form-control'>
          <button type='submit'>Save</button>
        </div>
      </Form>
      {actionData?.error && <p>There was an error, try again</p>}
    </div>
  );
}
