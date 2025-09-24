import { configureStore, createSlice } from "@reduxjs/toolkit";

// Initial jobs state
const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [], // All jobs
  },
  reducers: {
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    applyJob: (state, action) => {
      const jobId = action.payload;
      const job = state.jobs.find((j) => j.id === jobId);
      if (job) job.applied = true;
    },
  },
});

export const { addJob, applyJob } = jobsSlice.actions;

const store = configureStore({
  reducer: {
    jobs: jobsSlice.reducer,
  },
});

export default store;


