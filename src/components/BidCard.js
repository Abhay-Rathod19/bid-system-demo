import React, { useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { inputData } from "../constants/bidData/inputData";
import { userList } from "../constants/bidData/bidCardData";
import { ButtonComponent } from "../shared/BIDButton";
import { ternary } from "../utils/ternary";
import {
  addBidAmount,
  markCompCards,
  addRdxBidAmt,
  disableOtherCards,
  checkAvailableCards,
  removeAllErrors,
  updateCoins,
} from "../redux/slices/bidSlice";
import { validation, validateAll } from "../utils/validation";
import { InputComponent } from "../shared/BIDInputComp";
import { objectValues } from "../utils/javaScript";

export const BidCard = ({ disable = false, cardLabel, coinValueReq }) => {
  const [bidAmt, setBidAmt] = useState({});
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const userIndex = useSelector((state) => state.bid.currentUser);
  const bidData = useSelector((state) => state.bid.bidDetails);
  const bidDetails = useSelector((state) => state.bid.reduxBidAmt);
  const errorObj = useSelector((state) => state.bid.error);
  const completed = useSelector((state) => state.bid.completedCards).map(
    (element) => ternary(element === "Free", 0, Number(element))
  );
  const currUser = userList[userIndex];

  const totalCard = [0, 500, 1000, 1500, 2000, 2500];
  const index = totalCard.findIndex((val) => val === Number(cardLabel));
  const data = totalCard.slice(0, index);

  const handleInputChange = (e, label, inputNum) => {

    const remainingCards = [];
    if (cardLabel !== "Free") {
      for (let x of data) {
        if (!completed.includes(x)) {
          remainingCards.push(x);
        }
      }
    }

    if (remainingCards.length) {
      alert(
        `First Complete card with value ${remainingCards[0] === 0 ? `Free` : remainingCards[0]}`
      );
    } else {
      const { name, value } = e.target;
      dispatch(disableOtherCards(coinValueReq));
      dispatch(removeAllErrors());

      setBidAmt((prev) => {
        return {
          ...prev,
          [`${currUser}-${label}-${name}`]:
            value === "0" ? value : Number(value),
        };
      });

      setErrors((prevError) => {
        return {
          ...prevError,
          [`${currUser}-${cardLabel}-${inputNum}`]: validation(
            `${currUser}-${cardLabel}-${inputNum}`,
            Number(value),
            bidAmt,
            bidData,
            currUser
          ),
        };
      });

    }
  };

  const addToRdxBid = () => {
    if (
      validateAll(bidAmt, currUser, cardLabel, errors, setErrors) &&
      !objectValues(errors).filter((item) => item !== undefined).length
    ) {
      const amtArray = objectValues(bidAmt);
      const pyLoadObj = { user: currUser, amounts: amtArray };
      setBidAmt({});
      dispatch(addRdxBidAmt(bidAmt));
      dispatch(addBidAmount(pyLoadObj));
      dispatch(markCompCards(cardLabel));
      dispatch(checkAvailableCards());
      dispatch(updateCoins(coinValueReq));
    }
  };

  return (
    <div className="bid-card-container">
      <Typography variant="h6">{cardLabel}</Typography>
      <div className="bid-inputs">
        {inputData.map((field, index) => {
          const { type, name, id } = field;
          return (
            <React.Fragment key={`input-${index}`}>
              <div className="d-flex flex-column">
                <InputComponent
                  className="m-2 bid-amt-input"
                  type={type}
                  disabled={disable}
                  name={name}
                  id={`user-1`}
                  value={
                    bidAmt[`${currUser}-${cardLabel}-${name}`] ||
                    bidDetails[`${currUser}-${cardLabel}-${name}`] ||
                    ""
                  }
                  onChange={(e) => handleInputChange(e, cardLabel, id)}
                />

                <span className="error-msg mx-2 text-danger">
                  {errors[`${currUser}-${cardLabel}-${id}`] ? (
                    <span className="text-danger">
                      {errors[`${currUser}-${cardLabel}-${id}`]}
                    </span>
                  ) : null}
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {errorObj[`${currUser}-submit-${cardLabel}`] ? (
        <span className="text-danger">
          {errorObj[`${currUser}-submit-${cardLabel}`]}
        </span>
      ) : (
        ""
      )}

      <div className="bid-submit-btn">
        <ButtonComponent
          sx={{ margin: "5px" }}
          disabled={disable}
          onClick={() => addToRdxBid()}
        >
          Submit
        </ButtonComponent>
      </div>
    </div>
  );
};
