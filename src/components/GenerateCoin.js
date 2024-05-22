import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setReduxCoins,
    increaseStage,
    resetStage,
    setCurrentUser,
    enableAllCards,
} from "../redux/slices/bidSlice";
import { userList } from "../constants/bidData/bidCardData";
import { ResponsiveAppBar } from "./DemoAppbar";
import { usersImages } from "../constants/bidData/bidCardData";
import { BidResult } from "./BidResult";
import { ternary } from "../utils/ternary";
import { checkIncludes } from "../utils/javaScript";

export const GenerateCoin = () => {
    const [bidResult, setBidResult] = useState(false);

    const user = userList;
    const dispatch = useDispatch();
    const stage = useSelector((state) => state.bid.stage);
    const userIndex = useSelector((state) => state.bid.currentUser);
    const coinValue = useSelector((state) => state.bid.coins);
    const comptdCard = useSelector((state) => state.bid.completedCards);

    const arrOfAll = [0, 500, 1000, 1500, 2000, 2500];

    const generateCoins = (min, max) => {
        const number = Math.floor(Math.random() * (max - min + 1)) + min;

        dispatch(enableAllCards());
        dispatch(setReduxCoins(number));
        dispatch(increaseStage());

        if (stage === 0) {
            alert("Your turn is over...");
            dispatch(resetStage());
            dispatch(setCurrentUser());
        }
    };

    const arrOfCompleted = comptdCard?.map((element) =>
        ternary(element === "Free", 0, Number(element))
    );

    const resCheckNow = arrOfAll
        ?.map((ele) => ternary(!checkIncludes(arrOfCompleted, ele), ele, undefined))
        ?.filter((ele) => ele !== undefined);

    if (stage === 0 && resCheckNow?.every((val) => coinValue < val)) {
        alert("Your turn is over now...");
        setTimeout(() => {
            dispatch(setCurrentUser());
            dispatch(resetStage());
        }, 2000);
    }

    return (
        <>
            <ResponsiveAppBar
                userName={user[userIndex]}
                userImage={usersImages[userIndex]}
                curUserNum={userIndex}
                remainingChance={stage}
                availCoins={coinValue}
                setBidResult={setBidResult}
                onClickEvent={() => generateCoins(500, 2600)}
            />

            {bidResult ? <BidResult /> : ""}
        </>
    );
};
