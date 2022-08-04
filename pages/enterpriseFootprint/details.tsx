import type { NextPage } from "next";
import Link from "next/link";
import InfoCard, { InfoCardData } from "@components/InfoCard/InfoCard";
import LineChart from "@components/LineChart/LineChart";
import MiniCard, { MiniCardProps } from "@components/MiniCard/MiniCard";
import TableModal from "@components/TableModal/TableModal";
import { useContext, useEffect, useState } from "react";
import CheckDetailsBTN from "@components/CheckDetailsBTN/CheckDetailsBTN";
import { ColumnsType } from "antd/lib/table";
import { company_Activity_Detail, detailsTable } from "types/types";
import {
  GET_CARBON_DAY_BASE_DETAIL_API,
  GET_ENTERPRISE_CARBON_DAY_BASE_DETAIL_API,
  GET_ENTERPRISE_CARBON_DAY_BASE_DETAIL_DETAIL_API,
  GET_ENTERPRISE_CARBON_ECHARTS_DATA_DETAIL_API,
} from "@request/apis";
import { MyContext } from "@components/MyContext/MyContext";
import MySkeleton from "@components/MySkeleton";

const data: detailsTable[] = [
  {
    key: "1",
    deviceID: {
      title: "川B.DF039",
      subtitle: "生产用车",
    },
    enterpriseID: {
      title: "绵阳佳乐生物科技有限公司",
      subtitle: "A区16号B座201",
    },
    serviceenterpriseID: {
      title: "绵阳佳乐生物科技有限公司",
      subtitle: "A区16号B座201",
    },
    behavior: "车辆运行",
    startAndEndTime: "2022/05/22 14:12 - 16:32",
    exhaustGas: "CO2",
    emissions: 0,
    carbonEmissions: 0,
  },
];
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

const EnterpriseFootprintDetails: NextPage = () => {
  const { state, dispatch } = useContext(MyContext) as any;
  const { enterpriseFootprintInfoId, enterpriseFootprintDetailsId } = state;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalShow, setmodalShow] = useState(false);
  const [timeType, setTimeType] = useState("1");
  const [avtiveInfo, setActiveInfo] = useState<company_Activity_Detail["data"]>(
    {
      id: 0,
      emissionLoad: "暂无信息",
      activityName: "暂无信息",
      reduce: 0,
      name: "暂无信息",
    }
  );
  const [miniCardList, setMiniCardList] = useState<MiniCardProps[]>([]);
  const [park_xAxisData, setPark_xAxisData] = useState<number[] | string[]>([]);
  const [park_carbonEquivalent, setpark_carbonEquivalent] = useState<
    string[] | number[]
  >([]);
  const [park_emissionLoadData, setpark_emissionLoadData] = useState<
    string[] | number[]
  >([]);
  const [tableData, setTableData] = useState<detailsTable[]>([]);
  const [enterpriseInfoLoding, setEnterpriseInfoLoding] = useState(true);
  const [enterpriseEchartsLoding, setEnterpriseEchartsLoding] = useState(true);
  const [enterpriseDayBaseLoding, setEnterpriseDayBaseLoding] = useState(true);
  const [modelTitle, setModelTitle] = useState("");

  /**获取企业碳足迹详情*/
  const checkDetails = async (id: number) => {
    let res = await GET_ENTERPRISE_CARBON_DAY_BASE_DETAIL_DETAIL_API(
      enterpriseFootprintInfoId,
      id,
      pageIndex,
      pageSize
    );
    let tableData: detailsTable[] = res.data.data.map((item, i) => {
      return {
        key: i.toString(),
        deviceID: {
          title: item.equipmentNo,
          subtitle: item.behavior,
        },
        enterpriseID: {
          title: item.serveName,
          subtitle: item.address,
        },
        serviceenterpriseID: {
          title: item.name,
          subtitle: item.address,
        },
        behavior: item.behavior,
        startAndEndTime: item.start_time,
        exhaustGas: item.gasType,
        emissions: item.emissionLoad,
        carbonEmissions: item.carbonEquivalent,
      };
    });
    setTableData([...tableData]);
    setmodalShow(true);
  };

  /**获取企业分类详情信息*/
  const getEnterpriseClassificationDetails = async () => {
    setEnterpriseInfoLoding(false);
    try {
      let res = await GET_ENTERPRISE_CARBON_DAY_BASE_DETAIL_API(
        enterpriseFootprintInfoId,
        enterpriseFootprintDetailsId
      );
      setActiveInfo(res.data);
    } catch {}
    setEnterpriseInfoLoding(true);
  };
  /**获取企业分类详情信息Echarts数据*/
  const getEnterpriseClassificatioEchartsData = async () => {
    setEnterpriseEchartsLoding(false);
    try {
      let res = await GET_ENTERPRISE_CARBON_ECHARTS_DATA_DETAIL_API(
        enterpriseFootprintInfoId,
        enterpriseFootprintDetailsId,
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
    setEnterpriseEchartsLoding(true);
  };
  /**获取企业每日基础数据*/
  const getEnterpriseDailyBaseData = async () => {
    setEnterpriseDayBaseLoding(false);
    try {
      let res = await GET_CARBON_DAY_BASE_DETAIL_API(
        enterpriseFootprintInfoId,
        enterpriseFootprintDetailsId
      );
      const statisticsInfoData = res.data.map((item) => {
        return {
          id: item.id,
          title: item.name,
          emissions: item.emissionLoad,
          time: item.startTime,
          iconImg: "/images/Group.png",
          appendButto: CheckDetailsBTN({
            btnClickFun: () => {
              checkDetails(item.id);
              setModelTitle(item.name);
            },
            btnText: "查看详情",
          }),
        };
      });
      setMiniCardList(statisticsInfoData);
    } catch {}
    setEnterpriseDayBaseLoding(true);
  };

  useEffect(() => {
    getEnterpriseClassificationDetails();
    getEnterpriseDailyBaseData();
  }, [enterpriseFootprintInfoId, enterpriseFootprintDetailsId]);

  useEffect(() => {
    getEnterpriseClassificatioEchartsData();
  }, [enterpriseFootprintInfoId, enterpriseFootprintDetailsId, timeType]);

  return (
    <div className="main ">
      <div className="m24">
        <div className="blueTip">
          <Link href="/enterpriseFootprint/info"> 返回 企业碳足迹</Link>
        </div>
      </div>
      <div className="mt24">
        {enterpriseInfoLoding ? (
          <InfoCard
            totalTitle="本年度碳排放总量"
            name={avtiveInfo.activityName}
            loc={avtiveInfo.name}
            addOrSub={false}
            total={avtiveInfo.reduce}
            deviation={avtiveInfo.emissionLoad}
          ></InfoCard>
        ) : (
          <MySkeleton />
        )}
      </div>

      <div className="lineChartBox">
        {enterpriseEchartsLoding ? (
          <LineChart
            park_name={`${avtiveInfo.activityName}碳足迹`}
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

      <div>
        {enterpriseDayBaseLoding ? (
          miniCardList.map((item, i) => {
            return (
              <MiniCard
                appendButto={item.appendButto}
                time={item.time}
                title={item.title}
                iconImg={item.iconImg}
                emissions={item.emissions}
                key={i.toString()}
                id={""}
              ></MiniCard>
            );
          })
        ) : (
          <MySkeleton />
        )}
      </div>
      <TableModal
        show={modalShow}
        onCancel={() => setmodalShow(false)}
        columns={columns}
        data={tableData}
        title={`${modelTitle}排放`}
      ></TableModal>
    </div>
  );
};
export default EnterpriseFootprintDetails;
