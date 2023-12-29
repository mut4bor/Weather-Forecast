import { configureStore } from "@reduxjs/toolkit";
import coordsSlice from "./coordsSlice";
import weatherSlice from "./weatherSlice";
export const store = configureStore({
  reducer: {
		coords: coordsSlice,
		weather: weatherSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
