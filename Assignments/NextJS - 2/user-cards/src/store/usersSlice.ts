'use client';

import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

export type Address = { street: string; suite: string; city: string; zipcode: string };
export type Company = { name: string };

export type APIUser = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
};

type Edits = Partial<APIUser> & { id: number };

type UsersState = {
  likes: Record<number, boolean>;
  removed: Record<number, true>;
  edits: Record<number, Edits>;
  editingId: number | null;
};

const initialState: UsersState = {
  likes: {},
  removed: {},
  edits: {},
  editingId: null
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleLike(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.likes[id] = !state.likes[id];
    },
    removeUser(state, action: PayloadAction<number>) {
      state.removed[action.payload] = true;
    },
    startEdit(state, action: PayloadAction<number>) {
      state.editingId = action.payload;
    },
    stopEdit(state) {
      state.editingId = null;
    },
    saveEdit(state, action: PayloadAction<APIUser>) {
      const user = action.payload;
      state.edits[user.id] = user; // store the full edited snapshot (frontend-only)
      state.editingId = null;
    }
  }
});

export const { toggleLike, removeUser, startEdit, stopEdit, saveEdit } = usersSlice.actions;
export default usersSlice.reducer;

/** Selector: merge server data (React Query) with local state edits/likes/removals */
const baseSelector = (state: { users: UsersState }) => state.users;

export const selectMergedUsers = createSelector(
  [baseSelector, (_state, apiUsers: APIUser[]) => apiUsers],
  (local, apiUsers) => {
    const out = apiUsers
      .filter((u) => !local.removed[u.id])
      .map((u) => {
        const edited = local.edits[u.id];
        const merged = edited ? { ...u, ...edited } : u;
        return { ...merged, liked: !!local.likes[u.id] };
      });

    // Also include edited users that were not from the API (not needed here but handy)
    for (const idStr of Object.keys(local.edits)) {
      const id = Number(idStr);
      if (!apiUsers.some((u) => u.id === id) && !local.removed[id]) {
        const edited = local.edits[id] as any;
        out.push({ ...edited, liked: !!local.likes[id] });
      }
    }
    return out;
  }
);
