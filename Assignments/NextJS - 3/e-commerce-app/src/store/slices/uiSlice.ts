// src/store/slices/uiSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UIState = {
  search: string;
  sortBy: "price" | "rating" | "title" | null;
  sortOrder: "asc" | "desc";
  filters: Record<string, any>;
};

const initialState: UIState = {
  search: "",
  sortBy: null,
  sortOrder: "asc",
  filters: {}
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) { state.search = action.payload; },
    setSort(state, action: PayloadAction<{ sortBy: UIState["sortBy"]; sortOrder?: UIState["sortOrder"] }>) {
      state.sortBy = action.payload.sortBy;
      if (action.payload.sortOrder) state.sortOrder = action.payload.sortOrder;
    },
    setFilter(state, action: PayloadAction<{ key: string; value: any }>) {
      state.filters[action.payload.key] = action.payload.value;
    },
    clearFilters(state) { state.filters = {}; }
  }
});

export const { setSearch, setSort, setFilter, clearFilters } = uiSlice.actions;
export default uiSlice.reducer;
