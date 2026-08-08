'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Calculator,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ReceiptText,
  ScanLine,
  Share2,
  ShieldCheck,
  Sparkles,
  UsersRound,
  WalletCards,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { ReceiptScanner } from '@/components/splitbill/ReceiptScanner';
import { HomepageReceiptReview } from '@/components/splitbill/HomepageReceiptReview';
import { createExpense, createGroup, createMember } from '@/lib/supabaseQueries';

interface ScannedItem {
  name: string;
  amount: number;
}

interface ScannedReceiptResult {
  merchant?: string | null;
  date?: string | null;
  items: ScannedItem[];
  subtotal?: number;
  tax?: number;
  service?: number;
  discount?: number;
  total?: number;
}

const benefits = [
  {
    icon: UsersRound,
    label: 'Bagi sesuai pesanan',
    description: 'Tiap item bisa punya penanggung yang berbeda. Adil sampai suapan terakhir.',
  },
  {
    icon: Calculator,
    label: 'Hitung sampai beres',
    description: 'Pajak, service, diskon, dan ongkir dibagi proporsional secara otomatis.',
  },
  {
    icon: WalletCards,
    label: 'Transfer lebih ringkas',
    description: 'Langsung tahu siapa mengirim berapa ke siapa tanpa hitung ulang.',
  },
  {
    icon: Share2,
    label: 'Tinggal kirim ke grup',
    description: 'Hasil patungan rapi dan siap disalin ke WhatsApp dalam sekali tap.',
  },
];

const steps = [
  {
    icon: UsersRound,
    title: 'Masukkan teman',
    description: 'Tambahkan semua orang yang ikut patungan.',
  },
  {
    icon: ReceiptText,
    title: 'Catat pesanannya',
    description: 'Foto struk atau isi item satu per satu.',
  },
  {
    icon: CheckCircle2,
    title: 'Bagikan hasil',
    description: 'Cek pembagian, lalu kirim settlement ke grup.',
  },
];

