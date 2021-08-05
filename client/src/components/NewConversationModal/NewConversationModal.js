import React from "react";
import { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { useContacts } from "../../contexts/ContactsProvider";
import { useConversations } from "../../contexts/ConversationsProvider";

export default function NewConversationModal({ closeModal }) {
  const { contacts } = useContacts();
  const { createConversation } = useConversations();
  const [selectedContactsIds, setSelectedContactsIds] = useState([]);

  const handleCheckboxChange = (contactId) => {
    setSelectedContactsIds(prevSelectedContactsIds => {
      if(prevSelectedContactsIds.includes(contactId)) {
        return prevSelectedContactsIds.filter(prevId => {
          return contactId !== prevId;
        })
      } else {
        return [...prevSelectedContactsIds, contactId];
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createConversation(selectedContactsIds);
    closeModal();
  }

  return (
    <>
      <Modal.Header closeButton>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                value={selectedContactsIds.includes(contact.id)}
                label={contact.name}
                onChange={() => handleCheckboxChange(contact.id)}
              ></Form.Check>
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  );
}
