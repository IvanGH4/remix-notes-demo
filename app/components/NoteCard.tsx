import { Link } from "remix";
import { Note } from "~/types";
import { Card, CardContent, Typography } from "@mui/material";
import moment from "moment";

interface Props {
  note: Note;
}

export default function NoteCard({ note }: Props) {
  return (
    <Card
      sx={{ maxWidth: 380, marginBottom: 5, backgroundColor: "#333" }}
      variant='elevation'
      className='note_card'
    >
      <Link to={`/note/${note._id}`}>
        <CardContent>
          <Typography component='h2' color='#fff'>
            {note.title}
          </Typography>
          <Typography color="text.primary">
            {moment(note.createdAt).format("MMM DD, YYYY")}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}
