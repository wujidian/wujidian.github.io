import type { NextPage } from "next";
import MapChart from "@components/MapChart/MapChart";
import LineBarChart from "@components/LineBarChart/LineBarChart";
import { useContext, useEffect, useState } from "react";
import { GET_INDEX_INFO_API } from "@request/apis";
import { getLoc } from "@public/index";
import { MyContext } from "@components/MyContext/MyContext";
import router from "next/router";
export type mark_List = Array<{
  park_color: string;
  id: number;
  toDay_data: string | number;
  name: string;
  value: Array<string | number>;
  park_xAxisData: Array<string>;
  park_seriesData: Array<string>;
}>;

const locToDay = new Date().toLocaleDateString();
type totalDataType = Array<{ name: string; value: string }>;
const defaultTotalData: totalDataType[] = [
  [
    {
      name: "园区企业数",
      value: "15 家",
    },
    {
      name: "园区累计用电量",
      value: "108.56亿 kWh",
    },
    {
      name: "园区本月用电量",
      value: "182.12万 kWh",
    },
    {
      name: "园区今日用电量",
      value: "55.36万 kWh",
    },
  ],
  [
    {
      name: "累计碳排放量",
      value: "136237.23   tCO2e",
    },
    {
      name: "本月碳排放量    ",
      value: "12458.89    tCO2e",
    },
    {
      name: "本年度碳配额指标",
      value: "156723.09    tCO2e",
    },
    {
      name: "节省碳配额",
      value: "20485.86    tCO2e",
    },
  ],
];
const defaultForestAreaData: totalDataType[] = [
  [
    {
      name: "实时总功率",
      value: "50509.44   kW",
    },
    {
      name: "装机总容量    ",
      value: "442566.70    kVA",
    },
    {
      name: "累计发电量",
      value: "120.56亿   kWh",
    },
    {
      name: "本月发电量",
      value: "1347.23万    kWh",
    },
  ],
  [
    {
      name: "累计碳排放量",
      value: "0   tCO2e",
    },
    {
      name: "累计碳信用(碳汇)",
      value: "34612.89    tCO2e",
    },
    {
      name: "累计碳信用(新能源)",
      value: "796.23   tCO2e",
    },
    {
      name: "",
      value: "",
    },
  ],
];
export const markColorMap = new Map([
  [1, "rgba(246, 205, 125, 1)"],
  [2, "rgba(6, 205, 162, 1)"],
  [3, "rgba(30, 167, 255, 1)"],
]);
const Index: NextPage = ({ children }: any) => {
  let [markList, setmarkList] = useState<mark_List>([]);
  const [totalData, setTotalData] = useState<totalDataType[]>(defaultTotalData);
  const [markId, setMarkId] = useState<string>("1");
  const { state, dispatch } = useContext(MyContext) as any;
  const { parkId } = state;

  useEffect(() => {
    getIndexInfo();
  }, []);

  const checkMack = (id: string) => {
    if (id == "1") {
      setTotalData([...defaultTotalData]);
    } else {
      setTotalData([...defaultForestAreaData]);
    }
    setMarkId(id);
  };

  const getIndexInfo = async () => {
    let info = await GET_INDEX_INFO_API();
    const markListRes = info.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        value: [...item.location.coordinates, item.emissionLoad, item.id],
        park_xAxisData: [...item.dataList.map((item) => item.startTime)],
        park_seriesData: [...item.dataList.map((data) => data.emissionLoad)],
        park_color: markColorMap.get(item.id) as string,
        toDay_data: item.emissionLoad,
      };
    });

    setmarkList([...markListRes]);
  };
  return (
    <div className="parkOverview">
      <div className="map">
        <MapChart
          markList={markList}
          checkMack={(id) => checkMack(id)}
        ></MapChart>
      </div>
      <div className="index-left">
        <div className="top-left-box">
          <div className="text-box">
            <div className="img-rotate"></div>
            <div className="title-box">
              <div className="title-box-text">
                <div className="line"></div>
                <span className="title">园区碳总览</span>
              </div>
              <div className="mark-item-box">
                {markList.map((item, i) => (
                  <div key={i}>
                    <i style={{border:`3px solid ${item.park_color}` }}></i>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          {markList.map((item, index) => {
            return (
              <div key={index} className="m10 ml24">
                <LineBarChart
                  park_name={item.name}
                  park_color={item.park_color}
                  toDay={locToDay}
                  toDay_data={item.toDay_data}
                  park_xAxisData={item.park_xAxisData}
                  park_seriesData={item.park_seriesData}
                ></LineBarChart>
              </div>
            );
          })}
        </div>
      </div>
      <div className="index-right">
        {totalData.map((item, index) => {
          return (
            <div key={index}>
              <div className="index-right-item">
                {item.map((data, i) => {
                  return (
                    <div key={i}>
                      <span>{data.value}</span>
                      <span>{data.name}</span>
                    </div>
                  );
                })}
              </div>
              {index == 0 && <div className="line"></div>}
              {index == totalData.length - 1 && (
                <div
                  className="seeMore"
                  onClick={() => {
                    markId == "1"
                      ? dispatch({
                          type: "UPDATE_PARK_ID",
                          payload: markId,
                        })
                      : dispatch({
                          type: "UPDATE_PARK_ID",
                          payload: "2",
                        });
                    router.push("/parkFootprint");
                  }}
                >
                  查看更多
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="WordID">© 2022 绿色碳链 All Rights Reserved.</span>
    </div>
  );
};

export default Index;
