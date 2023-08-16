import React, { ReactNode, useContext } from "react";
import { formatMorney } from "@helpers/formatMorney";
import { Scontent, Sfooter, Sheader, Ssection } from "./styles";
import { Settings } from "@icons/Settings";

interface ItemType {
  name: string;
  total: number;
}

type InstitutionMenuCardType = {
  items?: ItemType[];
  title?: string;
  totalAmount: number;
  isFooter?: ReactNode;
  openSettings?: () => void;
};

const InstitutionMenuCard: React.FC<InstitutionMenuCardType> = ({
  items = [],
  title = "SEM CARTÃO",
  totalAmount = 0,
  openSettings,
  isFooter,
}) => {
  return (
    <Scontent>
      <Sheader>
        <h1>{title.toUpperCase()}</h1>
        {openSettings && (
          <Settings width={20} height={20} onClick={openSettings} />
        )}
      </Sheader>

      <Ssection>
        {items?.map((item, index) => (
          <span key={index}>
            <strong>{item.name}</strong>
            <strong> {formatMorney(item.total)}</strong>
          </span>
        ))}
        <span>
          <strong>TOTAL</strong>
          <strong>{formatMorney(totalAmount)}</strong>
        </span>
      </Ssection>
      {isFooter && <Sfooter>{isFooter}</Sfooter>}
    </Scontent>
  );
};

export default InstitutionMenuCard;
