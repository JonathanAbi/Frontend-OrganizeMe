import React from "react";
import PropTypes from "prop-types";
import { Button as BootstrapButton } from "react-bootstrap";

export default function Button({
  variant,
  size,
  onClick,
  children,
  isLoading,
  disabled,
  className,
}) {
  return (
    <BootstrapButton
      className={className}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? "Loading..." : children}
    </BootstrapButton>
  );
}

Button.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};


