import type { NextPage } from "next";
import Link from "next/link";
import InfoCard, { InfoCardData } from "@components/InfoCard/InfoCard";
import LineChart from "@components/LineChart/LineChart";
import MiniCard, { MiniCardProps } from "@components/MiniCard/MiniCard";
import TableModal from "@components/TableModal/TableModal";
import { useContext, useEffect, useState } from "react";
import CheckDetailsBTN from "@components/CheckDetailsBTN/CheckDetailsBTN";
import { ColumnsType } from "antd/lib/table";
import { detailsTable, park_Activity } from "types/types";
import { useRouter } from "next/router";
import {
  GET_PARK_ACTIVITY_INFO_API,
  GET_PARK_ACTIVITY_DAY_BASE_API,
  GET_PARK_ACTIVITY_ECHARTS_DATA_API,
  GET_PARK_ACTIVITY_DAY_BASE_DETAIL_API,
} from "@request/apis";
import { MyContext } from "@components/MyContext/MyContext";
import MySkeleton from "@components/MySkeleton";

const columns: ColumnsType<detailsTable> = [
  {
    title: "设备ID",
    dataIndex: "deviceID",
    key: "deviceID",
    render: (item: detailsTable["deviceID"]) => {
      return (
        <div>
          <div>{item.title}</div>
          <div>{item.subtitle}</div>
        </div>
      );
    },
  },
  {
    title: "企业ID",
    dataIndex: "enterpriseID",
    key: "enterpriseID",
    render: (item: detailsTable["enterpriseID"]) => {
      return (
        <div>
          <div>{item.title}</div>
          <div>{item.subtitle}</div>
        </div>
      );
    },
  },
  {
    title: "服务对象企业ID",
    dataIndex: "serviceenterpriseID",
    key: "serviceenterpriseID",
    render: (item: detailsTable["serviceenterpriseID"]) => {
      return (
        <div>
          <div>{item.title}</div>
          <div>{item.subtitle}</div>
        </div>
      );
    },
  },
  {
    title: "行为",
    dataIndex: "behavior",
    key: "behavior",
  },
  {
    title: "开始和结束时间",
    dataIndex: "startAndEndTime",
    key: "startAndEndTime",
  },
  {
    title: "排放气体",
    dataIndex: "exhaustGas",
    key: "exhaustGas",
  },
  {
    title: "排放量",
    dataIndex: "emissions",
    key: "emissions",
  },
  {
    title: "排放碳当量",
    dataIndex: "carbonEmissions",
    key: "carbonEmissions",
  },
];

