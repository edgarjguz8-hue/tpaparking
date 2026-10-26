import Link from 'next/link';

export default function BackLink({ href, label = 'Back', light = false }) {
  return (
    <Link href={href} aria-label={label} className="iconbtn">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={light ? '#fff' : '#0E1116'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </Link>
  );
}
