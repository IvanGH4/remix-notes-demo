import { redirect } from 'remix';
import type { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async () => {
  return redirect('/notes');
}

export default function Index() {
  return <p>Loading...</p>
}
