"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography, Card } from "antd";
import eChart from "./configs/eChart"; // ton fichier config chart

const { Title, Paragraph } = Typography;

export default function EChart() {
  const items = [
    { title: "3,6K", label: "Users" },
    { title: "2M", label: "Clicks" },
    { title: "$772", label: "Sales" },
    { title: "82", label: "Items" },
  ];

  return (
    <div className="p-4">
      {/* Chart */}
      <Card className="rounded-2xl shadow-md mb-6">
        <ReactApexChart
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={250}
        />
      </Card>

      {/* Stats */}
      <Card className="rounded-2xl shadow-md">
        <Title level={5} className="mb-2">
          Active Users
        </Title>
        <Paragraph className="text-gray-500">
          Than last week{" "}
          <span className="text-green-600 font-semibold">+30%</span>
        </Paragraph>
        <Paragraph className="text-gray-400">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>

        <Row gutter={[16, 16]} className="mt-4">
          {items.map((item, index) => (
            <Col xs={12} sm={6} key={index}>
              <Card
                className="text-center rounded-xl shadow-sm hover:shadow-lg transition"
                bodyStyle={{ padding: "12px" }}
              >
                <Title level={4} className="mb-0">
                  {item.title}
                </Title>
                <span className="text-gray-500">{item.label}</span>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </div>
  );
}
