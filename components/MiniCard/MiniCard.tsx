import style from "./MiniCard.module.sass";

/**
 * @param emissions 碳排放量
 * */

export type MiniCardProps = {
  id: string | number;
  title: string;
  iconImg: string;
  time: string;
  emissions?: string;
  type?: string;
  linkFun?: () => void;
  appendButto?: JSX.Element | any;
  dataTitle?: string;
  children?: JSX.Element | any;
};

const MiniCard = (MiniCardProps: MiniCardProps) => {
  const { title, iconImg, time, emissions, appendButto, linkFun, type,dataTitle,children } =
    MiniCardProps;
  return (
    <div className={style.miniCardBox} onClick={linkFun}>
      
      <div className={style.miniCardIconBox}>
        <img src={iconImg} alt="" />
        <span>{title}</span>
      </div>
      {type != undefined && (
        <div className={style.miniCardTimeBox}>
          <span className={style.tipsTitle}>活动类型</span>
          <span className={style.miniCardIconBox}>
            <span>{type || '暂无信息'}</span>
          </span>
        </div>
      )}
      <div className={style.miniCardTimeBox}>
        <span className={style.tipsTitle}>日期</span>
        <span className={style.miniCardIconBox}>
          <img src="/images/icon-time.png" alt="" />
          <span className={style.time}>{time}</span>
        </span>
      </div>
      {emissions && (
        <div className={style.miniCardTipsTitleBox} style={appendButto && {width:"100%"}}>
          <span className={style.tipsTitle}>{dataTitle || '碳排放量'}</span>
          <div>
            <span className={style.emissions}>{emissions}</span>
            <span className="goldenlabel">tCO2e</span>
          </div>
        </div>
      )}
      {appendButto}
      
    </div>
  );
};

export default MiniCard;
