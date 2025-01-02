import React, { Fragment, useContext, useMemo, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ContactItem from "./ContactItem";
import ContactContext from "../../context/contact/contactContext";
import Spinner from "../layout/Spinner";

const Contacts = () => {
  const contactContext = useContext(ContactContext);

  const { getContacts, loading, contacts, filtered } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line
  }, []);

  const nodeRefs = useMemo(() => {
    const displayContacts = filtered || contacts || [];
    return displayContacts.map(() => React.createRef());
  }, [contacts, filtered]);

  if (loading || contacts === null) {
    return <Spinner />;
  }

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {(filtered || contacts).map((contact, i) => (
          <CSSTransition
            key={contact._id}
            timeout={500}
            classNames="item"
            nodeRef={nodeRefs[i]}
          >
            <div ref={nodeRefs[i]}>
              <ContactItem contact={contact} />
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
