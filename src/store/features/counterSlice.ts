import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TRootState } from "..";

interface ICounterState {
  value: number;
}
const initialState: ICounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const selectCount = (state: TRootState) => state.counter.value

export default counterSlice.reducer;
