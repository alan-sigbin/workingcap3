import modaltypes from '../constant/modaltypes';

const initialState = {
  modalType: null,
  modalProps: {}
}

export default (state = initialState, action) => {
  switch (action.type) {
    case modaltypes.SHOW_MODAL:
      return {
        modalProps: action.modalProps,
        modalType: action.modalType,
        type: action.type
      }
    case modaltypes.HIDE_MODAL:
      return initialState
    default:
      return state
  }
}