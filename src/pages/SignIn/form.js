import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function FormSignIn({
  form,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form>
      <Input
        label="Email"
        type="text"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Enter password"
      />
      <Form.Check
        type="switch"
        label="Show Password"
        className="mt-2"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
      />
      <div className="d-flex justify-content-between align-items-center mt-3">
        <Button
          variant="primary"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
        <a href="#" style={{ textDecoration: "none" }}>
          Forgot Password?
        </a>
      </div>
      <div className="mt-2">
        <a>Need an account? </a>
        <a href="#" style={{ textDecoration: "none" }}>
          Sign Up
        </a>
      </div>
    </Form>
  );
}

FormSignIn.propTypes = {
  form: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};
