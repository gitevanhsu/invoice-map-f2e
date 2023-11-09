import type { Meta, StoryObj } from "@storybook/react";
import "@/app/globals.css";

import HoverList from "./";

const mockOne = {
  title: <div className="bg-red-300 px-4 py-2">List1</div>,
  content: [
    {
      id: "1",
      title: <p>Item1</p>,
    },
    {
      id: "2",
      title: <p>Item2</p>,
    },
    {
      id: "3",
      title: <p>Item3</p>,
    },
  ],
};
const meta = {
  title: "HoverList",
  component: HoverList,
  decorators: [
    (Story) => (
      <div className="flex">
        <Story />
      </div>
    ),
  ],
  tags: ["list"],
  argTypes: {},
} satisfies Meta<typeof HoverList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ...mockOne },
};
