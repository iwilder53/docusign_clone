"use client"

import { createSlice } from '@reduxjs/toolkit';

export const MergeAnnotationsSlice = createSlice({
    name: 'MergeAnnotation',
    initialState: {
        pdfNet: null,
    },
    reducers: {
        setInstance: (state, action) => {
            state.pdfNet = action.payload;
        },
        resetInstance: (state, action) => {
            state.pdfNet = null;
        }
    },
});

export const { setInstance, resetInstance } = MergeAnnotationsSlice.actions;

export const pdfNet = state => state.MergeAnnotation.pdfNet;

export default MergeAnnotationsSlice.reducer;
