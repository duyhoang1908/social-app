import { JSXElementConstructor, useEffect, useRef, useState } from "react";
import Header from "../Components/Header";

interface Props {
  children: any;
}

const LayoutWithHeader = ({ children }: Props) => {
  const [height, setHeight] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.clientHeight);
    }
  }, []);

  return (
    <div>
      <div ref={ref} className="shadow-sm">
        <Header></Header>
      </div>
      <div
        className="bg-primaryBg"
        style={{ height: `calc(100vh - ${height}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

export default LayoutWithHeader;
