import React, { useState,useEffect } from 'react'
import Filter from './Filter'
import EmailBody from './EmailBody'
import EmailLists from './EmailLists'

const EmailClient = () => {
    
    const [emailLists,setEmailLists] = useState([])
    const [body,setBody] = useState(null)
    const [selectedEmail,setSelectedEmail] =  useState(null)

    const [isRead, setIsRead] = useState(new Set())
    const [isFavourite,setIsFavoruite] = useState(new Set())

    const [activeFilter, setActiveFilter] = useState("All")

    useEffect(()=>{
        fetch('https://flipkart-email-mock.vercel.app/')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setEmailLists(data.list)
        })
    },[])

function handleEmailClick(id){

    console.log("email with id ",id," clicked");
    
    fetch(`https://flipkart-email-mock.now.sh/?id=${id}`)
    .then(response=>response.json())
    .then(data=>{
        console.log(data,'data');
        setBody(data.body)
    })
    .catch(err=>{
        console.log("Error fetching data");
        setBody("Retry Again")
    })
    setSelectedEmail(id)
    setIsRead(prev=>{
        const newPrev = new Set(prev)
        newPrev.add(id)
        return newPrev
    })
}

function toggleIsFavourite(id){
    const newIsFavourite = new Set(isFavourite)
    if(isFavourite.has(id)){
        newIsFavourite.delete(id)
    }else{
        newIsFavourite.add(id)
    }
    setIsFavoruite(newIsFavourite)
}

function filterRead(){
    setActiveFilter("Read")
    setSelectedEmail(null)
   
}

function filterUnread(){
    setActiveFilter('Unread')
    setSelectedEmail(null)
}

function filterFavourite(){
    setActiveFilter("Favourite")
    setSelectedEmail(null)
  
}

function filterAll(){
    setActiveFilter('All')
    setSelectedEmail(null)
}


  return (
    <div className='m-4 flex flex-col'>
      <div>
         <Filter filterRead={filterRead} filterFavourite={filterFavourite} filterAll={filterAll} filterUnread={filterUnread} />
      </div>
      <div className='flex'>
      <EmailLists emailLists={emailLists} handleEmailClick={handleEmailClick} activeFilter={activeFilter} isRead={isRead} isFavourite={isFavourite}/>

      {
        selectedEmail===null ? '' : (<EmailBody emailLists={emailLists} 
                        toggleIsFavourite={toggleIsFavourite} 
                        selectedEmail={selectedEmail}
                        body={body}
                        isFavourite={isFavourite.has(selectedEmail) ? true : false}
                        name = {emailLists[selectedEmail].from.name}
                        time = {emailLists[selectedEmail].date}
                        />)

      }
      
      </div>
    </div>
  )
}

export default EmailClient
