import React from "react";
import { useSelector } from "react-redux";
import { BidCard } from "./BidCard";
import { ternary } from "../utils/ternary";
import { bidCardData } from "../constants/bidData/bidCardData";
import { checkIncludes } from "../utils/javaScript";

export const Carousel = () => {
  const bidCoin = useSelector((state) => state.bid.coins);
  const activeCard = useSelector((state) => state.bid.enableCard);
  const comptdCard = useSelector((state) => state.bid.completedCards);

  return (
    <>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {bidCardData?.map((card, index) => {
            const { label, labelValue } = card;
            return (
              <BidCard
                key={`card-diff-${index}`}
                cardLabel={label}
                coinValueReq={labelValue}
                disable={
                  ternary(bidCoin < labelValue, true, false) ||
                  !checkIncludes(activeCard, labelValue) ||
                  checkIncludes(comptdCard, label)
                }
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
