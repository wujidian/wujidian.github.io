import LineChart from "@components/LineChart/LineChart";
import MiniCard, { MiniCardProps } from "@components/MiniCard/MiniCard";
import ParkCard from "@components/ParkCard/ParkCard";
import TotalCount from "@components/TotalCount/TotalCount";
import Mymap from "@components/Mymap/Mymap";
import MySkeleton from "@components/MySkeleton";
import ExportPdf from "@components/exportPdf";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  GET_PARK_CARBON_INFO_API,
  GET_PARK_STATISTICS_API,
  GET_PARK_TABLE_INFO_API,
} from "@request/apis";
import { useContext, useEffect, useState } from "react";
import { park_Info } from "types/types";
import { MyContext } from "@components/MyContext/MyContext";


const ParkFootprint: NextPage = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(MyContext) as any;
  const { parkId } = state;
  const [parkInfoShow, setParkInfoShow] = useState(true);
  const [parkEchartsShow, setParkEchartsShow] = useState(true);
  const [activeParkInfoShow, setActiveParkInfoShow] = useState(true);
  const [timeType, setTimeType] = useState("1");
  const [parkInfo, setparkInfo] = useState<park_Info["data"]>({
    id: 0,
    name: "暂无信息",
    area: "",
    num: 0,
    address: "暂无信息",
    emissionLoad: "0",
    region: "暂无信息",
    type: "暂无信息",
    reduce: "0.00",
    location: {
      coordinates: [0, 0],
      type: "Point",
    },
  });
  const [miniCardList, setTestMiniCardList] = useState<MiniCardProps[]>([
    {
      id: 0,
      title: "暂无消息",
      iconImg: "/images/Group.png",
      time: "暂无信息",
      emissions: "0.00",
    },
  ]);
  const [park_xAxisData, setPark_xAxisData] = useState<number[] | string[]>([]);
  const [park_carbonEquivalent, setpark_carbonEquivalent] = useState<
    string[] | number[]
  >([]);
  const [park_emissionLoadData, setpark_emissionLoadData] = useState<
    string[] | number[]
  >([]);
  const [laAndLo, setLaAndLo] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 30.572961,
    longitude: 104.066301,
  });

  const toParkFootprintInfo = (id: string | number) => {
    router.push(`/parkFootprint/info`);
    dispatch({
      type: "UPDATE_TYPE_ID",
      payload: id,
    });
  };

  const getParkInfo = async (parkId: number) => {
    setParkInfoShow(false);
    try {
      let res = await GET_PARK_CARBON_INFO_API(parkId);
      setparkInfo(res.data);
      setLaAndLo({
        latitude: res.data.location.coordinates[1],
        longitude: res.data.location.coordinates[0],
      });
    } catch (err) {}
    setParkInfoShow(true);
  };

  const getparkEcharts = async (parkId: number, timeType: string | number) => {
    setParkEchartsShow(false);
    try {
      let res = await GET_PARK_TABLE_INFO_API(parkId, timeType);
      let xAxisData: string[] = [];
      let park_carbonEquivalent: string[] = [];
      let park_emissionLoadData: string[] = [];
      res.data.forEach((element) => {
        xAxisData.push(element.startTime);
        park_carbonEquivalent.push(element.carbonEquivalent);
        park_emissionLoadData.push(element.emissionLoad);
      });
      setPark_xAxisData([...xAxisData]);
      setpark_carbonEquivalent([...park_carbonEquivalent]);
      setpark_emissionLoadData([...park_emissionLoadData]);
    } catch {}
    setParkEchartsShow(true);
  };

  const getActiveParkInfos = async (parkId: number) => {
    setActiveParkInfoShow(false);
    try {
      let res = await GET_PARK_STATISTICS_API(parkId);
      const statisticsInfoData = res.data.map((item) => {
        return {
          id: item.id,
          title: item.name,
          emissions: item.emissionLoad,
          time: item.startTime,
          iconImg: "/images/Group.png",
        };
      });
      setTestMiniCardList([...statisticsInfoData]);
    } catch {}
    setActiveParkInfoShow(true);
  };

  const timeTypeChange = (time: string) => {
    setTimeType(time);
    getparkEcharts(parkId, time);
  };

  useEffect(() => {
    if (parkId) {
      getParkInfo(parkId);
      getparkEcharts(parkId, timeType);
      getActiveParkInfos(parkId);
    }
  }, [parkId]);

  return (
    <div className="parkFootprint">
      <div className="topCardBox">
        <div className="parkcard-box">
          {parkInfoShow ? (
            <ParkCard
              parkName={parkInfo.name}
              parkLoc={parkInfo.address}
              parktype={parkInfo.type}
              parknum={parkInfo.num}
              area={parkInfo.area}
            />
          ) : (
            <MySkeleton />
          )}
        </div>
        <div className="TotalCount-box">
          {parkInfoShow ? (
            <TotalCount
              total={parkInfo.emissionLoad}
              addOrsub={false}
              deviation={parkInfo.reduce}
            />
          ) : (
            <MySkeleton />
          )}
        </div>
      </div>
      <div className="lineChartBox">
        {parkEchartsShow ? (
          <LineChart
            park_name={parkInfo.name}
            toDay_data={0}
            park_xAxisData={park_xAxisData}
            park_carbonEquivalent={park_carbonEquivalent}
            park_emissionLoad={park_emissionLoadData}
            setTimeType={(timeType) => timeTypeChange(timeType)}
            timeType={timeType}
          ></LineChart>
        ) : (
          <MySkeleton rows={8} />
        )}
      </div>
      {parkInfo.name !== "暂无信息" ? (
        <Mymap
          longitude={laAndLo.longitude}
          latitude={laAndLo.latitude}
          title={parkInfo.name}
        ></Mymap>
      ) : (
        <Mymap
          longitude='104.066301'
          latitude='30.572961'
          title='暂无信息'
        ></Mymap>
      )}
      <div>
        {activeParkInfoShow ? (
          <div>
            {miniCardList.map((item, i) => {
              return (
                <MiniCard
                  id={item.id}
                  linkFun={() => toParkFootprintInfo(item.id)}
                  time={item.time}
                  title={item.title}
                  iconImg={item.iconImg}
                  emissions={item.emissions}
                  key={i.toString()}
                ></MiniCard>
              );
            })}
          </div>
        ) : (
          <MySkeleton rows={8} />
        )}
      </div>
      <ExportPdf
        typeOptions={miniCardList.map((item, i) => {
          return {
            label: item.title,
            value: item.id,
          };
        })}
      ></ExportPdf>
    </div>
  );
};

export default ParkFootprint;
