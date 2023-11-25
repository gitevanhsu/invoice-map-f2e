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

type dataType = {
  year: string;
  rate: number;
};

type SimpleChartProps = {
  data: Array<dataType>;
  labelY: string;
  dataKeyX: string;
  dataKeyY: string;
  tooltipLabel: string;
  tooltipPostFix: string;
};

export default function SimpleChart({
  data,
  dataKeyY,
  dataKeyX,
  labelY,
  tooltipLabel,
  tooltipPostFix,
}: SimpleChartProps) {
  return (
    <ResponsiveContainer width="100%" height={100}>
      <LineChart data={data} margin={{ top: 10 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKeyX} padding={{ left: 30, right: 30 }} />
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
        <Line
          type="monotone"
          dataKey={dataKeyY}
          stroke="#E11D48"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
