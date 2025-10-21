// filterStepSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  step1: string; // url string for step 1
  step2: string; // url string for step 2
  step3: string; // url string for step 3
  rate_id: {
    pickAndDropRateId: number[];
    meetAndAssistRateId: number[];
    loungeRateId: number[];
  };
  meetAndAssistRateId: string;
  loungeRateId: string;
  pickAndDropRateId: string;
  baggageId: string;
}

const initialState: FilterState = {
  step1: '',
  step2: '',
  step3: '',
  meetAndAssistRateId: '',
  loungeRateId: '',
  pickAndDropRateId: '',
  baggageId: '',
  rate_id: {
    pickAndDropRateId: [],
    meetAndAssistRateId: [5],
    loungeRateId: [],
  },
};

const filterStepSlice = createSlice({
  name: 'stepFilter',
  initialState,
  reducers: {
    setStepFilters: (
      state,
      action: PayloadAction<{ step: 1 | 2 | 3; filters: string }>
    ) => {
      if (action.payload.step === 1) state.step1 = action.payload.filters;
      if (action.payload.step === 2) state.step2 = action.payload.filters;
      if (action.payload.step === 3) state.step3 = action.payload.filters;
    },
    clearSingleStep: (state, action: PayloadAction<{ step: 1 | 2 | 3 }>) => {
      if (action.payload.step === 1) state.step1 = '';
      if (action.payload.step === 2) state.step2 = '';
      if (action.payload.step === 3) state.step3 = '';
    },
    clearFilters: (state) => {
      state.step1 = '';
      state.step2 = '';
      state.step3 = '';
    },
    // ✅ Add a rate id to a category
    addRateId: (
      state,
      action: PayloadAction<{
        type: 'pickAndDropRateId' | 'meetAndAssistRateId' | 'loungeRateId';
        id: number;
      }>
    ) => {
      // const { type, id } = action.payload;

      if (action.payload.type === 'meetAndAssistRateId') {
        console.log(state.rate_id, action);
        state?.rate_id?.meetAndAssistRateId?.push(33);
        // if (!state.rate_id[action.payload.type].includes(id)) {
        //   state.rate_id[action.payload.type].push(id);
        // }
      }
    },
    addId: (
      state,
      action: PayloadAction<{
        type:
          | 'pickAndDropRateId'
          | 'meetAndAssistRateId'
          | 'loungeRateId'
          | 'baggageId';
        id: string;
      }>
    ) => {
      console.log(action.payload);
      if (action.payload.type === 'meetAndAssistRateId') {
        state.meetAndAssistRateId = String(action.payload.id);
      }
      if (action.payload.type === 'pickAndDropRateId') {
        state.pickAndDropRateId = String(action.payload.id);
      }
      if (action.payload.type === 'loungeRateId') {
        state.loungeRateId = String(action.payload.id);
      }
      if (action.payload.type === 'baggageId') {
        state.baggageId = String(action.payload.id);
      }
    },
    // ✅ Remove a specific rate id from a category
    removeRateId: (
      state,
      action: PayloadAction<{
        type: 'pickAndDropRateId' | 'meetAndAssistRateId' | 'loungeRateId';
        id: number;
      }>
    ) => {
      const { type, id } = action.payload;
      state.rate_id[type] = state.rate_id[type].filter((x) => x !== id);
    },

    // ✅ Clear all rate ids for a specific category
    clearRateIdsByType: (
      state,
      action: PayloadAction<
        'pickAndDropRateId' | 'meetAndAssistRateId' | 'loungeRateId'
      >
    ) => {
      state.rate_id[action.payload] = [];
    },
  },
});

export const {
  setStepFilters,
  clearFilters,
  clearSingleStep,
  addRateId,
  removeRateId,
  clearRateIdsByType,
  addId,
} = filterStepSlice.actions;
export default filterStepSlice.reducer;
