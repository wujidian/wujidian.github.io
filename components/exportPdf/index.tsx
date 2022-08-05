import exportPDF from "@public/exportPDF";
import { Modal, Checkbox, Space, DatePicker } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useEffect, useState } from "react";
import { createParkReport } from "types/types";
import styles from "./index.module.sass";


const ExportPdf = ({
  pdfShow,
  onCancel,
  pdfParkInfo,
}: {
  pdfShow: boolean;
  onCancel: () => void;
  pdfParkInfo: createParkReport["data"];
}) => {
  const exportpdf = () => {
    let name = "";
    let domName = "pdfDOM";
    exportPDF(name, domName);
  };

  return (
    <div>
      <Modal
        title="预览"
        centered
        visible={pdfShow}
        width={1000}
        bodyStyle={{ height: "50vh", overflowY: "scroll" }}
        onOk={() => exportpdf()}
        onCancel={onCancel}
        okText="导出"
        cancelText="取消"
      >
        <div id="pdfDOM">
          {pdfParkInfo.name && (
            <div className={styles.pdfBox}>
              <div className={styles.title}>CID</div>
              <div className={styles.cid}>{pdfParkInfo.cid}</div>
              <div className={styles.title}>基本信息</div>
              <div className={styles.infoBox}>
                <span>园区/企业名称 </span>
                <span>{pdfParkInfo.name}</span>
              </div>
              <div className={styles.infoBox}>
                <span>类型</span>
                <span>{pdfParkInfo.type}</span>
              </div>
              <div className={styles.infoBox}>
                <span>地址</span>
                <span>{pdfParkInfo.address}</span>
              </div>
              <div className={styles.infoBox}>
                <span>时间</span>
                <span>{pdfParkInfo.create_time}</span>
              </div>
              <div className={styles.title}>排放信息</div>
              {pdfParkInfo.emissionInfo.map((item, index: number) => {
                return (
                  <div className={styles.infoBox} key={index}>
                    <span>{item.name} （KWH）</span>
                    <span>{item.emissionLoad}</span>
                  </div>
                );
              })}
              <div className={styles.title}>明细</div>
              <div className={styles.detailsTitle}>
                <span></span>
                <span className={styles.name}>能源名称</span>
                <span>消费量（KWH）</span>
                <span>CO2排放因子 （kgCO2/KWH）</span>
                <span>CO2排放量（kg）</span>
              </div>
              <div className={styles.details}>
                {pdfParkInfo.details.map((item, index) => {
                  return (
                    <div key={index} className={styles.detailsItemBox}>
                      <span className={styles.activityName}>
                        {item.activityName}
                      </span>
                      <div
                        className={`${styles.detailsItem} ${styles.detailsItemName}`}
                      >
                        {item.list.map((details, i) => {
                          return <span key={i}>{details.energy_name}</span>;
                        })}
                      </div>
                      <div className={styles.detailsItem}>
                        {item.list.map((details, i) => {
                          return <span key={i}>{details.emission}</span>;
                        })}
                      </div>
                      <div className={styles.detailsItem}>
                        {item.list.map((details, i) => {
                          return (
                            <span key={i}>{details.emission_factors}</span>
                          );
                        })}
                      </div>
                      <div className={styles.detailsItem}>
                        {item.list.map((details, i) => {
                          return <span key={i}>{details.emission_load}</span>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
export default ExportPdf;
