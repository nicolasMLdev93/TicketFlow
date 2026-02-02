import { createSlice } from "@reduxjs/toolkit";
import type { Initial_values } from "../types/interfaces";

const initial_state: Initial_values = {
  vip_count: 0,
  common_count: 0,
  event_id: null,
  total: 0,
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: initial_state,
  reducers: {
    increse_vipCount(state, action) {
      state.vip_count += 1;
      state.total += action.payload;
    },
    increse_commonCount(state, action) {
      state.common_count += 1;
      state.total += action.payload;
    },
    decrese_vipCount(state, action) {
      if (state.vip_count > 0) {
        state.vip_count -= 1;
        state.total -= action.payload;
      }
    },
    decrese_commonCount(state, action) {
      if (state.common_count > 0) {
        state.common_count -= 1;
        state.total -= action.payload;
      }
    },
    set_eventId(state, action) {
      state.event_id = action.payload;
    },
    set_initialStates(state) {
      state.vip_count = 0;
      state.common_count = 0;
      state.event_id = null;
      state.total = 0;
    },
  },
});

export const {
  increse_commonCount,
  increse_vipCount,
  decrese_commonCount,
  decrese_vipCount,
  set_eventId,
  set_initialStates,
} = appSlice.actions;
export default appSlice.reducer;
