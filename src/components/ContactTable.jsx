import React from "react";
import { Table, Button } from "react-bootstrap";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ContactTable = ({ contacts, onEdit, onDelete, onToggleFavorite }) => (
  <Table striped hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Phone</th>
        <th>Gender</th>
        <th>Favorite</th>
        <th className="text-end">Action</th>
      </tr>
    </thead>
    <tbody>
      {contacts.map((contact, i) => (
        <tr key={i}>
          <td>{i + 1}</td>
          <td>{contact.firstName}</td>
          <td>{contact.lastName}</td>
          <td>{contact.phone}</td>
          <td>{contact.gender}</td>
          <td>
            <Button variant="link" onClick={() => onToggleFavorite(i)}>
              {contact.favorite ? <FaHeart color="red" /> : <FaRegHeart />}
            </Button>
          </td>
          <td className="text-end">
            <Button variant="primary" onClick={() => onEdit(i)}>
              Edit
            </Button>{" "}
            <Button variant="danger" onClick={() => onDelete(i)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ContactTable;
