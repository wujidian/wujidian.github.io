import style from "./ParkCard.module.sass";
export interface ParkCardData {
  parkName: string;
  parkLoc: string;
  parktype: string;
  parknum?: number;
  area?: number | string;
  create_time?: string;
}
const ParkCard = (ParkCardData: ParkCardData) => {
  const { parkName, parkLoc, parktype, parknum, area, create_time } =
    ParkCardData;
  return (
    <div className={style.ParkCard}>
      <img
        className={style.industry}
        src={
          parkName == "德阳工业园区"
            ? "/images/industry.png"
            : parkName == "绿电基地"
            ? "/images/industry3.png"
            : "/images/industry.png"
        }
        alt=""
      />
      <div className={style.parkInfoBox}>
        <span className={style.parkName}>{parkName}</span>
        <span className={style.parkLoc}>{parkLoc}</span>
        <div className={style.parkInfoItem}>
          <div className={style.phoneRow}>
            <span className={style.parkInfoTitle}>类型</span>
            <span className={style.parkInfoCentent}>{parktype}</span>
          </div>
          {parknum && (
            <div className={style.phoneRow}>
              <span className={style.parkInfoTitle}>企业数</span>
              <span className={style.parkInfoCentent}>{parknum}</span>
            </div>
          )}
          {area && (
            <div className={style.phoneRow}>
              <span className={style.parkInfoTitle}>面积</span>
              <span className={style.parkInfoCentent}>{area}</span>
              <div className="goldenlabel">平方公里</div>
            </div>
          )}
          {create_time && (
            <div className={style.phoneRow}>
              <span className={style.parkInfoTitle}>入驻时间</span>
              <span className={style.parkInfoCentent}>{create_time}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ParkCard;
