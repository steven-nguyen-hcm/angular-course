import { Action } from "@ngrx/store"

const initialState = {
  name: 'steven',
  email: 'steven.nguyen@contemi.com'
}

export const testDataReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_INGREDIENT': 
      return console.log('Add ingredient from test data reducer');
      
    case 'haha':
      return console.log('hgahya');
    case 'huhu':
      return console.log('huhu');
    default:
      return state;
  }
}