const ParkFootprintInfo: NextPage = () => {
  const { state, dispatch } = useContext(MyContext) as any;
  const { parkId, parkFootprintInfoId } = state;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalShow, setmodalShow] = useState(false);
  const [avtiveInfo, setActiveInfo] = useState<park_Activity["data"]>({
    name: "暂无信息",
    emissionLoad: "暂无信息",
    activityName: "",
    reduce: 0,
  });
  const [testMiniCardList, setTestMiniCardList] = useState<MiniCardProps[]>([]);
  const [park_xAxisData, setPark_xAxisData] = useState<number[] | string[]>([]);
  const [park_carbonEquivalent, setpark_carbonEquivalent] = useState<
    string[] | number[]
  >([]);
  const [park_emissionLoadData, setpark_emissionLoadData] = useState<
    string[] | number[]
  >([]);
  const [tableData, setTableData] = useState<detailsTable[]>([]);
  const [timeType, setTimeType] = useState(1);
  const [parkInfoShow, setParkInfoShow] = useState(true);
  const [parkEchartsShow, setParkEchartsShow] = useState(true);
  const [activeParkInfoShow, setActiveParkInfoShow] = useState(true);
  const [modelTitle, setModelTitle] = useState('')

  /**获取园区详细信息*/
  const getParkDetaliInfo = async () => {
    setParkInfoShow(false);
    try {
      let res = await GET_PARK_ACTIVITY_INFO_API(parkId, parkFootprintInfoId);
      let data = res.data;
      setActiveInfo({ ...data });
    } catch {}
    setParkInfoShow(true);
  };

  /**获取园区eCharts详细信息*/
  const getParkDetaliEchartsInfo = async () => {
    setParkEchartsShow(false);
    try {
      let res = await GET_PARK_ACTIVITY_ECHARTS_DATA_API(
        parkId,
        parkFootprintInfoId,
        timeType
      );
      // echarts 的折线图数据
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

  /**获取园区每日基础数据*/
  const getParkDetaliDayBaseInfo = async () => {
    setParkEchartsShow(false);
    try {
      let res = await GET_PARK_ACTIVITY_DAY_BASE_API(
        parkId,
        parkFootprintInfoId
      );
      // 处理卡片列表的数据
      const statisticsInfoData = res.data.map((item) => {
        return {
          id: item.id,
          title: item.name,
          emissions: item.emissionLoad,
          time: item.startTime,
          iconImg: "/images/Group.png",
          appendButto: CheckDetailsBTN({
            btnClickFun: () => {
              checkDetails(item.id, item.name);
              setModelTitle(item.name);
            },
            btnText: "查看详情",
          }),
        };
      });
      setTestMiniCardList([...statisticsInfoData]);
    } catch {}
    setParkEchartsShow(true);
  };

  useEffect(() => {
    getParkDetaliInfo();
    getParkDetaliDayBaseInfo();
  }, [parkId, parkFootprintInfoId]);

  useEffect(() => {
    getParkDetaliEchartsInfo();
  }, [parkId, parkFootprintInfoId, timeType]);

  const checkDetails = async (id: number,name:string) => {
    let res = await GET_PARK_ACTIVITY_DAY_BASE_DETAIL_API(
      1,
      id,
      pageIndex,
      pageSize
    );
    let tableData: detailsTable[] = res.data.data.map((item, i) => {
      return {
        key: i.toString(),
        deviceID: {
          title: item.equipmentNo,
          subtitle: name,
        },
        enterpriseID: {
          title: item.serveName,
          subtitle: item.address,
        },
        serviceenterpriseID: {
          title: item.name,
          subtitle: item.address,
        },
        behavior:item.behavior,
        startAndEndTime: item.start_time,
        exhaustGas:item.gasType,
        emissions: item.emissionLoad,
        carbonEmissions: item.carbonEquivalent,
      };
    });
    setTableData([...tableData]);
    setmodalShow(true);
  };

  return (
    <div className="main ">
      <div className="m24">
        <div className="blueTip">
          <Link href="/parkFootprint"> 返回 园区碳足迹</Link>
        </div>
      </div>
      <div className="mt24">
        {parkInfoShow ? (
          <InfoCard
            name={avtiveInfo.activityName}
            loc={avtiveInfo.name}
            addOrSub={false}
            total={avtiveInfo.emissionLoad}
            deviation={avtiveInfo.reduce}
            totalTitle={parkId==3?"本年度累计碳汇量":"本年度碳排放总量"}
          ></InfoCard>
        ) : (
          <MySkeleton />
        )}
      </div>

      <div className="lineChartBox">
        {parkEchartsShow ? (
          <LineChart
            park_name={avtiveInfo.activityName}
            toDay_data={0}
            park_xAxisData={park_xAxisData}
            park_carbonEquivalent={park_carbonEquivalent}
            park_emissionLoad={park_emissionLoadData}
            setTimeType={(timeType) => setTimeType(Number(timeType))}
            timeType={timeType}
          ></LineChart>
        ) : (
          <MySkeleton rows={8} />
        )}
      </div>
      <div className="m24">
        <span className="pageTitle">每日基础数据 </span>
        <span className="mr5"> 生成依据 </span>
        <span className="blueTip">{
            parkId == 3 ? '《林业碳汇项目审定和核证指南》GB/T 41198-2021' : '《企业温室气体排放核算方法与报告指南》'
          }</span>
      </div>
      <div>
        {parkEchartsShow ? (
          testMiniCardList.map((item, i) => {
            return (
              <MiniCard
                id={item.id}
                dataTitle={parkId==3?"碳汇量":"碳排放量"}
                appendButto={item.appendButto}
                time={item.time}
                title={item.title}
                iconImg={item.iconImg}
                emissions={item.emissions}
                key={i.toString()}
              ></MiniCard>
            );
          })
        ) : (
          <MySkeleton />
        )}
      </div>
      <TableModal
        title={`${modelTitle}排放`}
        show={modalShow}
        onCancel={() => setmodalShow(false)}
        columns={columns}
        data={tableData}
      ></TableModal>
    </div>
  );
};
export default ParkFootprintInfo;
