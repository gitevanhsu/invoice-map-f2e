type ItemProps = { children: string; onClick: () => void };

export default function Item({ children, onClick }: ItemProps) {
  return (
    <p
      className="flex w-[calc(100%_/_4_-_8px_+_(8px_/_4))] max-w-[150px] items-center justify-center rounded border border-black px-3 py-2 text-sm leading-none text-primary-bgMain"
      onClick={onClick}
    >
      {children}
    </p>
  );
}
