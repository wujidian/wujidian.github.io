import * as echarts from "echarts";
import { ComposeOption } from "echarts/core";
import { useContext, useEffect, useRef } from "react";
import {
  SeriesOption,
  TitleComponentOption,
  TooltipComponentOption,
} from "echarts";
import { MapSeriesOption } from "echarts/types/dist/shared";
import sicuanData from "./sicuan.json";
import { mark_List } from "@pages/index";
import router from "next/router";
import { MyContext } from "@components/MyContext/MyContext";

type ECOption = ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | MapSeriesOption
  | SeriesOption
  | TooltipComponentOption
>;

const markIconMap = new Map<number, string>([
  [1, "/images/Vector-6.png"],
  [2, "/images/Vector-8.png"],
  [3, "/images/Vector-9.png"],
]);



const MapChart = ({
  markList,
  checkMack,
}: {
  markList: mark_List;
  checkMack: (id: string) => void;
}) => {
  const chartRef: any = useRef(null);
  let myChart: echarts.ECharts | null | void = null;
  const { dispatch } = useContext(MyContext) as any;
  let line: any = [];
  markList.forEach((item, index) => {
    if (index < markList.length - 1) {
      const setOff: number[] = [item.value[0], item.value[1]] as number[];
      const setOn: number[] = [
        markList[index + 1].value[0],
        markList[index + 1].value[1],
      ] as number[];
      line.push({
        coords: [setOff, setOn],
      });
    }
  });
  const options: ECOption = {
    backgroundColor: "rgba(0,0,0,0)",
    geo: {
      map: "sicuan",
      type: "map",
      geoIndex: 1,
      zoom: 1.4, //地图的比例
      label: {
        show: true,
        position: "top",
        distance: 10,
        textStyle: {
          color: "#FFF", //字体颜色
        },
      },
      itemStyle: {
        areaColor: "rgba(221, 238, 223, 0.5)",
        borderColor: "#639180",
        emphasis: {
          areaColor: "rgba(216, 241, 220, 0.8)",
        },
      },
      tooltip: {
        trigger: "item",
        show: true,
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "rgba(0,0,0,0)",
        padding: [0, 1, 1, 1],
        showContent: true,
        formatter: (params: any) => {
          if (params.componentSubType !== "effectScatter") {
            return "";
          } else {
            checkMack(params.data.id);
            const sameMarkList = markList.filter((item) => {
              return (
                item.id != params.data.id &&
                item.value[0] == params.data.value[0] &&
                item.value[1] == params.data.value[1]
              );
            });
            let tooltips = [];
            tooltips.push(params.data);
            sameMarkList.length > 0 && tooltips.push(...sameMarkList);
            let tipDom = "";
            tipDom = `
              <div>
                ${tooltips
                  .map((item, index) => {      
                    return `<div class="active-tooltip" style="text-align: left; background: #E3EEEA; border-radius: 5px; padding: 6px; transition: all 0.3s ease-in-out;  pointer-events: auto; ${
                      index + 1 == tooltips.length &&
                      tooltips.length != 1 &&
                      "margin-bottom: 10px;"
                    } ">
                    <img src=${markIconMap.get(item.id)}>
                    <span style="font-size: 16px;color: #000;">${
                      item.name
                    }</span>
                    <br/>
                    <span>
                        <span style="font-size: 12px;color: #778399;">${
                          item.id == 3 ? "碳汇量" : "碳排放量"
                        }</span>
                        <span style="font-size: 16px;color: #052835;">${
                          item.value[2] || 0.0
                        }</span>
                    <span style=" background: #F6CD7D; border-radius: 37px;padding: 2px 6px; font-size: 12px;">tCO2e</span>
                    </span>
                    <div id="seeMore"  style="margin-top:5px; 
                    pointer-events: auto; 
                    color: #005eaf;
                    text-align: right;
                    font-size: 12px;
                   "  onclick = "seeMore(${item.id})">查看更多></div>
                  </div>`;
                  })
                  .reverse()
                  .join(" ")}
              </div>
          `;
            return tipDom;
          }
        },
      },
    },

    series: [
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        rippleEffect: {
          //涟漪特效
          number: 2, //涟漪的最大值
        },
        symbol: (value, params) => {
           if((params.data as any).id == 1){
            return  "image:///images/halo3.png"
          }else{
            return  "image:///images/halo.png"
          }
          
        },
        symbolSize: [70, 70],
        symbolOffset: [0, "-10%"],
        data: markList,
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        rippleEffect: {
          //涟漪特效
          number: 0, //涟漪的最大值
        },
        symbol:(value, params) => {          
          if((params.data as any).id == 1){
            return  "image:///images/mark2.png"
          }else{
            return  "image:///images/mark.png"
          }
        },
        symbolSize: [30, 52],
        symbolOffset: [0, "-50%"],
        data: markList,
      },
      {
        type: "lines",
        coordinateSystem: "geo",
        lineStyle: {
          width: 5,
          opacity: 1,
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: "rgb(6,205,162)",
              },
              {
                offset: 1,
                color: "rgb(246,205,125)",
               
              },
            ],
          },
        },
        data: line,
      },
    ],

    tooltip: {
      show: true,
      trigger: "item",
      triggerOn: "click",
      alwaysShowContent: true,
    },
  };

  async function renderChart() {
    myChart = echarts.init(document.getElementById("Map") as HTMLDivElement);
    let data: any = sicuanData;
    echarts.registerMap("sicuan", data);
    (myChart as any).setOption(options);
    myChart.dispatchAction({
      type: "showTip",
      seriesIndex: 0, //第几条series
      dataIndex: 0, //显示第几个tooltip
      position: (point: any, params: any) => {},
    });

    (window as any).seeMore = (id: any) => {
      dispatch({
        type: "UPDATE_PARK_ID",
        payload: id,
      });
      router.push("/parkFootprint");
    };
  }

  function again() {
    return (myChart as echarts.ECharts).resize();
  }

  function debounce(fn: () => void, wait: number | undefined) {
    let timer: string | number | NodeJS.Timeout | null | undefined = null;
    return function () {
      if (timer !== null) {
        clearTimeout(timer);
      }
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
  }, [markList]);

  return (
    <div className="mapChart" style={{ textAlign: "center" }}>
      <div
        id="Map"
        ref={chartRef}
        style={{ height: "100vh", width: "100%" }}
      ></div>
    </div>
  );
};

export default MapChart;
