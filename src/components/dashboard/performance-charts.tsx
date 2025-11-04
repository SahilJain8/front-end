"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"

const latencyData = [
  { model: "Gemini 2.5 Flash", latency: 150 },
  { model: "Model B", latency: 300 },
  { model: "Model C", latency: 220 },
  { model: "Model D", latency: 450 },
]

const pricingData = [
    { model: "Gemini 2.5 Flash", price: 0.50 },
    { model: "Model B", price: 0.40 },
    { model: "Model C", price: 1.20 },
    { model: "Model D", price: 1.00 },
]

const latencyChartConfig = {
  latency: {
    label: "Latency (ms)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const pricingChartConfig = {
    price: {
        label: "Price ($/1k tokens)",
        color: "hsl(var(--accent))",
    },
} satisfies ChartConfig

export function PerformanceCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Model Latency Comparison</CardTitle>
          <CardDescription>Average response time in milliseconds.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={latencyChartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={latencyData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="model"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 10) + '...'}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="latency" fill="var(--color-latency)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Model Pricing Comparison</CardTitle>
          <CardDescription>Cost per 1,000 tokens in USD.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={pricingChartConfig} className="h-[250px] w-full">
            <BarChart accessibilityLayer data={pricingData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="model"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 10) + '...'}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar dataKey="price" fill="var(--color-price)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
