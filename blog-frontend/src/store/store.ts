import { configureStore } from "@reduxjs/toolkit";
import blogSlice  from "../features/blogSlice";

const store = configureStore({
    reducer: {
        blog: blogSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;