import React, { useEffect } from "react";
import NavbarComponent from "../../components/Navbar";
import TaskTable from "../../components/TaskTable";
import { Container } from "react-bootstrap";
import ModalCreate from "../../components/ModalCreate";
import { App, ConfigProvider, theme } from "antd";

export default function index() {
  useEffect(() => {
    document.body.style.backgroundColor = "#1a1a1a";
    return () => {
      document.body.style.backgroundColor = ""; // Kembali ke default saat komponen dilepas
    };
  }, []);

  return (
    <>
      <NavbarComponent />
      <App>
        <Container>
          <ConfigProvider
            theme={{
              algorithm: theme.darkAlgorithm,
            }}
          >
            <ModalCreate />
            <TaskTable />
          </ConfigProvider>
        </Container>
      </App>
    </>
  );
}
