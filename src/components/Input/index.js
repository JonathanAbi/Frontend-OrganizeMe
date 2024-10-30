import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

export default function Input({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="lg"
      />
    </Form.Group>
  );
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  name: PropTypes.string,
};

Input.defaultProps = {
  type: "text",
  placeholder: "",
};
