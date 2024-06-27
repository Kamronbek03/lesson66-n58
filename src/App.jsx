import React, { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import ContactModal from "./components/ContactModal";
import ContactTable from "./components/ContactTable";
import Filter from "./components/Filter";
import "./App.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem("contacts")) || []
  );
  const [filter, setFilter] = useState(
    localStorage.getItem("contact_filter") || "all"
  );
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    gender: "male",
    favorite: false,
  });

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem("contact_filter", filter);
  }, [filter]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selected === null) {
      setContacts([...contacts, form]);
      toast.success("Contact successfully added!", { position: "top-center" });
    } else {
      const updatedContacts = contacts.map((el, i) =>
        i === selected ? form : el
      );
      setContacts(updatedContacts);
      toast.success("Contact successfully updated!", {
        position: "top-center",
      });
    }
    setForm({
      firstName: "",
      lastName: "",
      phone: "",
      gender: "male",
      favorite: false,
    });
    setSelected(null);
    setModalShow(false);
  };

  const handleEdit = (index) => {
    setSelected(index);
    setForm(contacts[index]);
    setModalShow(true);
  };

  const handleDelete = (index) => {
    if (window.confirm("Do you want to delete this contact?")) {
      const updatedContacts = contacts.filter((_, i) => i !== index);
      setContacts(updatedContacts);
      toast.success("Contact successfully deleted!", {
        position: "top-center",
      });
    }
  };

  const toggleFavorite = (index) => {
    const updatedContacts = contacts.map((contact, i) =>
      i === index ? { ...contact, favorite: !contact.favorite } : contact
    );
    setContacts(updatedContacts);
  };

  const filteredContacts = contacts
    .filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(search.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(search.toLowerCase()) ||
        contact.phone.includes(search)
    )
    .filter((contact) => filter === "all" || contact.gender === filter);

  const favoriteContacts = contacts.filter((contact) => contact.favorite);

  return (
    <Container>
      <InputGroup className="my-3">
        <FormControl
          className="input"
          placeholder="Searching"
          aria-label="Searching"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="buttons">
          <Filter filter={filter} onChange={(e) => setFilter(e.target.value)} />
          <div className="add-btn">
            <Button
              variant="outline-success"
              onClick={() => setModalShow(true)}
            >
              Add contact
            </Button>
          </div>
        </div>
      </InputGroup>
      <Tabs>
        <TabList>
          <Tab>All Contacts</Tab>
          <Tab>Favorites</Tab>
        </TabList>
        <TabPanel>
          <ContactTable
            contacts={filteredContacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFavorite={toggleFavorite}
          />
        </TabPanel>
        <TabPanel>
          <ContactTable
            contacts={favoriteContacts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleFavorite={toggleFavorite}
          />
        </TabPanel>
      </Tabs>
      <ContactModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        form={form}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        selected={selected}
      />
      <ToastContainer position="top-right" />
    </Container>
  );
};

export default App;
