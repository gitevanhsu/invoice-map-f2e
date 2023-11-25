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
    <div className="flex flex-col overflow-hidden rounded-lg bg-white leading-none">
      {tabs.map(({ value, id }) => (
        <button
          key={id}
          onClick={() => onClick(id)}
          className={`h-1/2 cursor-pointer px-2 py-4 text-center ${
            id === currentTab
              ? "bg-primary-red text-white"
              : "text-primary-bgMain"
          }`}
        >
          {value}
        </button>
      ))}
    </div>
  );
}
