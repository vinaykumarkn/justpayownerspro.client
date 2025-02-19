import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";


import storage from "redux-persist/lib/storage";
import saveListingSlice from "./saveListing/saveListingSlice";
import searchSlice from "./search/searchSlice";
import authReducer from "../redux/auth/authSlice";
import useReducer from "./user/userSlice";
import propertyByCity from "./property/propertyByCity";
import propertyAdvertiseData from "./property/propertyData";
import propertyCatalog from "./property/propertyCatalog";
import TopCitiesProvider from "./TopCities/TopCitiesData"


const persistConfig = {
    key: "root",
    version: 1,
    storage,
    whitelist: ["user", "savedListing"],
};

//===== Redux Persist's Code ======//
const rootReducer = combineReducers({
    user: useReducer,
    savedListing: saveListingSlice,
    search: searchSlice,
    propertyByCity: propertyByCity,
    propertyAdvertiseData: propertyAdvertiseData,
    propertyCatalog: propertyCatalog,
    auth: authReducer,
    TopCitiesProvider:TopCitiesProvider

});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const middleware = (getDefaultMiddleware) => {
    return getDefaultMiddleware({
        serializableCheck: false,
    });
};
export const store = configureStore({
    reducer: persistedReducer,
    middleware,
});
export const persistor = persistStore(store);



//export const store = configureStore({
//    reducer: persistedReducer,
//    middleware: (getDefaultMiddleware) =>
//        getDefaultMiddleware({ serializableCheck: false }),
//});

//import { configureStore } from '@reduxjs/toolkit'
//import authReducer from "./features/auth/authSlice";

//export const store = configureStore({
//    reducer: {
//        auth: authReducer,
//    },
//});



//import { configureStore } from '@reduxjs/toolkit';
//import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
//import roleReducer from './roleSlice';
//import imageReducer from './imageSlice';
//import userReducer from './localSlice';
//import routeReducer from './routeSlice';
//import advanceSearchSlice from './advanceSearchSlice';
//import leadSlice from './leadSlice'
//import propertyCustomFiledSlice from './propertyCustomFiledSlice';
//import propertySlice from './propertySlice';
//import contactSlice from './contactSlice';
//import contactCustomFiledSlice from './contactCustomFiledSlice';
//import leadCustomFiledSlice from './leadCustomFiledSlice';

//const middleware = (getDefaultMiddleware) => {
//    return getDefaultMiddleware({
//        serializableCheck: false,
//    });
//};

//const userPersistConfig = {
//    key: 'userDetails',
//    storage,
//};
//const routePersistConfig = {
//    key: 'route',
//    storage,
//};
//const imagesPersistConfig = {
//    key: 'image',
//    storage,
//};
//const leadPersistConfig = {
//    key: 'lead',
//    storage,
//};
//const contactPersistConfig = {
//    key: 'contact',
//    storage,
//};

//export const store = configureStore({
//    reducer: {
//        roles: persistReducer(userPersistConfig, roleReducer),
//        images: persistReducer(imagesPersistConfig, imageReducer),
//        user: userReducer,
//        route: persistReducer(routePersistConfig, routeReducer),
//        advanceSearchData: advanceSearchSlice,
//        leadData: persistReducer(leadPersistConfig, leadSlice),
//        contactData: persistReducer(contactPersistConfig, contactSlice),
//        propertyCustomFiled: propertyCustomFiledSlice,
//        contactCustomFiled: contactCustomFiledSlice,
//        leadCustomFiled: leadCustomFiledSlice,
//        propertyData: propertySlice,
//    },
//    middleware,
//});

//export const persistor = persistStore(store);
