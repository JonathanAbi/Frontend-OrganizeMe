import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./otp.module.css";

export default function FormOtp({
  form,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  return (
    <Form>
      <Input
        label=""
        type="text"
        name="otpCode"
        value={form.otpCode}
        onChange={handleChange}
        placeholder="Enter Otp Code"
      />
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
      <div className="mt-2">
      </div>
    </Form>
  );
}

FormOtp.propTypes = {
  form: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};
