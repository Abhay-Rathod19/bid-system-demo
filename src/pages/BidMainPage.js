import React from "react";
import { Carousel } from "../components/Carousel";
import { GenerateCoin } from "../components/GenerateCoin";
import { useSelector } from "react-redux";
import { BidResult } from "../components/BidResult";
import { userList } from "../constants/bidData/bidCardData";

export const BidMainPage = () => {
    const user = useSelector((state) => state.bid.currentUser);

    return (
        <div className="bid-main-container">
            {user < userList.length ? (
                <>
                    <GenerateCoin />
                    <Carousel />
                </>
            ) : (
                <BidResult />
            )}
        </div>

    );
};
