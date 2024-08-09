import React, { useContext } from "react";
import InfoContext from "../../../context/InfoContext";
import Message from "./Message";

const ContactMessage = () => {
  const { allMessage } = useContext(InfoContext);
  


  return (
    <div className="w-5/6 pt-4 m-auto">
      <div className="flex justify-end w-4/5"></div>
      <section className="flex flex-col items-center mt-4 ">
        {allMessage?.map((messages, index) => {
          return (
            <Message
              key={index + 1}
              name={messages.name}
              id={messages._id}
              email={messages.email}
              message={messages.message}
            />
          );
        })}
      </section>
    </div>
  );
};

export default ContactMessage;
