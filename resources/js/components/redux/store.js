import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./reducers/loader";

export default configureStore({
    reducer: {
        loader: loaderReducer,
    },
});
