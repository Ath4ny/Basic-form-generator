import { createStore, Store } from 'vuex'
import type { FormConfig, FormData } from '../components/Form/Types'

import type { InjectionKey } from 'vue'
export const key: InjectionKey<Store<FormState>> = Symbol()

export interface FormState {
  forms: Record<
    string,
    {
      data: FormData
      isValid: boolean
    }
  >
}

const initialState: FormState = {
  forms: {},
}

// Store can be modified further using composables, but for the sake of simplicity, let's keep it simple :)
export const store = createStore<FormState>({
  state: initialState,
  getters: {
    getFormData: (state: FormState) => (formId: string) => {
      const form = state.forms[formId]
      return form ? form.data : null
    },
  },

  mutations: {
    saveFormData(state: FormState, payload: { formId: string; data: FormData; isValid: boolean }) {
      if (!state.forms[payload.formId]) {
        state.forms[payload.formId] = {
          data: { ...payload.data },
          isValid: payload.isValid,
        }
      } else {
        state.forms[payload.formId]!.data = { ...payload.data }
        state.forms[payload.formId]!.isValid = payload.isValid
      }
    },

    clearForm(state: FormState, formId: string) {
      const newForms = { ...state.forms }
      delete newForms[formId]
      state.forms = newForms
    },
  },

  actions: {
    saveForm(payload: { formId: string; data: FormData; isValid: boolean }) {
      store.commit('saveFormData', payload)
    },

    clearForm(formId: string) {
      store.commit('clearForm', formId)
      return Promise.resolve({ success: true, formId })
    },
  },
})
