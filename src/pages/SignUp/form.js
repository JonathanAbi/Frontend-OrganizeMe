import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./signup.module.css";
import { Link } from "react-router-dom";

export default function FormSignUp({
  form,
  handleChange,
  handleSubmit,
  isLoading,
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Form>
      <Input
        label="Username"
        type="text"
        name="username"
        value={form.username}
        onChange={handleChange}
        placeholder="Enter username"
      />
      <Input
        label="Email"
        type="email"
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
      <Button
        className={`${styles.customButton} mt-3`}
        variant="dark"
        onClick={handleSubmit}
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign Up
      </Button>
      <div className="mt-2">
        <a>
          Already have an account? <Link to="/auth/signin">Log in</Link>
        </a>
      </div>
    </Form>
  );
}

FormSignUp.propTypes = {
  form: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  isLoading: PropTypes.bool,
};
