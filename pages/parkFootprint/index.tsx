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
  CREATE_PARK_REPORT_API,
  GET_PARK_CARBON_INFO_API,
  GET_PARK_STATISTICS_API,
  GET_PARK_TABLE_INFO_API,
  GET_PARK_REPORT_LIST_API,
  VIEW_RECORDS_PDF_API,
} from "@request/apis";
import { useContext, useEffect, useState } from "react";
import { createParkReport, parkReportList, park_Info } from "types/types";
import { MyContext } from "@components/MyContext/MyContext";
import { Button, Checkbox, DatePicker, message, Modal } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import CheckDetailsBTN from "@components/CheckDetailsBTN/CheckDetailsBTN";

const ParkFootprint: NextPage = () => {
  const router = useRouter();
  const { RangePicker } = DatePicker;
  const { state, dispatch } = useContext(MyContext) as any;
  const { parkId } = state;
  const [checkBoxShow, setcheckBoxShow] = useState(false);
  const [pdfShow, setPdfShow] = useState(false);
  const [startTime, setStartTime] = useState<any>("");
  const [endTime, setEndTime] = useState<any>("");
  const [activeList, setActiveList] = useState<CheckboxValueType[]>([]);
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
  const [miniCardList, setMiniCardList] = useState<MiniCardProps[]>([
    {
      id: 0,
      title: "暂无消息",
      iconImg: "/images/Group.png",
      time: "暂无信息",
      emissions: "0.00",
    },
  ]);
  const [PDFExportRecords, setPDFExportRecords] = useState<
    parkReportList["data"]
  >([]);
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
  const [pdfParkInfo, setPdfParkInfo] = useState<createParkReport["data"] | {}>(
    {}
  );
  /**查看已经生成的报表*/
  const viewRecordsPDF = async (activeId: number | string) => {
    try {
      let res = await VIEW_RECORDS_PDF_API(activeId);

      setPdfParkInfo(res.data);
      setPdfShow(true);
    } catch {
      message.error("查看记录失败,请稍后重试");
    }
  };

  /**创建PDF报表*/
  const createReport = async () => {
    if (activeList.length === 0) {
      message.error("请选择报表类型");
      return;
    }
    if (!startTime || !endTime) {
      message.error("请选择日期");
      return;
    }
    setcheckBoxShow(false);
    let res = await CREATE_PARK_REPORT_API(parkId, {
      startTime,
      endTime,
      activityId: activeList.join(","),
    });
    setPdfParkInfo(res.data);
    setPdfShow(true);
  };

  const toParkFootprintInfo = (id: string | number) => {
    dispatch({
      type: "UPDATE_PARK_FOOTPRINT_INFO_ID",
      payload: id,
    });
    router.push(`/parkFootprint/info`);
  };
  /**获取园区信息*/
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

  /**获取园区信息*/
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
  /**获取园区详细信息*/
  const getActiveParkInfos = async (parkId: number) => {
    setActiveParkInfoShow(false);
    try {
      let res = await GET_PARK_STATISTICS_API(parkId);
      let statisticsInfoData = res.data.map((item) => {
        return {
          id: item.id,
          title: item.name,
          emissions: item.emissionLoad,
          time: item.startTime,
          iconImg: "/images/Group.png",
        };
      });      
      setMiniCardList([...statisticsInfoData]);
    } catch {}
    setActiveParkInfoShow(true);
  };
  /**获取园区碳核算报告*/
  const getPDFExportRecords = async (parkId: number) => {
    try {
      let res = await GET_PARK_REPORT_LIST_API(parkId);
      let PDFExportRecords = res.data.reverse()
      setPDFExportRecords([...PDFExportRecords]);
    } catch {}
  };

  useEffect(() => {
    if (parkId) {
      getParkInfo(parkId);
      getActiveParkInfos(parkId);
    }
  }, [parkId]);

  useEffect(() => {
    getparkEcharts(parkId, timeType);
  }, [parkId, timeType]);

  useEffect(() => {
    getPDFExportRecords(parkId);
  }, [parkId, pdfShow]);

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
              title={`${parkInfo.id==3?'林区本年度碳汇总量':"园区本年度碳排放总量"}`}
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
            park_name={`${parkInfo.id==3?'林区':"园区"}碳足迹`}
            toDay_data={0}
            park_xAxisData={park_xAxisData}
            park_carbonEquivalent={park_carbonEquivalent}
            park_emissionLoad={park_emissionLoadData}
            setTimeType={(timeType) => setTimeType(timeType)}
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
        <MySkeleton rows={8}></MySkeleton>
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

      <div className="m24 flex jcsbcentennt">
        <div>
          <span className="pageTitle">{`${parkInfo.id==3?'林区':"园区"}碳核算报告`}</span>
          <span className="mr5"> 生成依据 </span>
          <span className="blueTip">ISO-14064碳核算标准</span>
        </div>
        <button className="viewRecords" onClick={() => setcheckBoxShow(true)}>
          生成报告
        </button>
      </div>

      <div>
        {PDFExportRecords.map((item, i) => {
          return (
            <MiniCard
              id={item.id}
              time={item.create_time}
              title={item.name}
              iconImg="/images/Group.png"
              type={item.activity_name}
              key={i.toString()}
              appendButto={
                <CheckDetailsBTN
                  btnText="查看报告"
                  btnClickFun={() => {
                    viewRecordsPDF(item.id);
                  }}
                />
              }
            ></MiniCard>
          );
        })}
      </div>

      <Modal
        title="选择报告"
        visible={checkBoxShow}
        onOk={() => {
          createReport();
        }}
        onCancel={() => setcheckBoxShow(false)}
        cancelText="取消"
        okText="确定"
      >
        <div style={{ margin: "0 0 40px 0" }}>
          <Checkbox.Group
            options={miniCardList.map((item, i) => {
              return {
                label: item.title,
                value: item.id,
              };
            })}
            defaultValue={activeList}
            onChange={(e) => {
              setActiveList(e);
            }}
          />
        </div>
        <RangePicker
          format="YYYY/MM/DD"
          onChange={(e) => {
            if (e) {
              setStartTime((e as any)[0].format("YYYY-MM-DD"));
              setEndTime((e as any)[1].format("YYYY-MM-DD"));
            } else {
              setStartTime("");
              setEndTime("");
            }
          }}
        />
      </Modal>
      <ExportPdf
        pdfShow={pdfShow}
        onCancel={() => setPdfShow(false)}
        pdfParkInfo={pdfParkInfo as createParkReport["data"]}
      />
    </div>
  );
};

export default ParkFootprint;
