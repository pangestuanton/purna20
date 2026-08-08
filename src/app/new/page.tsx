'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Check, ReceiptText, SlidersHorizontal, Sparkles, UsersRound } from 'lucide-react';
import { GroupForm, type GroupFormData } from '@/components/splitbill/GroupForm';
import { createGroup } from '@/lib/supabaseQueries';
import { Container } from '@/components/layout/Container';

const nextSteps = [
  { icon: UsersRound, label: 'Tambah teman yang ikut patungan' },
  { icon: ReceiptText, label: 'Masukkan item atau scan struk' },
  { icon: SlidersHorizontal, label: 'Cek hitungan dan bagikan hasil' },
];

export default function NewBillPage() {
  const router = useRouter();

  const handleCreateGroup = async (formData: GroupFormData) => {
    const newGroup = await createGroup(formData);
    if (newGroup?.id) {
      router.push(`/bill/${newGroup.id}`);
      return;
    }

    throw new Error('Gagal mendapatkan ID grup yang baru dibuat.');
  };

  return (
    <main className="min-h-screen py-7 sm:py-10">
      <Container className="max-w-6xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 rounded-full px-1 py-2 text-sm font-bold text-stone-500 transition hover:text-green-700"
        >
          <ArrowLeft size={16} />
          Kembali ke beranda
        </Link>

        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-8">
          <aside className="leaf-gradient relative overflow-hidden rounded-[30px] p-6 text-white shadow-[0_24px_60px_rgba(21,112,62,0.16)] sm:p-8 lg:sticky lg:top-24">
            <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border-[32px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-20 -left-12 size-52 rounded-full border-[34px] border-white/10" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-xs font-black">
                <Sparkles size={13} />
                Sesi baru
              </span>
              <h1 className="mt-5 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
                Patungan apa hari ini?
              </h1>
              <p className="mt-4 text-sm font-medium leading-7 text-white/78">
                Mulai dari nama kegiatan dan biaya tambahannya. Detail teman dan pesanan bisa kamu isi di langkah berikutnya.
              </p>

              <div className="mt-8 space-y-3">
                {nextSteps.map((step, index) => (
                  <div key={step.label} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white text-green-700">
                      <step.icon size={17} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-black uppercase tracking-wider text-white/55">Langkah {index + 1}</p>
                      <p className="mt-0.5 text-sm font-extrabold text-white">{step.label}</p>
                    </div>
                    <Check size={16} className="text-green-200" />
                  </div>
                ))}
              </div>

              <p className="mt-7 text-xs font-semibold leading-5 text-white/62">
                Tenang, semua detail sesi masih bisa diubah kapan saja.
              </p>
            </div>
          </aside>

          <section>
            <div className="mb-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-green-700">Mulai dari sini</p>
              <h2 className="mt-2 text-2xl font-black tracking-[-0.025em] text-stone-950 sm:text-3xl">
                Ceritakan sedikit soal patungannya.
              </h2>
              <p className="mt-2 text-sm font-medium leading-6 text-stone-500">
                Hanya nama kegiatan yang wajib. Bagian lainnya boleh dilewati dulu.
              </p>
            </div>

            <GroupForm onSubmit={handleCreateGroup} submitLabel="Lanjut tambah teman" />
          </section>
        </div>
      </Container>
    </main>
  );
}
