import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex w-full flex-1 items-center justify-center bg-[#0C0D10] px-5 py-24 text-center text-white">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#C2F800]">404 · Not found</p>
        <h1 className="mt-3 text-3xl font-black uppercase">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-sm text-[#858994]">The link may be outdated or the address may be incorrect.</p>
        <Link href="/" className="mt-6 inline-flex h-10 items-center rounded-full bg-[#C2F800] px-5 text-xs font-bold text-[#11130C] hover:bg-[#d2ff22]">Back to workouts</Link>
      </div>
    </main>
  );
}
