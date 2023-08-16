import React from "react";

import { Scontent, ScontentSelectedDate, SmonthItem } from "./styles";
import { ChevronDoubleLeft } from "@icons/ChevronDoubleLeft";
import { ChevronDoubleRight } from "@icons/ChevronDoubleRight";

interface DateType {
  name: string;
  number: string;
}

interface SelectDateType {
  valueYear: number;
  handlerYear: Function;
  valueMonth: string;
  selectDate: Function;
  dates: DateType[];
}

export const SelectDate = ({
  valueYear,
  handlerYear,
  valueMonth,
  selectDate,
  dates,
}: SelectDateType) => {
  function nextYear() {
    if (valueYear) handlerYear((prevValueYear: number) => prevValueYear + 1);
  }

  function previousYear() {
    if (valueYear) handlerYear((prevValueYear: number) => prevValueYear - 1);
  }

  return (
    <Scontent>
      <header>
        <ChevronDoubleLeft width="3rem" onClick={previousYear} />
        <span>{valueYear}</span>
        <ChevronDoubleRight width="3rem" onClick={nextYear} />
      </header>

      <ScontentSelectedDate>
        {dates.map((date) => (
          <SmonthItem
            isSelected={valueMonth === date.number}
            key={date.number}
            onClick={() => {
              selectDate(date.number, valueYear);
            }}
          >
            {date.name}
          </SmonthItem>
        ))}
      </ScontentSelectedDate>
    </Scontent>
  );
};
