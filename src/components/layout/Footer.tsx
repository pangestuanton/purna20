import Link from 'next/link';
import { Heart, ReceiptText } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-stone-200/70 bg-white py-9 text-stone-500">
      <div className="mx-auto flex max-w-6xl flex-col gap-7 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-[15px] bg-green-100 text-green-700">
              <ReceiptText size={19} />
            </span>
            <div>
              <p className="text-sm font-black text-stone-950">SplitBill</p>
              <p className="mt-0.5 text-xs text-stone-500">Biar urusan patungan cepat beres.</p>
            </div>
          </div>

          <nav aria-label="Navigasi footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold">
            <Link href="/#fitur" className="transition hover:text-green-700">Fitur</Link>
            <Link href="/#cara-kerja" className="transition hover:text-green-700">Cara pakai</Link>
            <Link href="/dashboard" className="transition hover:text-green-700">Riwayat</Link>
          </nav>
        </div>

        <div className="flex flex-col justify-between gap-2 border-t border-stone-100 pt-5 text-xs sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} SplitBill. Semua hak dilindungi.</p>
          <p className="inline-flex items-center gap-1.5 text-stone-400">
            Dibuat dengan <Heart size={12} className="fill-green-600 text-green-600" /> untuk teman seperpatungan.
          </p>
        </div>
      </div>
    </footer>
  );
}
