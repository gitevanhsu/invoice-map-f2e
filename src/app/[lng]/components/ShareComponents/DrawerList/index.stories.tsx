import type { Meta, StoryObj } from "@storybook/react";

import "@/app/globals.css";

import DrawerList from "./";

const languageList = [
  {
    id: "1",
    title: <p>Item-1</p>,
    subList: [
      {
        id: "1-1",
        title: <p>Item-1-1</p>,
      },
      {
        id: "1-2",
        title: <p>Item-1-2</p>,
        subList: [
          {
            id: "1-2-1",
            title: <p>Item-1-2-1</p>,
          },
          {
            id: "1-2-2",
            title: <p>Item-1-2-2</p>,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: <p>Item-2</p>,
  },
  {
    id: "3",
    title: <p>Item-3</p>,
  },
];

const meta = {
  title: "DrawerList",
  component: DrawerList,
  decorators: [
    (Story) => (
      <div className="max-w-[400px]">
        <Story />
      </div>
    ),
  ],
  tags: ["list"],
  argTypes: {},
} satisfies Meta<typeof DrawerList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { content: languageList },
};
