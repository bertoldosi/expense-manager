import React from "react";
import {
  Cell as RechartsCell,
  Pie as RechartsPie,
  PieChart as RechartsPieChart,
  ResponsiveContainer as RechartsResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

import { ShoppingGroupInterface } from "@interfaces/*";
import {
  SCenterLabel,
  SChartCard,
  SChartWrapper,
  SContainer,
  SLegend,
  SLegendDot,
  SLegendHeader,
  SLegendItem,
  SLegendValue,
  SSkeletonBlock,
  SSkeletonCircle,
  SSkeletonLegendItem,
  SSkeletonSummaryCard,
  SSummary,
  SSummaryLabel,
  SSummaryValue,
} from "./styles";

const PieChart = RechartsPieChart as React.ComponentType<any>;
const Pie = RechartsPie as React.ComponentType<any>;
const Cell = RechartsCell as React.ComponentType<any>;
const Tooltip = RechartsTooltip as React.ComponentType<any>;
const ResponsiveContainer =
  RechartsResponsiveContainer as React.ComponentType<any>;

function parseCents(value: string) {
  return Number(value.replace(/\D/g, "")) || 0;
}

function getDynamicColor(index: number) {
  const hue = Math.round((index * 137.508) % 360);

  return `hsl(${hue}, 68%, 46%)`;
}

function formatCurrency(valueInCents: string | number) {
  const cents =
    typeof valueInCents === "string" ? parseCents(valueInCents) : valueInCents;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

function ChartPie({
  shoppingGroups,
  isLoading,
}: {
  shoppingGroups: ShoppingGroupInterface[];
  isLoading?: boolean;
}) {
  const chartData = React.useMemo(
    () =>
      shoppingGroups
        .map((group, index) => ({
          name: group.subcategory,
          total: group.total,
          value: parseCents(group.total),
          itemsCount: group.items.length,
          color: getDynamicColor(index),
        }))
        .filter((group) => group.value > 0),
    [shoppingGroups],
  );

  const totalCents = React.useMemo(
    () => chartData.reduce((acc, item) => acc + item.value, 0),
    [chartData],
  );

  const tooltipFormatter = React.useCallback((value: number | string) => {
    const cents = typeof value === "number" ? value : parseCents(value);

    return [formatCurrency(cents), "Total"];
  }, []);

  if (isLoading) {
    return (
      <SContainer>
        <SChartCard>
          <SSummary>
            <SSkeletonSummaryCard>
              <SSkeletonBlock height="1rem" width="9rem" />
              <SSkeletonBlock height="1.4rem" width="7rem" />
            </SSkeletonSummaryCard>
            <SSkeletonSummaryCard>
              <SSkeletonBlock height="1rem" width="8rem" />
              <SSkeletonBlock height="1.4rem" width="4rem" />
            </SSkeletonSummaryCard>
          </SSummary>

          <SChartWrapper>
            <SSkeletonCircle />
          </SChartWrapper>

          <SLegend>
            <SSkeletonLegendItem>
              <SSkeletonBlock height="1rem" width="8rem" />
              <SSkeletonBlock height="1rem" width="5rem" />
            </SSkeletonLegendItem>
            <SSkeletonLegendItem>
              <SSkeletonBlock height="1rem" width="7rem" />
              <SSkeletonBlock height="1rem" width="4.5rem" />
            </SSkeletonLegendItem>
            <SSkeletonLegendItem>
              <SSkeletonBlock height="1rem" width="9rem" />
              <SSkeletonBlock height="1rem" width="6rem" />
            </SSkeletonLegendItem>
          </SLegend>
        </SChartCard>
      </SContainer>
    );
  }

  return (
    <SContainer>
      <SChartCard>
        <SSummary>
          <div>
            <SSummaryLabel>Total do periodo</SSummaryLabel>
            <SSummaryValue>{formatCurrency(totalCents)}</SSummaryValue>
          </div>
          <div>
            <SSummaryLabel>Subcategorias</SSummaryLabel>
            <SSummaryValue>{chartData.length}</SSummaryValue>
          </div>
        </SSummary>

        <SChartWrapper>
          <ResponsiveContainer width="100%" height={340}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={82}
                outerRadius={128}
                paddingAngle={3}
                strokeWidth={0}
              >
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip formatter={tooltipFormatter} />
            </PieChart>
          </ResponsiveContainer>

          <SCenterLabel>
            <span>Total</span>
            <strong>{formatCurrency(totalCents)}</strong>
          </SCenterLabel>
        </SChartWrapper>

        <SLegend>
          {chartData.map((entry) => (
            <SLegendItem key={entry.name}>
              <SLegendHeader>
                <SLegendDot style={{ backgroundColor: entry.color }} />
                <span>{entry.name}</span>
              </SLegendHeader>

              <div>
                <SLegendValue>{formatCurrency(entry.total)}</SLegendValue>
                <small>{entry.itemsCount} compras</small>
              </div>
            </SLegendItem>
          ))}
        </SLegend>
      </SChartCard>
    </SContainer>
  );
}

export default ChartPie;
