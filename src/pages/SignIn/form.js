import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./signin.module.css";
import { Link } from "react-router-dom";

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
          className={styles.customButton}
          variant="dark"
          onClick={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
        >
          Login
        </Button>
        <a href="#" className={styles.customLink}>
          Forgot Password?
        </a>
      </div>
      <div className="mt-2">
        <a>Need an account? <Link className={styles.customLink} to="/auth/signup">Sign Up</Link></a>
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
