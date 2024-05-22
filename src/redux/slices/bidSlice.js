import { createSlice } from "@reduxjs/toolkit";

export const bidSlice = createSlice({
  name: "bidData",
  initialState: {
    coins: 0,
    bidDetails: {},
    reduxBidAmt: {},
    completedCards: [],
    currentUser: 0,
    stage: 2,
    enableCard: [0, 500, 1000, 1500, 2000, 2500],
  },
  reducers: {
    setReduxCoins: (state, action) => {
      state.coins = state.coins + action.payload;
    },
    updateCoins: (state, action) => {
      state.coins = state.coins - action.payload;
    },
    addBidAmount: (state, action) => {
      const data = action.payload;
      state.bidDetails[data.user] =
        state.bidDetails[data.user]
          ? [...state.bidDetails[data.user], ...data.amounts]
          : [...data.amounts];
    },
    addRdxBidAmt: (state, action) => {
      const data = action.payload;
      state.reduxBidAmt = { ...state.reduxBidAmt, ...data };
    },
    markCompCards: (state, action) => {
      const data = action.payload;
      state.completedCards.push(data);
    },
    setCurrentUser: (state, action) => {
      state.currentUser += 1;
    },
    increaseStage: (state, action) => {
      state.stage -= 1;
    },
    resetStage: (state, action) => {
      state.stage = 2;
      state.completedCards = [];
      state.error = {};
      state.coins = 0;
    },
    resetUser: (state, action) => {
      state.currentUser = 5;
    },
    enableOtherCards: (state, action) => {
      state.completedCards = [];
    },
    disableOtherCards: (state, action) => {
      state.enableCard = [action.payload]
    },
    checkAvailableCards: (state, action) => {
      const array = [0, 500, 1000, 1500, 2000, 2500];
      const upArr = array.filter((value) => value < state.coins);
      state.enableCard = [...upArr];
    },
    enableAllCards: (state) => {
      state.enableCard = [0, 500, 1000, 1500, 2000, 2500];
    },
  },
});

export const bidReducer = bidSlice.reducer;

export const {
  setReduxCoins,
  updateCoins,
  addBidAmount,
  markCompCards,
  setCurrentUser,
  increaseStage,
  resetStage,
  resetUser,
  enableAllCards,
  addRdxBidAmt,
  enableOtherCards,
  disableOtherCards,
  checkAvailableCards,
  removeAllErrors,
} = bidSlice.actions;