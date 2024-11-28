import {
    SET_FORM,
    UPDATE_FORM_FIELD,
    ADD_ITEM,
    DELETE_ITEM,
    TOGGLE_EDIT,
  } from '../constants/form-constant';  
  
  const initialState = {
    data: {}, 
    edit: false, 
  };
  
  export const formReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SET_FORM:
        return {
          ...state,
          data: { ...action.payload }, // Set entire form data
        };
  
      case UPDATE_FORM_FIELD:
        return {
          ...state,
          data: { ...state.data, [action.payload.field]: action.payload.value },
        };
  
      case ADD_ITEM:
        return {
          ...state,
          data: {
            ...state.data,
            items: [...(state.data.items || []), action.payload], // Add item to list
          },
        };
  
      case DELETE_ITEM:
        return {
          ...state,
          data: {
            ...state.data,
            items: state.data.items.filter((_, index) => index !== action.payload), // Delete item by index
          },
        };
  
      case TOGGLE_EDIT:
        return {
          ...state,
          edit: !state.edit, // Toggle edit mode
        };
  
      default:
        return state;
    }
  };
  