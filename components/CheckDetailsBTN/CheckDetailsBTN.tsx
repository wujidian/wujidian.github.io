import { Button } from "antd";

interface checkDetailsBTNProps {
  btnText?: string | "查看详情";
  btnClickFun?: () => void;
}
export const btnStyel = {
  maxWidth: "120px",
  width: "100%",
  background: "#F1FCF8",
  color: "#10B482",
  border: "none",
};
const CheckDetailsBTN = (
  checkDetailsBTNProps: checkDetailsBTNProps = {
    btnText: "查看详情",
  }
) => {
  const { btnText, btnClickFun } = checkDetailsBTNProps;
  return (
    <Button onClick={btnClickFun} style={btnStyel} type="primary" shape="round">
      {btnText}
    </Button>
  );
};
export default CheckDetailsBTN;
