import { Link } from "remix";
import { Note } from "~/types";
import { Card, CardContent, Chip, Typography } from "@mui/material";
import moment from "moment";

interface Props {
  note: Note;
}

export default function NoteCard({ note }: Props) {
  return (
    <Card
      sx={{ marginBottom: 5, backgroundColor: "#333" }}
      variant='elevation'
      className='note_card'
    >
      <Link to={`/note/${note._id}`}>
        <CardContent>
          <Typography variant="h3" component='h3' color='#fff'>
            {note.title}
          </Typography>
          <Chip
            label={moment(note.createdAt).format("MMM DD, YYYY")}
            color='primary'
            variant='outlined'
          />
        </CardContent>
      </Link>
    </Card>
  );
}
