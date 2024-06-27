import React from "react";
import { Form } from "react-bootstrap";

const Filter = ({ filter, onChange }) => (
  <div className="select">
    <Form.Select value={filter} onChange={onChange}>
      <option value="all">All</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </Form.Select>
  </div>
);

export default Filter;
