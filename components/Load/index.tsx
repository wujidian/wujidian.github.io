import { MyContext } from "@components/MyContext/MyContext";
import { useContext } from "react";


const Pop = ({}: {}) => {
  const { state } = useContext(MyContext) as any;
  const { load } = state;
  return (
    <div>
      {load ? (
        <div className='loadBox'>
          <div
            style={{
              height: "128px",
              width: "128px",
              background: `url('/images/load.png') 100% no-repeat`,
              animation: "load 2s infinite linear",
            }}
          ></div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Pop;
