import type { NextPage } from "next";
import MapChart from "@components/MapChart/MapChart";
import LineBarChart from "@components/LineBarChart/LineBarChart";
import { useEffect, useState } from "react";
import { GET_INDEX_INFO_API } from "@request/apis";
import { getLoc } from "@public/index";
export type mark_List = Array<{
  id: number;
  toDay_data: string | number;
  name: string;
  value: Array<string | number>;
  park_xAxisData: Array<string>;
  park_seriesData: Array<string>;
}>;
const locToDay = new Date().toLocaleDateString();
const totalData = [
  {
    name: "绿电累计发电量",
    value: "15456 kWh",
  },
  {
    name: "园区累计用电量",
    value: "15 kWh",
  },
  {
    name: "园区今日用电量",
    value: "1515万 kWh",
  },
  {
    name: "园区本月发电量",
    value: "1515万 kWh",
  },
];
const Index: NextPage = ({ children }: any) => {
  let [markList, setmarkList] = useState<mark_List>([]);
  useEffect(() => {
    getIndexInfo();
  }, []);

  const getIndexInfo = async () => {
    let info = await GET_INDEX_INFO_API();
    const markListRes = info.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        value: [...item.location.coordinates, item.emissionLoad],
        park_xAxisData: [...item.dataList.map((item) => item.startTime)],
        park_seriesData: [...item.dataList.map((data) => data.emissionLoad)],
        toDay_data: item.emissionLoad,
      };
    });

    setmarkList([...markListRes]);
  };
  return (
    <div className="parkOverview">
      <div className="map">
        <MapChart markList={markList}></MapChart>
      </div>
      <div className="index-left">
        <div className="top-left-box">
          <div className="text-box">
            <div className="title-box">
              <div className="line"></div>
              <span className="title">园区碳总览</span>
            </div>
          </div>
        </div>
        <div>
          {markList.map((item, index) => {
            return (
              <div key={index} className="m24 ml24">
                <LineBarChart
                  park_name={item.name}
                  park_color={""}
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
        <div className="index-right-item">
          {totalData.map((item, index) => {
            return (
              <div key={index}>
                <span>{item.value}</span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
        <div className="index-right-item">
          {totalData.map((item, index) => {
            return (
              <div key={index}>
                <span>{item.value}</span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Index;
