import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: 'parrot',
    color: 'yellow',
    canFly: true,
}

export const birdSlice = createSlice({
    initialState: initialState,
    reducers: {
        changeName: (state, action) => {
            state.name = action.payload;
        },
        changeColor: (state, action) => {
            state.color = action.payload;
        },
        changeCanFly: (state, action) => {
            state.canFly = action.payload;
        },
    },
    name: 'bird',
});

export const { changeName, changeColor, changeCanFly } = birdSlice.actions;

export default birdSlice.reducer;
