import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FormState {
  formData: any
  currentStep: number
  prevStep: number
}

const initialState: FormState = {
  formData: {},
  currentStep: 1,
  prevStep: 0
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state: FormState, action: PayloadAction<any>) {
      state.formData = {
        ...state.formData,
        ...action.payload
      }
    },
    nextStep(state: FormState) {
      state.prevStep = state.currentStep
      state.currentStep += 1
    },
    prevStep(state: FormState) {
      state.prevStep = state.currentStep
      state.currentStep -= 1
    },
    setCurrentStep(state: FormState, action: PayloadAction<number>) {
      state.currentStep = action.payload
    },
    resetFormData(state: FormState) {
      state.formData = initialState.formData
    },
    resetStep(state: FormState) {
      state.currentStep = initialState.currentStep
      state.prevStep = initialState.prevStep
    }
  }
})

export const {
  setFormData,
  nextStep,
  prevStep,
  setCurrentStep,
  resetFormData,
  resetStep
} = formSlice.actions

export const rootReducer = formSlice.reducer

export type RootState = { form: ReturnType<typeof rootReducer> }
