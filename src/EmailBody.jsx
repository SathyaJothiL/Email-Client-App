import React from "react";
import SafeHtmlContent from "./SafeHtmlContent";
import Logo from "./Logo";
import { timeFormatter,dateFormatter } from "../timeDate";

const EmailBody = ({isFavourite,body,selectedEmail,toggleIsFavourite,emailLists}) => {
  console.log(selectedEmail);
  
  let currMail = emailLists.find(mail=>mail.id ===selectedEmail)
  console.log(currMail,'currmail');
  
  let name = currMail.from.name
  let timeStamp = currMail.date
  
  let newNameList = name.split(' ').map(word=> word.charAt(0).toUpperCase() + word.slice(1))
  let newName = newNameList.join(' ')


  return (
    <div className="flex w-[200%] border-[#CFD2DC] border rounded-md m-4 items-start justify-center h-[80vh] overflow-y-auto">
      <div className="profile p-4"><Logo name={name}/></div>
      <div className="innercontent ">
        <div className="header p-2 mt-4">
          <div className="flex justify-between items-center font-bold text-[#636363] text-2xl ">
            <p>{newName}</p>
            <button
              onClick={() => toggleIsFavourite(selectedEmail)}
              className={"p-2 bg-[#E54065] rounded-3xl text-white font-bold text-xs"}
            >
              {!isFavourite
                ? "Mark as Favourite"
                : "Mark as Unfavourite"}
            </button>
          </div>
          <div className="flex  gap-4">
            <div className="text-[#636363] py-4">{dateFormatter(timeStamp)}</div>
            <div className="text-[#636363] py-4">{timeFormatter(timeStamp)}</div>
          </div>
        </div>
        <div className="text-[#636363] p-2">
            {
            body ? <SafeHtmlContent htmlContent={body}/> : "Loading"
            }
        </div>
      </div>
    </div>
  );
};

export default EmailBody;
