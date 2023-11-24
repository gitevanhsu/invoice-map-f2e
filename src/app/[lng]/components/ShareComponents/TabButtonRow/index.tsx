type TabButtonProps = {
  currentTab: string;
  tabs: Array<{ value: string; id: string }>;
  onClick: (id: string) => void;
};

export default function StatusButton({
  currentTab,
  tabs,
  onClick,
}: TabButtonProps) {
  return (
    <div className="flex overflow-hidden rounded-lg bg-white/60 leading-none">
      {tabs.map(({ value, id }) => (
        <button
          key={id}
          onClick={() => onClick(id)}
          className={`w-1/2 cursor-pointer  rounded-lg py-3 text-center ${
            id === currentTab && "bg-primary-bgMain text-white"
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
