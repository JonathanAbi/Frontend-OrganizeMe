import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Select, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../Button";
import api from "../../api/api";

export default function ModalCreate() {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const queryClient = useQueryClient(); // Access query client for invalidating tasks

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const createTaskMutation = useMutation({
    mutationFn: async (formData) => {
      messageApi.open({
        type: "loading",
        content: "Creating task...",
        duration: 1.5,
      });

      setConfirmLoading(true);
      const response = await api.post("/api/task", formData);
      setConfirmLoading(false);

      return response;
    },
    onSuccess: (response) => {
      if (response.data) {
        // Menghapus pesan loading sebelumnya
        messageApi.destroy();
        // Menampilkan pesan sukses
        message.success("Task created successfully!", 2.5);

        setOpen(false);
        form.resetFields();
        setConfirmLoading(false);
        // Refetch tasks in TaskTable
        queryClient.invalidateQueries("tasks");
      }
    },
    onError: (error) => {
      messageApi.destroy();
      console.log(error);
      // Menampilkan pesan error
      const errorMessage =
        error.response?.data?.message ||
        "Failed to create task. Please try again.";
      message.error(errorMessage, 2.5);
      setConfirmLoading(false);
    },
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const formattedValues = {
          ...values,
          dueDate: values.dueDate.format("YYYY-MM-DD HH:mm:ss"),
        };
        createTaskMutation.mutate(formattedValues);

        console.log("Form values:", formattedValues);
      })
      .catch((errorInfo) => {
        console.log("Validation Failed:", errorInfo);
      });
  };

  return (
    <>
      {/* Ant Design context holder untuk message */}
      {contextHolder}
      <Button variant="dark" className="mt-5 mb-3" onClick={showModal}>
        Add Task
      </Button>
      <Modal
        title="Create Task"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={[
          <Button
            key="cancel"
            className="mx-2"
            variant="danger"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            variant="primary"
            disabled={confirmLoading}
            isLoading={confirmLoading}
            onClick={handleOk}
          >
            Create Task
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" name="create_task_form">
          <Form.Item
            name="title"
            label="Task Title"
            rules={[
              { required: true, message: "Please input the task title!" },
            ]}
          >
            <Input placeholder="Enter task title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Please input the task description!" },
            ]}
          >
            <Input.TextArea rows={4} placeholder="Enter task description" />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select a due date!" }]}
          >
            <DatePicker
              showTime
              style={{ width: "100%" }}
              placeholder="Select due date"
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select a priority!" }]}
          >
            <Select placeholder="Select priority">
              <Select.Option value="Low">Low</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="High">High</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
