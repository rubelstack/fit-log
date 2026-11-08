import Image from 'next/image';
import Link from 'next/link';
import logo from '@/app/assets/logo.png';

function Footer() {
  return (
    <div className="w-full border-t border-[#1B1D22] bg-[#0C0D10] px-6 sm:px-10">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 py-5 sm:flex-row">
        <Link href="/" className="flex items-center gap-2 text-xs font-extrabold text-white">
          <Image src={logo} alt="" className="h-5 w-5" />
          FITLOG
        </Link>
        <p className="text-center text-[10px] text-[#858994]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </div>
  );
}

export default Footer;
