import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Select, message } from "antd";
import moment from "moment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/api";
import PropTypes from "prop-types";

export default function ModalUpdate({ visible, onCancel, task }) {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (task) {
      form.setFieldsValue({
        title: task.title,
        description: task.description,
        dueDate: moment(task.dueDate),
        priority: task.priority,
        status: task.status,
      });
    }
  }, [task, form]);

  const updateTaskMutation = useMutation({
    mutationFn: async (updatedTask) => {
      messageApi.open({
        type: "loading",
        content: "Updating task...",
        duration: 1.5,
      });

      const response = await api.put(`/api/task/${task._id}`, updatedTask);
      return response.data;
    },
    onSuccess: () => {
      // Menghapus pesan loading sebelumnya
      messageApi.destroy();
      // Menampilkan pesan sukses
      message.success("Task updated successfully!", 2.5);
      queryClient.invalidateQueries("tasks");
      onCancel();
    },
    onError: (error) => {
      messageApi.destroy();
      console.log(error);
      // Menampilkan pesan error
      const errorMessage =
        error.response?.data?.message ||
        "Failed to update task. Please try again.";
      message.error(errorMessage, 2.5);
    },
  });

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedTask = {
          ...values,
          dueDate: values.dueDate.format("YYYY-MM-DD HH:mm:ss"),
        };
        updateTaskMutation.mutate(updatedTask);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Update Task"
        open={visible}
        onOk={handleOk}
        onCancel={onCancel}
        confirmLoading={updateTaskMutation.isLoading}
      >
        <Form form={form} layout="vertical">
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
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select a status!" }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="Pending">Pending</Select.Option>
              <Select.Option value="In Progress">In Progress</Select.Option>
              <Select.Option value="Done">Done</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

ModalUpdate.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    dueDate: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
};
