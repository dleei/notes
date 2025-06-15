import Link from "next/link";
import { photos } from "./data";

export default function Home() {
  return (
    <main className="flex flex-row flex-wrap">
      {photos.map(({ id, src }) => (
        <Link key={id} href={`/photo/${id}`}>
          <img width="200" src={src} className="m-1" />
        </Link>
      ))}
    </main>
  );
}
