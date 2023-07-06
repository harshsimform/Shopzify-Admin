import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderSummaryState } from "../../interface/interface";
import { RootState } from "../store";

const initialState: OrderSummaryState = {
  totalRevenue: 0,
  totalCustomers: 0,
  totalOrders: 0,
};

const orderSummarySlice = createSlice({
  name: "orderSummary",
  initialState,
  reducers: {
    updateOrderSummary(state, action: PayloadAction<OrderSummaryState>) {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetOrderSummary: () => initialState,
  },
});

export const { updateOrderSummary, resetOrderSummary } =
  orderSummarySlice.actions;

export const selectTotalRevenue = (state: RootState) =>
  state.orderSummary.totalRevenue;
export const selectTotalOrders = (state: RootState) =>
  state.orderSummary.totalOrders;
export const selectTotalCustomers = (state: RootState) =>
  state.orderSummary.totalCustomers;

export default orderSummarySlice;
