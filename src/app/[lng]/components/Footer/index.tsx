export default function Footer() {
  return (
    <footer className="absolute bottom-0 -z-10 flex w-full items-center justify-center bg-white/10">
      <p className="text-slate-800">
        &copy; 2023 - {new Date().getFullYear()} Yang-Min, Hsu
      </p>
    </footer>
  );
}
