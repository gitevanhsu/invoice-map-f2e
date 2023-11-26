type ItemProps = { className?: string; children: string; onClick: () => void };

export default function Item({ children, onClick, className }: ItemProps) {
  return (
    <p
      className={`flex items-center justify-center rounded border border-black px-3 py-2 text-sm leading-none text-primary-bgMain ${className}`}
      onClick={onClick}
    >
      {children}
    </p>
  );
}
