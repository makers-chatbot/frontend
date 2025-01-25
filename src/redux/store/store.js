import { configureStore } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage'; // Para usar localStorage
import sessionStorage from 'redux-persist/lib/storage/session'; // Para usar sessionStorage
import { persistReducer, persistStore } from 'redux-persist';
import cartReducer from '../features/cartSlice';
import userReducer from '../features/userSlice';
import { combineReducers } from 'redux';

// Configuración de persistencia para el carrito (cart)
const cartPersistConfig = {
    key: 'cart',
    storage: sessionStorage,
    // storage, // Usamos localStorage
};

// Configuración de persistencia para el usuario (user)
const userPersistConfig = {
    key: 'user',
    storage: sessionStorage, // Usamos sessionStorage
};

// Reducers combinados
const rootReducer = combineReducers({
    cart: persistReducer(cartPersistConfig, cartReducer),
    user: persistReducer(userPersistConfig, userReducer),
});

// Crear el store con los reducers combinados
const store = configureStore({
    reducer: rootReducer,
});

export const persistor = persistStore(store);
export default store;
