import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TranscriptionState {
  text: string;
  grammarAnalysis: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: TranscriptionState = {
  text: '',
  grammarAnalysis: null,
  loading: false,
  error: null,
};

const transcriptionSlice = createSlice({
  name: 'transcription',
  initialState,
  reducers: {
    setTranscription: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setGrammarAnalysis: (state, action: PayloadAction<any>) => {
      state.grammarAnalysis = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetTranscription: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setTranscription,
  setGrammarAnalysis,
  setLoading,
  setError,
  resetTranscription,
} = transcriptionSlice.actions;

export default transcriptionSlice.reducer;