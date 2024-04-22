import {
  Badge,
  Button,
  Card,
  Group,
  Image,
  ModalBase,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { deleteAdoption, updateAdoption } from "../../services/adoptService";
import { IconTrash } from "@tabler/icons-react";
import "./Manage.css";
import { openConfirmModal } from "@mantine/modals";
import Modal from "../Modals/Modal";
import AnotherModal from "../Modals/AnotherModal";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
export default function ManageAdoption(props: {
  name: string;
  status: string;
  images: string;
  id: string;
  postedById: string;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleted: boolean;
}) {
  const [adoptionStatus, setStatus]: any = useState(props.status);
  let deletionResult: any = {};
  const navigate = useNavigate();
  useEffect(() => {
    if (deletionResult.acknowledged == true) {
      console.log("ss");
    }
  }, []);
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
        const result = await deleteAdoption(
          {
            userId: props.postedById,
          },
          props.id
        );
        console.log(result);
        if (result.acknowledged === true) {
          deletionResult = result;
          navigate("/manage");
          props.setIsDeleted(!props.isDeleted);
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
          {/* <IconTrash onClick={()=>{
  deleteAdoption({
    
  userId: props.postedById

}, props.id)
}}></IconTrash> */}
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
        value={adoptionStatus}
        onChange={(value) => {
          console.log(value);
          setStatus(value);
        }}
        data={["available", "adopted", "pending"]}
      />
      <br />
      <Button
        onClick={() => {
          updateAdoption(
            {
              status: adoptionStatus,
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
