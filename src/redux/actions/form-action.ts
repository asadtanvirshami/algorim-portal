import {
    SET_FORM,
    UPDATE_FORM_FIELD,
    ADD_ITEM,
    DELETE_ITEM,
    TOGGLE_EDIT,
  } from '../constants/form-constant';
  
  // Set entire form data
  export const setForm = (payload: any) => ({
    type: SET_FORM,
    payload,
  });
  
  // Update a specific form field
  export const updateFormField = (field: string, value: any) => ({
    type: UPDATE_FORM_FIELD,
    payload: { field, value },
  });
  
  // Add an item to a list (e.g., links or services)
  export const addItem = (item: any) => ({
    type: ADD_ITEM,
    payload: item,
  });
  
  // Delete an item by index
  export const deleteItem = (index: number) => ({
    type: DELETE_ITEM,
    payload: index,
  });
  
  // Toggle edit mode
  export const toggleEdit = () => ({
    type: TOGGLE_EDIT,
  });
  