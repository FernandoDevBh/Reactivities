import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import rootStore from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const ModalContainer = () => {
  const {
    modalStore: {
      modal: { open, body },
      closeModel
    }
  } = useContext(rootStore);
  return (
    <Modal open={open} onClose={closeModel} size="mini">
      <Modal.Content>
        { body }
      </Modal.Content>
    </Modal>
  );
};

export default observer(ModalContainer);
