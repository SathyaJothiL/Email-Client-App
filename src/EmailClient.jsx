import React, { useState, useEffect } from "react";
import Filter from "./Filter";
import EmailBody from "./EmailBody";
import EmailLists from "./EmailLists";
import { ClipLoader } from "react-spinners";

const EmailClient = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isErr, setIsErr] = useState(false);

  const [emailLists, setEmailLists] = useState([]);
  const [body, setBody] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const [isRead, setIsRead] = useState(new Set());
  const [isFavourite, setIsFavoruite] = useState(new Set());

  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("https://flipkart-email-mock.vercel.app/")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        setEmailLists(data.list);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
        setIsErr(true);
      });
  }, []);

  function handleEmailClick(id) {
    console.log("email with id ", id, " clicked");
    setIsLoading(true);

    fetch(`https://flipkart-email-mock.now.sh/?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        setBody(data.body);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsErr(true);
        console.log("Error fetching data");
        setBody("Retry Again");
      });
    setSelectedEmail(id);
    setIsRead((prev) => {
      const newPrev = new Set(prev);
      newPrev.add(id);
      return newPrev;
    });
  }

  function toggleIsFavourite(id) {
    const newIsFavourite = new Set(isFavourite);
    if (isFavourite.has(id)) {
      newIsFavourite.delete(id);
    } else {
      newIsFavourite.add(id);
    }
    setIsFavoruite(newIsFavourite);
  }

  function filterRead() {
    setActiveFilter("Read");
    setSelectedEmail(null);
  }

  function filterUnread() {
    setActiveFilter("Unread");
    setSelectedEmail(null);
  }

  function filterFavourite() {
    setActiveFilter("Favourite");
    setSelectedEmail(null);
  }

  function filterAll() {
    setActiveFilter("All");
    setSelectedEmail(null);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <ClipLoader size="100px" color="#3ddbc4" />
      </div>
    );
  }
  if (isErr) {
    return <div>Error while fetching</div>;
  }

  return (
    <div className="m-4 flex flex-col bg-[#F4F5F9]">
      <div>
        <Filter
          filterRead={filterRead}
          filterFavourite={filterFavourite}
          filterAll={filterAll}
          filterUnread={filterUnread}
          activeFilter={activeFilter}
        />
      </div>
      <div className="flex h-[90vh] overflow-y-auto">
        <EmailLists
          emailLists={emailLists}
          handleEmailClick={handleEmailClick}
          activeFilter={activeFilter}
          isRead={isRead}
          isFavourite={isFavourite}
          selectedEmail={selectedEmail}
        />

        {selectedEmail === null ? (
          ""
        ) : (
          <EmailBody
            emailLists={emailLists}
            toggleIsFavourite={toggleIsFavourite}
            selectedEmail={selectedEmail}
            body={body}
            isFavourite={isFavourite.has(selectedEmail) ? true : false}
          />
        )}
      </div>
    </div>
  );
};

export default EmailClient;
