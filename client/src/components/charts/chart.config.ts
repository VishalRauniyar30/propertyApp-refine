import type { ApexOptions } from "apexcharts"

export const TotalRevenueSeries = [
    {
        name: "Last Month",
        data: [183, 84, 115, 44, 143, 143, 96],
    },
    {
        name: "Running Month",
        data: [95, 124, 72, 85, 108, 108, 47],
    },
]

export const TotalRevenueOptions: ApexOptions = {
    chart: {
        type: "bar",
        toolbar: {
            show: false,
        },
    },
    colors: ['#2196f3', '#ff9800'],
    plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: "60%",
        },
    },
    dataLabels: {
        enabled: true,
    },
    grid: {
        show: false,
    },
    stroke: {
        colors: ["transparent"],
        width: 4,
    },
    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
        title: {
            text: "₹ (thousands)",
        },
    },
    fill: {
        opacity: 1,
    },
    legend: {
        position: "top",
        horizontalAlign: "right",
    },
    tooltip: {
        y: {
            formatter(val: number) {
                return `₹ ${val} thousands`;
            },
        },
    },
}