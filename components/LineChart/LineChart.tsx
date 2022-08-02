import type { NextPage } from "next";
import * as echarts from "echarts";
import { ComposeOption } from "echarts/core";
import { useContext, useEffect, useRef } from "react";
import {
  TitleComponentOption,
  TooltipComponentOption,
  LineSeriesOption,
  GridComponentOption,
} from "echarts";
import { XAXisOption, YAXisOption } from "echarts/types/dist/shared";
import styles from "./LineChart.module.sass";
import { MyContext } from "@components/MyContext/MyContext";
const timeTypeList = [
  {
    label: "本周",
    id: "0",
  },
  {
    label: "月度",
    id: "1",
  },
  {
    label: "年度",
    id: "2",
  },
];
type ECOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | XAXisOption
  | YAXisOption
  | LineSeriesOption
  | GridComponentOption
>;

type LineChartPorps = {
  park_name: string;
  toDay_data: number;
  park_xAxisData: number[] | string[];
  park_carbonEquivalent: string[] | number[];
  park_emissionLoad: string[] | number[];
  setTimeType: (timeType: string) => void;
  timeType: string|number;
};

const LineChart: NextPage<LineChartPorps> = (porps: LineChartPorps) => {
  const {
    park_name,
    toDay_data,
    park_xAxisData,
    park_carbonEquivalent,
    park_emissionLoad,
    setTimeType,
    timeType,
  } = porps;
  const { state } = useContext(MyContext) as any;
  const { parkId } = state;
  const chartRef: any = useRef(null);
  let myChart: echarts.ECharts | null = null;
  const options: ECOption = {
    title: {
      text: park_name, //标题
      subtext: "(tCO2e)", // 副标题
    },
    grid: {
      //图表位置的偏移量
      left: "%",
      right: "5%",
      bottom: "8%",
    },
    xAxis: {
      // X轴上的数据
      type: "category",
      boundaryGap: false,
      data: park_xAxisData,
    },
    yAxis: {
      type: "value",
    },
    legend: {
      data: ["碳排放量", "基准排放量","碳汇量"],
    },
    series: [
      {
        name: parkId!=3?"碳排放量":"碳汇量",
        data: park_carbonEquivalent,
        type: "line",
        smooth: true,
        areaStyle: {},
      },
      // {
      //   name: "基准排放量",
      //   data: park_emissionLoad,
      //   type: "line",
      //   smooth: true,
      //   areaStyle: {},
      // },
    ],
  };
  function renderChart() {
    const chart = echarts.getInstanceByDom(chartRef.current);
    if (chart) {
      myChart = chart;
    } else {
      myChart = echarts.init(chartRef.current);
    }
    myChart.setOption(options);
  }
  /**
   * 为了监听页面宽度的变化来重新触发折线图的渲染。
   * */
  function again() {
    return (myChart as echarts.ECharts).resize();
  }

  function debounce(fn: () => void, wait: number | undefined) {
    let timer: string | number | NodeJS.Timeout | null | undefined = null;
    //此处返回的是一个函数
    return function () {
      if (timer !== null) {
        clearTimeout(timer);
      }
      //重新开始计时
      timer = setTimeout(fn, wait);
    };
  }

  function onresize() {
    window.addEventListener("resize", debounce(again, 500));
  }

  useEffect(() => {
    renderChart();
    onresize();
    return () => {
      myChart && myChart.dispose();
    };
  }, [park_carbonEquivalent, park_emissionLoad, park_name]);

  return (
    <div className={styles.LineChart} style={{ textAlign: "center" }}>
      <div ref={chartRef} style={{ height: "370px", width: "100%" }}></div>
      <div className={styles.timeType}>
        {timeTypeList.map((item, index) => {
          return (
            <span
              className={item.id == timeType ? styles.active : ""}
              key={index}
              onClick={() => {
                setTimeType(item.id);
              }}
            >
              {item.label}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default LineChart;
