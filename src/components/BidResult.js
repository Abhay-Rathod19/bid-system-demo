import React from "react";
import { useSelector } from "react-redux";
import { LabelComponent } from "../shared/BIDLabelComp";
import { ButtonComponent } from "../shared/BIDButton";

export const BidResult = () => {
    let winnerUser = null;

    const bidDetailsData = useSelector((state) => state.bid.bidDetails);

    const findLowestUniqueAmount = (bidDetails) => {
        let uniqueAmounts = {};
        let lowestUniqueAmount = null;
        const allBids = Object.values(bidDetails).flat();
        console.log("all-bids-are : ", allBids);
        allBids.forEach((bid) => {
            uniqueAmounts[bid] = (uniqueAmounts[bid] || 0) + 1;
        });

        const resultValues = Object.keys(uniqueAmounts)
            .filter((amount) => uniqueAmounts[amount] === 1)
            .sort((a, b) => a - b);
        // lowestUniqueAmount = resultValues[resultValues.length - 1];
        lowestUniqueAmount = resultValues[0];

        return lowestUniqueAmount ? Number(lowestUniqueAmount) : null;
    };

    const lowestUniqueAmount = findLowestUniqueAmount(bidDetailsData);

    console.log("Lowest Unique Amount", lowestUniqueAmount);

    for (let [user, bidValue] of Object.entries(bidDetailsData)) {
        if (bidValue.includes(lowestUniqueAmount)) {
            winnerUser = user;
        }
    }

    return (
        <>
            <LabelComponent className="bid-result" variant="h6">
                The lowest unique amount of bid is : <strong>{lowestUniqueAmount}</strong> from <strong>{winnerUser}</strong>
            </LabelComponent>
            <ButtonComponent onClick={() => window.location.reload()}>
                Restart Game
            </ButtonComponent>
        </>
    );
};
