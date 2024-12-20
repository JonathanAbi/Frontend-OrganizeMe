import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import styles from "./otp.module.css";
import { toast, Bounce } from "react-toastify";
import api from "../../api/api";
import { Input } from "antd";

export default function FormOtp({
  form,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  const [cooldown, setCooldown] = useState(0);

  const startCooldown = () => {
    setCooldown(60);
  };

  const handleResendOTP = async () => {
    try {
      await api.post("/api/auth/resend-otp", { email: form.email });
      toast.success("OTP has been resent!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      startCooldown();
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleOTPChange = (value) => {
    // Perbarui nilai OTP di form saat input berubah
    handleChange({ target: { name: "otpCode", value } });
  };

  // useEffect untuk mengurangi cooldown setiap detik
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => setCooldown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  return (
    <Form>
      <Input.OTP
        length={6}
        value={form.otpCode}
        onChange={handleOTPChange}
        autoFocus
        inputStyle={{
          width: "3rem",
          height: "3rem",
          margin: "0 0.5rem",
          fontSize: "1.5rem",
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />
      <div className="mt-2">
        <a
          className={cooldown === 0 ? styles.customA : ""}
          onClick={cooldown === 0 ? handleResendOTP : null}
          style={{
            cursor: cooldown === 0 ? "pointer" : "default",
            color: cooldown === 0 ? "white" : "grey",
            textDecoration: "none",
          }}
        >
          {cooldown === 0 ? "Resend OTP" : `Please wait ${cooldown}s`}
        </a>
      </div>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          className={styles.customButton}
          variant="dark"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Confirm
        </Button>
      </div>
      <div className="mt-2"></div>
    </Form>
  );
}

FormOtp.propTypes = {
  form: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};
