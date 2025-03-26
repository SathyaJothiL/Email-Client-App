import React from 'react'
import Logo from './Logo'
import { timeFormatter,dateFormatter } from '../timeDate'

const EmailLists = ({emailLists,handleEmailClick,activeFilter,isRead,isFavourite,selectedEmail}) => {
  let filteredArray = emailLists.filter(email=>{

    if(email.id===selectedEmail){
      return email
    }

    if(activeFilter==='All') return email
    if(activeFilter==='Read') return isRead.has(email.id)
    if(activeFilter==='Unread') return !isRead.has(email.id)
    if(activeFilter==='Favourite') return isFavourite.has(email.id)
  })

if(activeFilter==='Favourite' && filteredArray.length===0){
  return(
    <div className='mx-8 mt-8 text-xl text-[#636363]'>No Favourites Emails</div>
  )
}
if(activeFilter==='Read' && filteredArray.length===0){
  return(
    <div className='mx-8 mt-8 text-xl text-[#636363]'>No Read Emails</div>
  )
}
    function capitalizeName(name){
      let newNameList = name.split(' ').map(word=> word.charAt(0).toUpperCase() + word.slice(1))
      let newName = newNameList.join(' ')
      return newName
    }
  return (
    <div className='w-full text-[#636363] h-[80vh] overflow-y-auto'>
      {
                filteredArray.map((mail,index)=>{
                    return(
                    <div key={mail.id} className={'w-full p-2 border mt-4 flex items-start justify-start gap-2 rounded-xl ' + (selectedEmail===mail.id ? 'border-[#E54065] ' : 'border-[#CFD2DC] ') + (!isRead.has(mail.id) ? 'bg-[#e2e0e0]': 'bg-[#F2F2F2]')}>
                       <div className='py-4 pl-2'>
                         <Logo name={mail.from.name} />
                       </div>
                        <li onClick={()=>handleEmailClick(mail.id)} className='w-full flex flex-col justify-center items-start text-left gap-4 cursor-pointer px-4 py-4'>
                                <p>From : <span className='font-bold'>{capitalizeName(mail.from.name)} &lt;{mail.from.email}&gt;</span></p>
  
                                <p>Subject : <span className='font-bold'>{mail.subject}</span></p>

                                <p><span>{mail.short_description}...</span></p>

                                <div className='flex justify-between gap-4 items-center w-full'>
                                  <p><span className='mr-4'>{dateFormatter(mail.date)}</span><span>{timeFormatter(mail.date)}</span></p>
                                  <p className='text-[#E54065] font-bold'>{isFavourite.has(mail.id) ? 'Favourite' : ''}</p>
                                </div>

                        </li>
                    </div>
                    )
                })
            }
    </div>
  )
}

export default EmailLists
