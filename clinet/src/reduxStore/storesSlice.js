import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: null,
  newData: localStorage.getItem("newData")
    ? JSON.parse(localStorage.getItem("newData"))
    : [],
};

export const storesFetch = createAsyncThunk("stores/storesFetch", async () => {
  try {
    const rep = await axios.get("http://localhost:3001/");
    return rep.data;
  } catch (error) {
    console.log(error);
  }
});
// export const storesFetch = createAsyncThunk("stores/storesFetch", async () => {
//   const rep = await axios.get("http://localhost:3001/");
//   return rep?.data; //如果a是null，return null，不然就是rep裏面的data(取代if語句)
// });

const storesSlice = createSlice({
  name: "stores",
  initialState,
  reducers: {
    filterCity: (state, action) => {
      if (action.payload == "") {
        state.newData = state.data;
      } else {
        state.newData = state.data.filter((v) => v.city === action.payload);
      }
      // 清除測試完復原state.data = data.filter((v) => v.city === action.payload);
      localStorage.setItem("newData", JSON.stringify(state.newData));
    },
    filterType: (state, action) => {
      state.newData = state.data.filter((v) => v.foodtype === action.payload);
      localStorage.setItem("newData", JSON.stringify(state.newData));
    },
    filterTag: (state, action) => {
      state.newData = state.newData.filter((v) => {
        return (
          v.tag1 === action.payload ||
          v.tag2 === action.payload ||
          v.tag3 === action.payload
        );
      });
      // localStorage.setItem("newData", JSON.stringify(state.newData));
      console.log(state.newData);
    },
  },
  extraReducers: {
    [storesFetch.padding]: (state, action) => {
      state.status = "padding";
    },
    [storesFetch.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
      // state.newData = action.payload; //11.6重新fetch(目前回首頁newS會抓全部值)
    },
    [storesFetch.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

// Action creators are generated for each case reducer function
export const { filterCity, filterType, filterTag } = storesSlice.actions;

export default storesSlice.reducer;

// ==========================================================

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// import db from "../MOCK_DATA.json";

// export const storesFetch = createAsyncThunk("stores/storesFetch", async () => {
//   const rep = await axios.get("/page2");
//   return rep?.data; //如果a是null，return null，不然就是rep裏面的data(取代if語句)
// });

// const initialState = {
//   data: db,
//   status: "",
//   newData: localStorage.getItem("newData")
//     ? JSON.parse(localStorage.getItem("newData"))
//     : db,
// };
// export const storesSlice = createSlice({
//   name: "stores",
//   initialState,
//   reducers: {
//     filterCity: (state, action) => {
//       if (action.payload == "") {
//         state.newData = db;
//       } else {
//         state.newData = db.filter((v) => v.city === action.payload);
//       }
//       // 清除測試完復原state.data = data.filter((v) => v.city === action.payload);
//       localStorage.setItem("newData", JSON.stringify(state.newData));
//     },
//     filterType: (state, action) => {
//       state.data = db.filter((v) => v.foodtype === action.payload);
//     },
//     filterTag: (state, action) => {
//       state.data = db.filter((v) => v.city === action.payload);
//     },
//   },
//   extraReducers: {
//     [storesFetch.padding]: (state, action) => {
//       state.status = "padding";
//     },
//     [storesFetch.fulfilled]: (state, action) => {
//       state.status = "success";
//       state.data = action.payload;
//     },
//     [storesFetch.rejected]: (state, action) => {
//       state.status = "rejected";
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { filterCity, filterType, filterTag } = storesSlice.actions;

// export default storesSlice.reducer;