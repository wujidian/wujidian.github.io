import style from "./TotalCount.module.sass";
type add = true;
type sub = false;
export interface TotalCountData {
  title: string;
  total: number | string;
  addOrsub?: add | sub;
  deviation: string;
}
const TotalCount = (TotalCountData: TotalCountData) => {
  const { total, addOrsub, deviation,title } = TotalCountData;
  return (
    <div className={style.TotalCountBox}>
      <span className="TotalCountTitle">{title}</span>
      <div>
        <span className="TotalCountNum">{total}</span>
        <span className="goldenlabel">tCO2e</span>
      </div>
      <div className={style.line}></div>
      <div>
        <span className={style.addOrsub}>比去年{Number(deviation)>=0?'增加':'减少'}</span>
        <span className={Number(deviation)>=0?style.add:style.sub}>{deviation}%</span>
      </div>
    </div>
  );
};

export default TotalCount;
