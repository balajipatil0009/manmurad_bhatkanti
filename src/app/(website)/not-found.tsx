import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-[900px] mx-auto px-6 py-32 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary mb-3">
        Trek Not Found
      </p>
      <h1 className="text-4xl md:text-6xl font-extrabold uppercase text-forest mb-6">
        No Such Trek
      </h1>
      <p className="text-sm text-neutral-600 leading-relaxed max-w-xl mx-auto mb-10">
        The trek you are looking for may have been moved, renamed, or is no
        longer available. Browse our full list of upcoming adventures instead.
      </p>
      <Link
        href="/trips"
        className="inline-block bg-primary text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-full hover:bg-primary-dark transition shadow"
      >
        View All Treks
      </Link>
    </section>
  );
}
