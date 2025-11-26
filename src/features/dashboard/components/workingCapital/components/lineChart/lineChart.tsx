import {
  ResponsiveLine,
  type LineCustomSvgLayerProps,
  type LineSeries,
  type Point,
} from "@nivo/line";
import { getCurrencyWithSymbol } from "../../../../../finance/utils/helpers";
import { useState } from "react";
import { formatNumber, monthMap } from "../../utils/helpers";
import type { LineGraphData } from "../../utils/types";

const THRESHOLD = 10;

export const LineChart = ({ graphData, currency }: LineGraphData) => {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null
  );

  const CustomColumnBG = ({
    innerHeight,
    points,
  }: LineCustomSvgLayerProps<LineSeries>) => {
    if (!mousePos) return null;

    // Only show crosshair if hovering very close to an actual point position
    const threshold = THRESHOLD; // Threshold to detect when hovering near a point
    const closestPoint = points?.find((point: Point<LineSeries>) => {
      const distance = Math.sqrt(
        Math.pow(point.x - mousePos.x, 2) + Math.pow(point.y - mousePos.y, 2)
      );
      return distance < threshold;
    });

    if (!closestPoint) return null;

    const boxWidth = 50;
    const gradientId = "crosshair-gradient";

    return (
      <>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#FAFBFE" />
            <stop offset="100%" stopColor="#F2F6FC" />
          </linearGradient>
        </defs>
        <rect
          x={closestPoint.x - boxWidth / 2}
          y={0}
          width={boxWidth}
          height={innerHeight}
          fill={`url(#${gradientId})`}
          rx={12}
          ry={12}
          pointerEvents="none"
          className="line-chart-column-bg"
        />
      </>
    );
  };

  const CustomPoints = ({ points }: LineCustomSvgLayerProps<LineSeries>) => {
    if (!mousePos) return null;

    // Find the closest point to the hovered position
    // Use a smaller threshold and check both x and y proximity
    const threshold = THRESHOLD; // Threshold to detect when hovering near a point
    const closestPoint = points.find((point) => {
      const distance = Math.sqrt(
        Math.pow(point.x - mousePos.x, 2) + Math.pow(point.y - mousePos.y, 2)
      );
      return distance < threshold;
    });

    // Only show points if hovering very close to an actual point position
    if (!closestPoint) return null;

    // Only show the specific point(s) that are being hovered, not all at that x position
    // Check if we're hovering directly over a point (both x and y must be close)
    const pointsToShow = points.filter((point: Point<LineSeries>) => {
      const distance = Math.sqrt(
        Math.pow(point.x - mousePos.x, 2) + Math.pow(point.y - mousePos.y, 2)
      );
      return distance < threshold;
    });

    return (
      <>
        <defs>
          <filter
            id="point-shadow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feDropShadow
              dx="0"
              dy="2"
              stdDeviation="3"
              floodColor="rgba(0, 0, 0, 0.2)"
            />
          </filter>
        </defs>
        <g>
          {pointsToShow.map((point: Point<LineSeries>) => {
            const tooltipText = getCurrencyWithSymbol({
              currency,
              value: point.data.y as number,
              removeZeroDecimals: true,
            });
            const tooltipPadding = 10;
            const tooltipWidth = tooltipText.length * 6 + tooltipPadding * 2;
            const tooltipHeight = 30;
            const arrowSize = 6;
            const tooltipX = point.x - tooltipWidth / 2;
            const tooltipY = point.y - tooltipHeight - arrowSize - 34;

            return (
              <g key={point.id}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={5}
                  fill="#5243AA"
                  stroke="white"
                  strokeWidth={2}
                  filter="url(#point-shadow)"
                  className="line-chart-point"
                />
                {/* Custom SVG Tooltip with arrow */}
                <g pointerEvents="none" className="line-chart-toottip">
                  {/* Rounded rectangle */}
                  <rect
                    x={tooltipX}
                    y={tooltipY}
                    width={tooltipWidth}
                    height={tooltipHeight}
                    fill="var(--tooltip-bg-color)"
                    rx={8}
                    ry={8}
                  />
                  {/* Downward-pointing arrow */}
                  <path
                    d={`M ${point.x - arrowSize} ${
                      tooltipY + tooltipHeight
                    } L ${point.x} ${tooltipY + tooltipHeight + arrowSize} L ${
                      point.x + arrowSize
                    } ${tooltipY + tooltipHeight} Z`}
                    fill="var(--tooltip-bg-color)"
                  />
                  {/* Text */}
                  <text
                    x={point.x}
                    y={tooltipY + tooltipHeight / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="var(--text-color-1)"
                    fontSize="12"
                    fontWeight="500"
                    fontFamily="Kumbh Sans, sans-serif"
                  >
                    {tooltipText}
                  </text>
                </g>
              </g>
            );
          })}
        </g>
      </>
    );
  };

  const chartMargin = { top: 10, right: 30, bottom: 30, left: 50 };

  return (
    <div className="line-chart h-full">
      <ResponsiveLine
        animate={true}
        data={graphData}
        margin={chartMargin}
        onMouseMove={(_point, event) => {
          const svgElement = event.currentTarget.closest("svg");
          if (svgElement) {
            const svgPoint = svgElement.createSVGPoint();
            svgPoint.x = event.clientX;
            svgPoint.y = event.clientY;
            const ctm = svgElement.getScreenCTM();
            if (ctm) {
              const transformedPoint = svgPoint.matrixTransform(ctm.inverse());
              const innerX = transformedPoint.x - chartMargin.left;
              const innerY = transformedPoint.y - chartMargin.top;
              setMousePos({ x: innerX, y: innerY });
            }
          }
        }}
        onMouseLeave={() => {
          setMousePos(null);
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: 100000,
        }}
        axisBottom={{
          tickPadding: 15,
          tickSize: 0,
          format: (value) => {
            return monthMap[value as string] || value;
          },
        }}
        axisLeft={{
          tickValues: [0, 25000, 50000, 75000, 100000],
          format: (value) => {
            return formatNumber(value);
          },
          tickPadding: 30,
          tickSize: 0,
        }}
        colors={(series: LineSeries) => {
          if (series.id === "expense") {
            return "var(--color-primary)";
          }
          if (series.id === "income") {
            return "var(--color-secondary)";
          }
          return "#000000";
        }}
        curve="catmullRom"
        lineWidth={2}
        pointSize={15}
        enablePoints={true}
        pointColor="transparent"
        pointBorderWidth={0}
        pointBorderColor="transparent"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        tooltip={() => null}
        gridYValues={[0, 25000, 50000, 75000, 100000]}
        enableGridX={false}
        enableGridY={false}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "var(--text-color-2)",
              },
            },
          },
        }}
        layers={[
          CustomColumnBG,
          "grid",
          "markers",
          "axes",
          "areas",
          "lines",
          CustomPoints,
          "mesh",
          "legends",
        ]}
      />
    </div>
  );
};
