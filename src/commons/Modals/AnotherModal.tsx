import { Button, Text } from '@mantine/core';
import { openConfirmModal } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';

 export default function AnotherModal() {
  const openModal = () => openConfirmModal({
    title: 'Please confirm your action',
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
  });

  return <IconTrash onClick={openModal}></IconTrash>;
}