'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, ReceiptText, X } from 'lucide-react';

const navigation = [
  { href: '/#fitur', label: 'Fitur' },
  { href: '/#cara-kerja', label: 'Cara pakai' },
  { href: '/dashboard', label: 'Riwayat' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-[#fffdf8]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5" onClick={() => setIsOpen(false)}>
          <span className="grid size-10 place-items-center rounded-[15px] bg-green-600 text-white shadow-[0_8px_20px_rgba(22,163,74,0.22)] transition group-hover:-rotate-3 group-hover:bg-green-700">
            <ReceiptText size={20} strokeWidth={2.4} />
          </span>
          <span className="min-w-0">
            <span className="block text-[17px] font-black leading-none tracking-[-0.03em] text-stone-950">
              SplitBill
            </span>
            <span className="mt-1 hidden text-[10px] font-bold leading-none text-stone-400 sm:block">
              Patungan jadi gampang
            </span>
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 rounded-full border border-stone-200/80 bg-white p-1 shadow-sm md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-bold text-stone-600 transition hover:bg-green-50 hover:text-green-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/new"
            className="hidden min-h-10 items-center justify-center gap-1.5 rounded-[14px] bg-green-600 px-4 text-sm font-extrabold text-white shadow-[0_8px_20px_rgba(22,163,74,0.2)] transition hover:-translate-y-0.5 hover:bg-green-700 active:translate-y-0 sm:inline-flex"
          >
            Mulai patungan
            <ArrowRight size={15} />
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-[14px] border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:border-green-200 hover:bg-green-50 hover:text-green-800 md:hidden"
            aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-navigation" className="border-t border-stone-200/70 bg-[#fffdf8] px-4 pb-4 pt-3 md:hidden">
          <nav aria-label="Navigasi mobile" className="mx-auto grid max-w-6xl gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-stone-700 transition hover:bg-green-50 hover:text-green-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/new"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[14px] bg-green-600 px-4 text-sm font-extrabold text-white"
            >
              Mulai patungan
              <ArrowRight size={16} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
