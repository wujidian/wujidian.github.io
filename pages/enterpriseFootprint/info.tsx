import { InfoCardData } from "@components/InfoCard/InfoCard";
import LineChart from "@components/LineChart/LineChart";
import MiniCard, { MiniCardProps } from "@components/MiniCard/MiniCard";
import { MyContext } from "@components/MyContext/MyContext";
import MySkeleton from "@components/MySkeleton";
import ParkCard from "@components/ParkCard/ParkCard";
import TotalCount from "@components/TotalCount/TotalCount";
import {
  GET_ENTERPRISE_CARBON_DAY_BASE_API,
  GET_ENTERPRISE_CARBON_ECHARTS_DATA_API,
  GET_ENTERPRISE_CARBON_INFO_API,
} from "@request/apis";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { company_Info } from "types/types";

const EnterpriseFootprintInfo: NextPage = () => {
  const { state, dispatch } = useContext(MyContext) as any;
  const { enterpriseFootprintInfoId } = state;
  const router = useRouter();
  const toInfo = (id: string | number) => {
    router.push(`/enterpriseFootprint/details`);
    dispatch({
      type: "UPDATE_ENTERPRISE_FOOTPRINT_DETAILS_ID",
      payload: id,
    });
  };
  /**公司详情*/
  const [companyDetails, setCompanyDetails] = useState<company_Info["data"]>({
    address: "暂无信息",
    create_time: "暂无信息",
    emissionLoad: "暂无信息",
    id: 2,
    name: "暂无信息",
    reduce: "暂无信息",
    type: "暂无信息",
  });
  /**卡片列表*/
  const [miniCardList, setMiniCardList] = useState<MiniCardProps[]>([]);
  /**echarts 折线图数据*/
  const [park_xAxisData, setPark_xAxisData] = useState<number[] | string[]>([]);
  const [park_carbonEquivalent, setpark_carbonEquivalent] = useState<
    string[] | number[]
  >([]);
  const [park_emissionLoadData, setpark_emissionLoadData] = useState<
    string[] | number[]
  >([]);
  const [timeType, setTimeType] = useState("1");
  const [enterpriseInfoLoding, setEnterpriseInfoLoding] = useState(true);
  const [enterpriseEchartsLoding, setEnterpriseEchartsLoding] = useState(true);
  const [enterpriseDayBaseLoding, setEnterpriseDayBaseLoding] = useState(true);

  /**获取企业详细信息*/
  const getEnterpriseInfo = async () => {
    setEnterpriseInfoLoding(false);
    try {
      let companyDetails = await GET_ENTERPRISE_CARBON_INFO_API(
        enterpriseFootprintInfoId
      );
      setCompanyDetails(companyDetails.data);
    } catch {}
    setEnterpriseInfoLoding(true);
  };
  /**获取企业Echarts数据*/
  const getEnterpriseEchartsData = async () => {
    setEnterpriseEchartsLoding(false);
    try {
      let echartsData = await GET_ENTERPRISE_CARBON_ECHARTS_DATA_API(
        enterpriseFootprintInfoId,
        timeType
      );
      let xAxisData: string[] = [];
      let park_carbonEquivalent: string[] = [];
      let park_emissionLoadData: string[] = [];
      echartsData.data.forEach((element) => {
        xAxisData.push(element.start_time);
        park_carbonEquivalent.push(element.carbonEquivalent);
        park_emissionLoadData.push(element.emissionLoad);
      });
      setPark_xAxisData([...xAxisData]);
      setpark_carbonEquivalent([...park_carbonEquivalent]);
      setpark_emissionLoadData([...park_emissionLoadData]);
    } catch {}
    setEnterpriseEchartsLoding(true);
  };

  /**获取企业每日数据列表*/
  const getEnterpriseDayBase = async () => {
    setEnterpriseDayBaseLoding(false);
    try {
      const statisticsInfo = await GET_ENTERPRISE_CARBON_DAY_BASE_API(
        enterpriseFootprintInfoId
      );
      const statisticsInfoData = statisticsInfo.data.map((item) => {
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
    setEnterpriseDayBaseLoding(true);
  };

  useEffect(() => {
    getEnterpriseInfo();
    getEnterpriseDayBase();
  }, [enterpriseFootprintInfoId]);
  useEffect(() => {
    getEnterpriseEchartsData();
  }, [enterpriseFootprintInfoId, timeType]);
  return (
    <div className="parkFootprint">
      <div className="m24">
        <div className="blueTip">
          <Link href="/enterpriseFootprint"> 返回 企业碳足迹</Link>
        </div>
      </div>

      <div className="topCardBox">
        <div className="parkcard-box">
          {enterpriseInfoLoding ? (
            <ParkCard
              parkName={companyDetails.name}
              parkLoc={companyDetails.address}
              parktype={companyDetails.type}
              create_time={companyDetails.create_time}
            />
          ) : (
            <MySkeleton />
          )}
        </div>
        <div className="TotalCount-box">
          {enterpriseInfoLoding ? (
            <TotalCount
              total={companyDetails.emissionLoad}
              addOrsub={false}
              deviation={companyDetails.reduce}
            />
          ) : (
            <MySkeleton />
          )}
        </div>
      </div>

      <div className="lineChartBox">
        {enterpriseEchartsLoding ? (
          <LineChart
            park_name={""}
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
                linkFun={() => toInfo(item.id)}
                time={item.time}
                title={item.title}
                iconImg={item.iconImg}
                emissions={item.emissions}
                key={i.toString()}
                id={item.id}
              ></MiniCard>
            );
          })
        ) : (
          <MySkeleton />
        )}
      </div>
    </div>
  );
};

export default EnterpriseFootprintInfo;
