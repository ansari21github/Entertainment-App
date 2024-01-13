
import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from './slices/bookmarkSlice';

const store = configureStore({
  reducer: {
    bookmarks: bookmarkReducer,
  },
});

export default store;




