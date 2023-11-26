type CardSmallProps = {
  className?: string;
  bg?: string;
  children: JSX.Element;
};

export default function CardSmall({ className, bg, children }: CardSmallProps) {
  return (
    <div
      className={`flex items-center rounded ${className && className} ${
        bg ? bg : "bg-white/60"
      }`}
    >
      {children}
    </div>
  );
}
