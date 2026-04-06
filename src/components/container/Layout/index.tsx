import InstitutionMenuFilter from "@containers/Home/Institution/MenuFilter";
import LayoutHeader from "@containers/Layout/LayoutHeader";
import moment from "moment";
import React, { ReactNode, useState } from "react";

type PropsType = {
  children: ReactNode;
};

const Layout = ({ children }: PropsType) => {
  const [valueYear, setValueYear] = useState<number>(() => {
    const date = moment().format("DD/MM/YYYY");
    const [_day, _month, year] = date.split("/");

    return Number(year);
  });
  const [valueMonth, setValueMonth] = useState<string>(() => {
    const date = moment().format("DD/MM/YYYY");
    const [_day, month, _year] = date.split("/");

    return month;
  });

  return (
    <div>
      <LayoutHeader />
      <InstitutionMenuFilter
        valueMonth={valueMonth}
        valueYear={valueYear}
        setValueMonth={setValueMonth}
        setValueYear={setValueYear}
        setIsLoading={() => false}
      />
      {children}
    </div>
  );
};

export default Layout;
