"use client";
import { numberFormatter } from "@/app/utils/number";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    pv: 1398,
    amt: 2210,
  },
];
type dataType = {
  year: string;
  number: number;
};

type SimpleBarsProps = {
  data: Array<dataType>;
  dataKeyX: string;
  dataKeyY: string;
  tooltipLabel: string;
  tooltipPostFix: string;
  // labelY: string;
};

const gradientColors = ["#94A3B8", "#F43F5E"];

export default function NumberBars({
  data,
  dataKeyX,
  dataKeyY,
  tooltipLabel,
  tooltipPostFix,
}: SimpleBarsProps) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 30,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} />
        <YAxis dataKey={dataKeyY} tickFormatter={numberFormatter} />
        <defs>
          {gradientColors.map((color, index) => (
            <linearGradient
              key={color}
              id={`color-${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              spreadMethod="reflect"
            >
              <stop offset="0" stopColor={color} />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
          ))}
        </defs>

        <Tooltip
          formatter={(value: number) => [numberFormatter(value), tooltipLabel]}
          labelFormatter={(label) => `${label}${tooltipPostFix}`}
        />
        <Bar dataKey={dataKeyY}>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={`url(#color-${index % 2})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
