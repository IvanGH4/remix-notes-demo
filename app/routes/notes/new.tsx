import { useActionData, useTransition, Form, Link } from "remix";
import type { ActionFunction } from "remix";
import axios from "axios";
import { useEffect, useRef } from "react";
import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Input,
  InputLabel,
  TextareaAutosize,
  Typography,
} from "@mui/material";

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
    <Container maxWidth='sm' style={{ marginBottom: 20 }}>
      <div className='add_note-form_header'>
        <h2>New note</h2>
        <Link to='/notes'>Back</Link>
      </div>
      <Form method='post' action='/notes/new' ref={formRef}>
        <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
          <Input id='title' name='title' type='text' placeholder='Title' />
        </FormControl>
        <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
          <TextareaAutosize id='content' name='content' minRows={3} placeholder='Content' />
        </FormControl>
        <Typography variant="body1" component="p">
          New to Markdown? <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank" rel="noopener noreferrer">Here's a quick guide</a>
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox id='important' name='important' value='true' />}
            label='Important'
          />
        </FormGroup>
        <div className='form-control'>
          <Button
            variant='contained'
            color='primary'
            type='submit'
            disabled={transition.state === "submitting"}
          >
            Save
          </Button>
        </div>
      </Form>
      {actionData?.error && <p>There was an error, try again</p>}
    </Container>
  );
}
