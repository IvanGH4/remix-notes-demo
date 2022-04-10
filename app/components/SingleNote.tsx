import moment from "moment";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Form } from "remix";
import { Note } from "~/types";

interface Props {
  note: Note;
}

const SingleNote = ({ note }: Props) => {
  return (
    <Card sx={{ backgroundColor: "#333" }}>
      <CardContent>
        <Typography variant='h5' component='div' color='white'>
          {note.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='ActiveCaption'>
          {moment(note.createdAt).format("MMM DD, YYYY")}
        </Typography>
        <div
          style={{ color: "white" }}
          dangerouslySetInnerHTML={{
            __html: note.content,
          }}
        />
      </CardContent>
      <CardActions>
        <Form method='post'>
          <input type='hidden' name='_method' value='delete' />
          <Button type='submit' size='small' color='error' variant='contained'>
            Delete
          </Button>
        </Form>
      </CardActions>
    </Card>
  );
};

export default SingleNote;
