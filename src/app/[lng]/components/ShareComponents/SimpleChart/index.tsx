"use client";
import { formatToPercentage } from "@/app/utils/number";
import {
  Tooltip,
  Line,
  XAxis,
  YAxis,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type DataType = {
  year: string;
  rate: number;
};

type SimpleChartProps = {
  data: Array<DataType>;
  labelY: string;
  dataKeyX: string;
  dataKeyY: string;
  tooltipLabel: string;
  tooltipPostFix: string;
};

const years = ["1996", "2000", "2004", "2008", "2012"];

function createMockNum() {
  return Math.random() * 100;
}

export default function SimpleChart({
  data: realData,
  dataKeyY,
  dataKeyX,
  labelY,
  tooltipLabel,
  tooltipPostFix,
}: SimpleChartProps) {
  const fakeData = years.map((year) => ({
    year,
    rate: createMockNum(),
  }));
  const data = [...fakeData, ...realData];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={dataKeyX}
          padding={{ left: 30, right: 30 }}
          type="category"
        />
        <YAxis
          dataKey={dataKeyY}
          interval={1}
          label={{
            style: { textAnchor: "start", verticalAnchor: "start" },
            position: "left",
            offset: -15,
            value: labelY,
          }}
        />
        <Tooltip
          formatter={(value: number) => [
            formatToPercentage(value / 100),
            tooltipLabel,
          ]}
          labelFormatter={(label) => `${label}${tooltipPostFix}`}
        />
        <Line dataKey={dataKeyY} stroke="#E11D48" activeDot={{ r: 5 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
