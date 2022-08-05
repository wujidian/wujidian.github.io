import InfoTable from "@components/InfoTable/InfoTable";
import ParkCard, { ParkCardData } from "@components/ParkCard/ParkCard";
import TotalCount, { TotalCountData } from "@components/TotalCount/TotalCount";
import { ColumnsType } from "antd/lib/table";
import type { NextPage } from "next";
import { overviewData, park_Info } from "types/types";
import CheckDetailsBTN from "@components/CheckDetailsBTN/CheckDetailsBTN";
import Router from "next/router";
import {
  GET_ENTERPRISE_CARBON_LIST_API,
  GET_PARK_CARBON_INFO_API,
} from "@request/apis";
import { useContext, useEffect, useState } from "react";
import { MyContext } from "@components/MyContext/MyContext";
import MySkeleton from "@components/MySkeleton";

/**
 * 数据
 * */

type info = ParkCardData & TotalCountData;
const EnterpriseFootprint: NextPage = () => {
  const { state, dispatch } = useContext(MyContext) as any;
  const { parkId } = state;
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
  const [tableData, setTableData] = useState<overviewData[]>([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [parkInfoLoading, setParkInfoLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const columns: ColumnsType<overviewData> = [
    {
      title: "企业ID",
      dataIndex: "enterpriseID",
      key: "enterpriseID",
      render: (item: overviewData["enterpriseID"]) => {
        return (
          <div>
            <div>{item.title}</div>
            <div>{item.subtitle}</div>
          </div>
        );
      },
    },
    {
      title: "企业类型",
      dataIndex: "enterpriseType",
      key: "enterpriseType",
    },
    {
      title: "统计时间",
      dataIndex: "statisticsTime",
      key: "statisticsTime",

      render: (item: overviewData["statisticsTime"]) => {
        return (
          <div>
            <img src="/images/icon-time.png" alt="" />
            <span> {item}</span>
          </div>
        );
      },
    },
    {
      title: "碳排放量",
      dataIndex: "emissions",
      key: "emissions",
      render: (emissions) => {
        return (
          <div>
            <span>{emissions} </span>
            <div className="goldenlabel">tCO2e</div>
          </div>
        );
      },
      sorter: (a, b) => Number(a.emissions) - Number(b.emissions),
      showSorterTooltip: false,
    },
    {
      title: "查看",
      dataIndex: "",
      key: "x",
      render: (e) =>
        CheckDetailsBTN({
          btnClickFun: () => {

            dispatch({
              type: "UPDATE_ENTERPRISE_FOOTPRINT_INFO_ID",
              payload: e.id,
            });
            Router.push("/enterpriseFootprint/info");
          },
          btnText: "查看详情",
        }),
    },
  ];

  /**获取企业碳足迹园区信息*/
  const getEnterpriseInfo = async () => {
    setParkInfoLoading(false);
    try {
      let res = await GET_PARK_CARBON_INFO_API(parkId);
      setparkInfo(res.data);
    } catch {}
    setParkInfoLoading(true);
  };
  /**获取企业碳足迹园区企业列表*/
  const getEnterpriseList = async () => {
    setTableLoading(false);
    try {
      let res = await GET_ENTERPRISE_CARBON_LIST_API(parkId);
      const tableData = res.data.data.map((item, i) => {
        return {
          id: item.id,
          key: i.toString(),
          enterpriseID: {
            title: item.name,
            subtitle: item.address,
          },
          enterpriseType: item.type,
          statisticsTime: item.startTime,
          emissions: item.emissionLoad,
        };
      });
      setTableData([...tableData]);
    } catch {}
    setTableLoading(true);
  };

  useEffect(() => {
    getEnterpriseInfo();
    setPageIndex(1);
  }, [parkId]);

  useEffect(() => {
    getEnterpriseList();
  }, [parkId, pageIndex]);

  return (
    <div className="enterpriseFootprint">
      <div className="topCardBox">
        <div className="parkcard-box">
          {parkInfoLoading ? (
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
          {parkInfoLoading ? (
            <TotalCount
              title="园区本年度碳排放总量"
              total={parkInfo.emissionLoad}
              addOrsub={false}
              deviation={parkInfo.reduce}
            />
          ) : (
            <MySkeleton />
          )}
        </div>
      </div>

      <div className="m24 flex jcsbcentennt">
        <div>
          <span className="pageTitle">企业碳排放概览 </span>
          <span className="mr5"> 生成依据 </span>
          <span className="blueTip">{
            parkId == 3 ? '《林业碳汇项目审定和核证指南》GB/T 41198-2021' : '《企业温室气体排放核算方法与报告指南》'
          }</span>
        </div>
       
      </div>

          
      <div className="infoTable-box">
        {tableLoading ? (
          <InfoTable columns={columns} data={tableData}></InfoTable>
        ) : (
          <MySkeleton rows={20} />
        )}
      </div>
    </div>
  );
};

export default EnterpriseFootprint;
