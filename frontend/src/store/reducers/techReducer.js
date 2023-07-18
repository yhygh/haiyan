import {
  ADD_TECHSECTION,
  REMOVE_TECHSECTION,
  GET_TECHSECTIONS,
  ADD_GURULINK,
  REMOVE_GURULINK,
} from "../actions/types";

const initialState = {
  techSections: [],
};

// export default function rootReducer(state = initialState, action) {
export default function (state = initialState, action) {
  // debugger;
  switch (action.type) {
    case GET_TECHSECTIONS:
      return { ...state, techSections: action.data };
    case ADD_TECHSECTION:
      return {
        ...state,
        techSections: [...state.techSections, action.techSection],
      };
    case REMOVE_TECHSECTION:
      let techSections = state.techSections.filter(
        (val) => val._id !== action.id
      );
      return { ...state, techSections };
    case ADD_GURULINK:
      let cloneState = Object.assign({}, state);
      let techSectionIndex = cloneState.techSections.findIndex(
        (val) => val._id === action.techId
      );
      cloneState.techSections[techSectionIndex].links.push(action.guruLink);
      return cloneState;
    case REMOVE_GURULINK:
      let cState = Object.assign({}, state);
      let techSecIndex = cState.techSections.findIndex(
        (val) => val._id === action.techId
      );
      let guruLinkIndex = cState.techSections[techSecIndex].links.findIndex(
        (val) => val._id === action.linkId
      );
      cState.techSections[techSecIndex].links.splice(guruLinkIndex, 1);
      return cState;
    default:
      return state;
  }
}
