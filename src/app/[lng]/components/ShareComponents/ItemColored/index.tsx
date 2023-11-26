type ItemColoredProps = {
  bg: string;
  label: JSX.Element;
  children: JSX.Element;
  onClick?: () => void;
};
export default function ItemColored({
  bg,
  label,
  children,
  onClick,
}: ItemColoredProps) {
  return (
    <div
      className={`flex flex-col items-center rounded py-2 text-base font-semibold text-white ${bg}`}
      onClick={onClick}
    >
      <p className="mb-1 cursor-pointer text-center leading-none md:text-lg md:leading-none">
        {label}
      </p>
      {children}
    </div>
  );
}
