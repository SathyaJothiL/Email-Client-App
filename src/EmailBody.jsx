import React from "react";
import SafeHtmlContent from "./SafeHtmlContent";

const EmailBody = ({emailStatus,curr,body,filteredArray,toggleIsFavourite}) => {
    console.log(filteredArray);
 

function timeFormatter(timestamp){
    const date = new Date(timestamp)
    let newDate = `${date.getDate().toString().padStart(2,'0')}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getFullYear()}`
    return newDate  
}
  return (
    <div className="flex w-2/3">
      <div className="profile p-4">profile</div>
      <div className="innercontent">
        <div className="header p-2">
          <div className="flex justify-between items-center">
            <p>{filteredArray[curr].from.name}</p>
            <button
              onClick={() => toggleIsFavourite()}
              className={"p-2 bg-yellow-400 rounded-md"}
            >
              {emailStatus[curr] && !emailStatus[curr].isFavourite
                ? "Mark as Favourite"
                : "Mark as Unfavourite"}
            </button>
          </div>
          <div>{timeFormatter(filteredArray[curr].date)}</div>
        </div>
        <div className="body">
            {
            body ? <SafeHtmlContent htmlContent={body}/> : "Loading"
            }
        </div>
      </div>
    </div>
  );
};

export default EmailBody;
