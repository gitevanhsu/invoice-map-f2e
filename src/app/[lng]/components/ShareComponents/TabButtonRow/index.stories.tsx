import type { Meta, StoryObj } from "@storybook/react";
import "@/app/globals.css";

import TabButtonRow from ".";

const mockOne = {
  currentTab: "1",
  tabs: [
    { value: "1-1", id: "1" },
    { value: "1-2", id: "2" },
  ],
};
const mockTwo = {
  currentTab: "2",
  tabs: [
    { value: "2-1", id: "1" },
    { value: "2-2", id: "2" },
  ],
};
const meta = {
  title: "TabButtonRow",
  component: TabButtonRow,
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  tags: ["button"],
  argTypes: {},
} satisfies Meta<typeof TabButtonRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status1: Story = {
  args: { ...mockOne },
};
export const Status2: Story = {
  args: { ...mockTwo },
};
