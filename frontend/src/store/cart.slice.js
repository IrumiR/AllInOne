import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from '@/common/constants';

const initialState = {
  items: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) || [],
  totalPrice: 0,
};

const saveCartToLocalStorage = (cart) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
};

const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => acc + item.totalPrice, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart: (state) => {
      state.totalPrice = calculateTotalPrice(state.items);
    },
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item._id === action.payload._id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity, totalPrice: action.payload.price * action.payload.quantity });
      }
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartToLocalStorage(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload._id);
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartToLocalStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(item => item._id === action.payload._id);
      if (item) {
        item.quantity = action.payload.quantity;
        item.totalPrice = item.price * item.quantity;
      }
      state.totalPrice = calculateTotalPrice(state.items);
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      saveCartToLocalStorage(state.items);
    },
  },
});

export const { initializeCart, addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