export default function HomePage() {
  const router = useRouter();
  const [scannedResult, setScannedResult] = useState<ScannedReceiptResult | null>(null);

  const handleConfirmScan = async (data: {
    groupName: string;
    members: string[];
    expenses: Array<{
      title: string;
      amount: number;
      paidByMemberName: string;
      participantNames: string[];
    }>;
  }) => {
    const newGroup = await createGroup({ name: data.groupName });
    const nameToIdMap: Record<string, string> = {};

    for (const name of data.members) {
      const member = await createMember(newGroup.id, name);
      nameToIdMap[name] = member.id;
    }

    for (const expense of data.expenses) {
      await createExpense(
        {
          group_id: newGroup.id,
          paid_by_member_id: nameToIdMap[expense.paidByMemberName],
          title: expense.title,
          amount: expense.amount,
        },
        expense.participantNames.map((name) => nameToIdMap[name]),
      );
    }

    router.push(`/bill/${newGroup.id}`);
  };

  if (scannedResult) {
    return (
      <main className="min-h-screen py-8 sm:py-12">
        <Container className="max-w-5xl">
          <HomepageReceiptReview
            scannedResult={scannedResult}
            onConfirm={handleConfirmScan}
            onCancel={() => setScannedResult(null)}
          />
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen text-stone-950">
      <section className="relative isolate overflow-hidden">
        <div className="hero-grid pointer-events-none absolute inset-0 -z-10 opacity-70" />
        <Container className="grid gap-12 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-16 lg:pb-24 lg:pt-20">
          <div className="max-w-2xl">
            <div className="eyebrow">
              <span className="grid size-5 place-items-center rounded-full bg-green-100 text-green-700">
                <Sparkles size={12} />
              </span>
              Hitung bareng, tetap enak bareng
            </div>

            <h1 className="mt-6 max-w-xl text-[2.7rem] font-black leading-[0.98] tracking-[-0.055em] text-stone-950 sm:text-6xl lg:text-[4.25rem]">
              Patungan beres. <span className="text-green-700">Teman tetap akrab.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-7 text-stone-600 sm:text-lg sm:leading-8">
              Nggak perlu buka kalkulator berkali-kali. Masukkan siapa pesan apa, lalu SplitBill merapikan semua hitungan dan transfernya.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/new"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[17px] bg-green-600 px-6 text-base font-extrabold text-white shadow-[0_14px_30px_rgba(22,163,74,0.24)] transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-[0_18px_38px_rgba(22,163,74,0.28)] active:translate-y-0"
              >
                Mulai patungan
                <ArrowRight size={18} />
              </Link>
              <a
                href="#scan"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-[17px] border border-stone-200 bg-white px-6 text-base font-extrabold text-stone-800 shadow-sm transition hover:-translate-y-0.5 hover:border-green-200 hover:bg-green-50 hover:text-green-800 active:translate-y-0"
              >
                <Camera size={18} />
                Scan struk
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm font-bold text-stone-600">
              {['Tanpa login', 'Bisa beda pesanan', 'Siap dibagikan'].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5">
                  <Check size={15} className="text-green-600" strokeWidth={3} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[510px] lg:mx-0">
            <div className="absolute -left-8 top-10 -z-10 size-36 rounded-full bg-green-200/60 blur-3xl" />
            <div className="absolute -right-8 bottom-12 -z-10 size-40 rounded-full bg-amber-200/60 blur-3xl" />

            <div className="relative rounded-[32px] border border-stone-200/80 bg-white p-3 shadow-[0_28px_80px_rgba(41,55,44,0.14)] sm:p-4">
              <div className="rounded-[25px] bg-[#f7faf5] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-green-600 text-white">
                      <ReceiptText size={21} />
                    </span>
                    <div>
                      <p className="text-sm font-black text-stone-950">Makan sore 🍜</p>
                      <p className="mt-0.5 text-xs font-semibold text-stone-400">3 teman · 5 item</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-green-700 shadow-sm">
                    Sudah dihitung
                  </span>
                </div>

                <div className="leaf-gradient mt-5 overflow-hidden rounded-[24px] p-5 text-white">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/75">Total tagihan</p>
                      <p className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Rp184.000</p>
                    </div>
                    <CircleDollarSign size={28} className="text-white/55" />
                  </div>
                  <div className="mt-5 flex items-center gap-2 border-t border-white/20 pt-4">
                    {['A', 'D', 'R'].map((initial, index) => (
                      <span key={initial} className={`grid size-8 place-items-center rounded-full border-2 border-green-600 text-[11px] font-black text-stone-800 ${index === 0 ? 'bg-amber-200' : index === 1 ? 'bg-green-100' : 'bg-white'}`}>
                        {initial}
                      </span>
                    ))}
                    <p className="ml-1 text-xs font-bold text-white/80">Semua kebagian dengan adil</p>
                  </div>
                </div>

                <div className="mt-4 rounded-[22px] border border-stone-200 bg-white p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-stone-400">Tinggal transfer</p>
                    <span className="text-[11px] font-bold text-green-700">2 transaksi</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {[
                      ['Diki', 'Anton', 'Rp22.000'],
                      ['Rani', 'Anton', 'Rp20.000'],
                    ].map(([from, to, amount]) => (
                      <div key={from} className="flex items-center justify-between gap-3 rounded-2xl bg-green-50 px-3 py-3">
                        <div className="flex min-w-0 items-center gap-2 text-xs font-extrabold text-stone-800">
                          <span>{from}</span>
                          <ChevronRight size={14} className="text-green-600" />
                          <span>{to}</span>
                        </div>
                        <span className="shrink-0 text-sm font-black text-green-800">{amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="friendly-bounce absolute -right-2 -top-6 hidden rounded-2xl border border-amber-200 bg-[#fff7e2] px-4 py-3 shadow-lg sm:block">
              <p className="text-xs font-black text-amber-900">Adil. Jelas. Beres! ✨</p>
            </div>
          </div>
        </Container>
      </section>

      <section id="fitur" className="border-y border-stone-200/70 bg-white py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">Bukan cuma bagi rata</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-stone-950 sm:text-4xl">
              Dibuat untuk patungan di dunia nyata.
            </h2>
            <p className="mt-4 text-sm font-medium leading-7 text-stone-500 sm:text-base">
              Ada yang cuma pesan minum, ada yang talangin semua, dan ada pajak di akhir. Tenang, semuanya tetap tercatat.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <article
                key={benefit.label}
                className={`group rounded-[26px] border p-5 transition duration-200 hover:-translate-y-1 ${index === 0 ? 'border-green-200 bg-green-50' : index === 3 ? 'border-amber-200 bg-[#fff9ec]' : 'border-stone-200 bg-white shadow-[0_12px_32px_rgba(41,55,44,0.06)]'}`}
              >
                <span className={`grid size-11 place-items-center rounded-2xl ${index === 3 ? 'bg-amber-200 text-amber-900' : 'bg-white text-green-700 shadow-sm'}`}>
                  <benefit.icon size={21} />
                </span>
                <h3 className="mt-5 text-base font-black text-stone-950">{benefit.label}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-stone-500">{benefit.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="scan" className="py-16 sm:py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-12">
          <div>
            <div className="eyebrow">
              <ScanLine size={14} />
              Cara tercepat untuk mulai
            </div>
            <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.04em] text-stone-950 sm:text-4xl">
              Punya struk? Biar kami bantu membacanya.
            </h2>
            <p className="mt-4 text-base font-medium leading-7 text-stone-500">
              Foto atau unggah struk, cek ulang hasil bacaan, lalu tentukan siapa menikmati itemnya. Kamu tetap pegang kendali sebelum data disimpan.
            </p>
            <div className="mt-6 space-y-3">
              {[
                [ShieldCheck, 'Hasil scan bisa diperiksa dan diedit'],
                [ReceiptText, 'Item langsung siap dibagi ke teman'],
                [Sparkles, 'Input panjang jadi lebih singkat'],
              ].map(([Icon, label]) => (
                <div key={label as string} className="flex items-center gap-3 text-sm font-bold text-stone-700">
                  <span className="grid size-8 place-items-center rounded-xl bg-green-100 text-green-700">
                    <Icon size={16} />
                  </span>
                  {label as string}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-green-200 bg-gradient-to-br from-green-50 to-[#fff9ec] p-3 shadow-[0_24px_60px_rgba(21,112,62,0.10)] sm:p-5">
            <ReceiptScanner onScanCompleted={setScannedResult} />
          </div>
        </Container>
      </section>

      <section id="cara-kerja" className="border-y border-stone-200/70 bg-[#f7faf5] py-16 sm:py-20">
        <Container>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-green-700">Cara pakai</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.035em] text-stone-950 sm:text-4xl">
                Tiga langkah, nggak pakai ribet.
              </h2>
            </div>
            <Link href="/new" className="inline-flex items-center gap-1.5 text-sm font-black text-green-700 transition hover:gap-2.5 hover:text-green-800">
              Coba sekarang <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <article key={step.title} className="relative rounded-[26px] border border-stone-200 bg-white p-6 shadow-[0_12px_32px_rgba(41,55,44,0.055)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-2xl bg-green-100 text-green-700">
                    <step.icon size={21} />
                  </span>
                  <span className="text-4xl font-black tracking-[-0.06em] text-stone-100">0{index + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-black text-stone-950">{step.title}</h3>
                <p className="mt-2 text-sm font-medium leading-6 text-stone-500">{step.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="leaf-gradient relative overflow-hidden rounded-[32px] px-6 py-10 text-center text-white shadow-[0_24px_60px_rgba(21,112,62,0.18)] sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full border-[28px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-16 -right-8 size-48 rounded-full border-[32px] border-white/10" />
            <Sparkles className="mx-auto text-amber-200" size={28} />
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
              Jangan biarkan hitungan kecil bikin suasana jadi canggung.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm font-medium leading-7 text-white/80 sm:text-base">
              Buat sesi, masukkan teman, dan biarkan SplitBill merapikan sisanya.
            </p>
            <Link
              href="/new"
              className="mt-7 inline-flex min-h-13 items-center justify-center gap-2 rounded-[16px] bg-white px-6 font-black text-green-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
            >
              Mulai split bill gratis
              <ArrowRight size={17} />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
