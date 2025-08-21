"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import { Typography, Card } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart"; // config du chart

const { Title, Paragraph } = Typography;

export default function LineChart() {
  return (
    <Card className="p-4 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <Title level={5} className="!mb-0">
            Active Users
          </Title>
          <Paragraph className="text-gray-500">
            than last week{" "}
            <span className="text-green-600 font-semibold">+30%</span>
          </Paragraph>
        </div>

        {/* Légendes */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <span className="flex items-center gap-1 text-gray-600">
            <MinusOutlined className="text-blue-500" /> Traffic
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <MinusOutlined className="text-green-500" /> Sales
          </span>
        </div>
      </div>

      {/* Chart */}
      <ReactApexChart
        options={lineChart.options}
        series={lineChart.series}
        type="area"
        height={350}
        width="100%"
      />
    </Card>
  );
}
