import React from 'react';
import { Button, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';

type ModalProps = {
  openModal: () => void;
};

const Modal: React.FC<ModalProps> = ({ openModal }) => {
  return (
    <IconTrash onClick={openModal}></IconTrash>
  );
};

export default Modal;
