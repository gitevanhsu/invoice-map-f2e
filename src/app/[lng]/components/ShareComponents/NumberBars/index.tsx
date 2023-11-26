"use client";
import { numberFormatter } from "@/app/utils/number";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

type DataType = {
  year: string;
  number: number;
};

type SimpleBarsProps = {
  data: Array<DataType>;
  dataKeyX: string;
  dataKeyY: string;
  tooltipLabel: string;
  tooltipPostFix: string;
};

const gradientColors = ["#94A3B8", "#F43F5E"];

const years = ["1996", "2000", "2004", "2008", "2012"];

function createMockNum(realData: Array<DataType>) {
  let num = 0;
  realData.forEach(({ number }) => (num += number));
  return Math.floor(Math.random() * (num * 0.7));
}

export default function NumberBars({
  data: realData,
  dataKeyX,
  dataKeyY,
  tooltipLabel,
  tooltipPostFix,
}: SimpleBarsProps) {
  const fakeData = years.map((year) => ({
    year,
    number: createMockNum(realData),
  }));
  const data = [...fakeData, ...realData];
  return (
    <ResponsiveContainer width="100%" height="100%">
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
