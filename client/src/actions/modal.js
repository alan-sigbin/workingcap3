import modaltypes from '../constant/modaltypes';

export const showModal = ({ modalProps, modalType }) => dispatch => {
  dispatch({
    type: modaltypes.SHOW_MODAL,
    modalProps,
    modalType
  });
}

export const hideModal = () => dispatch => {
  dispatch({
    type: modaltypes.HIDE_MODAL
  });
}

