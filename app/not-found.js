import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pad stack" style={{ paddingTop: 48, gap: 16 }}>
      <h1 className="display" style={{ margin: 0, fontSize: 28 }}>We couldn't find that.</h1>
      <p className="sub" style={{ margin: 0 }}>The event, lot or pass may have changed.</p>
      <Link href="/" className="btn">Back to events</Link>
    </div>
  );
}
