import { REMOVE_ALERT, SET_ALERT } from "../actions/types";

const INITIAL_STATE = [
   // {
   //    id: 3,
   //    msg: 'Please log in',
   //    alertType: 'success'
   // }
];

const alertReducer = ( state = INITIAL_STATE, action ) => {
   const { type, payload } = action;

   switch (type) {
      case SET_ALERT:
         return [...state, payload];
      case REMOVE_ALERT:
         return state.filter(alert => alert.id !== payload);
      default:
         return state;
   }
};

export default alertReducer;