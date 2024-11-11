import React, { useState } from "react";
import moment from "moment";
import { useTasks } from "../../hooks/useTasks";
import { Table, DatePicker, Input, Button, Popconfirm, Tag, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import api from "../../api/api";
import ModalUpdate from "../ModalUpdate";

export default function TaskTable() {
  const { RangePicker } = DatePicker;

  const [filters, setFilters] = useState({
    keyword: "",
    startDate: "",
    endDate: "",
  });

  // custom hook useTasks
  const { data: tasks = [], isLoading, refetch } = useTasks(filters);

  const [editTask, setEditTask] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const isMobile = window.innerWidth < 768; // Deteksi mobile

  // const handleFetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await api.get("/api/tasks", { params: filters });
  //     setData(response.data.data);
  //   } catch (error) {
  //     console.error("Error fetching tasks:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   handleFetchData();
  // }, [filters]);

  const handleTitleChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: e.target.value,
    }));
  };

  const handleDateRangeChange = (dates) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate: dates ? dates[0].format("YYYY-MM-DD HH:mm:ss") : null,
      endDate: dates ? dates[1].format("YYYY-MM-DD HH:mm:ss") : null,
    }));
  };

  const handleEdit = (record) => {
    setEditTask(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/api/task/${taskId}`);
      refetch(); // Refetch data setelah delete
    } catch (error) {
      console.log(error);
      console.error("Error deleting task:", error);
    }
  };
  const renderMobileView = () => {
    return (
      <div>
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.title}
            extra={
              <>
                <Button type="link" onClick={() => handleEdit(task)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={() => handleDelete(task._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </>
            }
            style={{ marginBottom: 16 }}
          >
            <p>
              <strong>Due Date:</strong>{" "}
              {moment(task.dueDate).format("YYYY-MM-DD HH:mm:ss")}
            </p>
            <p>
              <strong>Priority:</strong>{" "}
              <Tag
                color={
                  task.priority === "High"
                    ? "red"
                    : task.priority === "Medium"
                      ? "orange"
                      : "green"
                }
              >
                {task.priority}
              </Tag>
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
          </Card>
        ))}
      </div>
    );
  };

  const columns = [
    {
      title: (
        <span
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            display: "block",
          }}
        >
          Title
        </span>
      ),
      dataIndex: "title",
      key: "title",
      width: "30%",
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search title"
            value={filters.keyword}
            onChange={handleTitleChange}
            style={{ marginBottom: 8, display: "block" }}
          />
        </div>
      ),
      filterIcon: () => (
        <SearchOutlined
          style={{
            color: "white",
          }}
        />
      ),
    },
    {
      title: (
        <span
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            display: "block",
          }}
        >
          Due Date
        </span>
      ),
      dataIndex: "dueDate",
      key: "dueDate",
      align: "center",
      render: (text) => {
        return moment(text).format("YYYY-MM-DD HH:mm:ss");
      },
      filterDropdown: () => (
        <div style={{ padding: 8 }}>
          <RangePicker onChange={handleDateRangeChange} />
        </div>
      ),
      filterIcon: () => (
        <SearchOutlined
          style={{
            color: "white",
          }}
        />
      ),
    },
    {
      title: (
        <span
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            display: "block",
          }}
        >
          Priority
        </span>
      ),
      dataIndex: "priority",
      key: "priority",
      align: "center",
      filters: [
        { text: "High", value: "High" },
        { text: "Medium", value: "Medium" },
        { text: "Low", value: "Low" },
      ],
      onFilter: (value, record) => record.priority === value,
      render: (priority) => {
        let color;
        switch (priority) {
          case "High":
            color = "red";
            break;
          case "Medium":
            color = "orange";
            break;
          case "Low":
            color = "green";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: (
        <span
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            display: "block",
          }}
        >
          Status
        </span>
      ),
      dataIndex: "status",
      key: "status",
      align: "center",
      filters: [
        { text: "Completed", value: "Completed" },
        { text: "In Progress", value: "In Progress" },
        { text: "Pending", value: "Pending" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: (
        <span
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            display: "block",
          }}
        >
          Action
        </span>
      ),
      key: "action",
      align: "center",
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <>
      {isMobile ? (
        renderMobileView()
      ) : (
        <Table
          columns={columns}
          dataSource={tasks}
          loading={isLoading}
          bordered
          pagination={{ pageSize: 5 }}
          rowKey="_id"
          locale={{ emptyText: "No tasks available" }}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
          }}
        />
      )}
      <ModalUpdate
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        task={editTask}
      />
    </>
  );
}
