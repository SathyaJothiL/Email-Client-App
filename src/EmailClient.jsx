import React, { useState,useEffect } from 'react'
import Filter from './Filter'
import EmailBody from './EmailBody'
import EmailLists from './EmailLists'

const EmailClient = () => {
    
    const [emailStatus,setEmailStatus] = useState({})
    const [arr,setArr] = useState([])
    const [body,setBody] = useState(null)
    const [curr,setCurr] =  useState(null)

    useEffect(()=>{
        fetch('https://flipkart-email-mock.vercel.app/')
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            setArr(data.list)
        })
    },[])

function clicker(id){
    console.log("button clicked");
    console.log(id," id clicked");
    console.log(arr[0].short_description);
    
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
    setEmailStatus(prev=>{
        let o = structuredClone(prev)
        if(!o[id]){
            o[id] = {}
            o[id].isRead = true
            o[id].isFavourite = false
            return o
        }else{
            return o
        }
    })
    setCurr(id)
}

function toggleIsFavourite(){
    
    setEmailStatus(prev=>{
        console.log(prev);
        let o = structuredClone(prev)
        o[curr].isFavourite = !o[curr].isFavourite
        // console.log(o[curr].isFavourite);
        
        return o
    })
    
}
function filterRead(){

    let bool = true
    let newEmailStatus = structuredClone(emailStatus)
    console.log(newEmailStatus);

    let idList = Object.entries(newEmailStatus).map(([key,value])=>{
        if(newEmailStatus[key].isRead===bool){
            console.log(key);
            
            return key
        }
    })
    console.log(idList);
    
    let filteredRead = arr.filter(item=>idList.includes(item.id))
    console.log(filteredRead);
    setCurr(null) 
    setArr(filteredRead)
     
}

function filterFavourite(){
    let bool = true
    let newEmailStatus = structuredClone(emailStatus)
    console.log(newEmailStatus);

    let idList = Object.entries(newEmailStatus).map(([key,value])=>{
        if(newEmailStatus[key].isFavourite===bool){
            console.log(key);
            
            return key
        }
    })
    console.log(idList);
    
    let filteredRead = arr.filter(item=>idList.includes(item.id))
    console.log(filteredRead);
     setArr(filteredRead)
     setCurr(null)

}



  return (
    <div className='m-4 flex flex-col'>
      <div>
         <Filter filterRead={filterRead} filterFavourite={filterFavourite} />
      </div>
      <div className='flex'>
      <EmailLists filteredArray={arr} clicker={clicker}/>
      {
        curr===null ? '' : (<EmailBody filteredArray={arr} 
                        toggleIsFavourite={toggleIsFavourite} 
                        curr={curr} emailStatus={emailStatus} 
                        body={body}/>)

      }
      
      </div>
    </div>
  )
}

export default EmailClient
