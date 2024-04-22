import {
  Badge,
  Button,
  Card,
  Group,
  Image,

  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { updateAdoption } from "../../services/adoptService";
import { deleteMissing, updateMissing } from "../../services/missingService";
import {
  IconCross,
  IconEyeCancel,
  IconHttpDelete,
  IconPlayerStop,
  IconTrash,
} from "@tabler/icons-react";
import "./Manage.css";
import Modal from "../Modals/Modal";
import { openConfirmModal } from "@mantine/modals";
import { useNavigate } from "react-router-dom";
export default function ManageMissing(props: {
  name: string;
  status: string;
  images: string;
  id: string;
  postedById: string;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleted: boolean;
}) {
  const [missingStatus, setStatus]: any = useState(props.status);
  const navigate = useNavigate();
  let deletionResult: any = {};
  const openModal = () =>
    openConfirmModal({
      title: "Are Your Sure You want to Delete?",
      children: (
        <Text size="sm">
          This action is permanent you cannot undo the changes, choose
          carefully. Please click one of these buttons to proceed.
        </Text>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        const result = await deleteMissing(
          {
            userId: props.postedById,
          },
          props.id
        );
        console.log(result);
        if (result.data.acknowledged == true) {
          deletionResult = result;
          props.setIsDeleted(!props.isDeleted);
          console.log(props.isDeleted)
        }
      },
    });
  return (
    <Card
      className="hover-card"
      style={{
        height: "100%",
      }}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <div
          className="icon"
          style={{ marginLeft: "90%", marginTop: "1%", color: "red" }}
        >
         <Modal openModal={openModal}></Modal>
         
        </div>
        <Image
          src={props.images ? `http://localhost:5000/${props.images}` : ""}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{props.name}</Text>
      </Group>

      <Select
        label="Change Status"
        value={missingStatus}
        onChange={(value) => {
          console.log(value);
          setStatus(value);
        }}
        data={["found", "not-found"]}
      />
      <br />
      <Button
        onClick={() => {
          updateMissing(
            {
              status: missingStatus,
              userId: props.postedById,
            },
            props.id
          );
        }}
        color="green"
      >
        Update
      </Button>
      <br />
    </Card>
  );
}
