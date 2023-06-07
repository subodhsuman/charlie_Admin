import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from "redux-thunk";
import userActivePage from "./userActivePage";

// persistance state
const reducers = combineReducers({ user: userReducer ,setactive:userActivePage});
const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);

const store= configureStore({
    reducer: persistedReducer, 
    middleware:[thunk]
});

export default store;