import React from 'react'

const EmailLists = ({filteredArray,clicker}) => {
    let time = []
    filteredArray.forEach(mail=>{
            const date = new Date(mail.date)
            let newDate = `${date.getDate().toString().padStart(2,'0')}-${(date.getMonth()+1).toString().padStart(2,'0')}-${date.getFullYear()}`
            time.push(newDate)
    })
  return (
    <div className='w-1/3'>
      {
                filteredArray.map((mail,index)=>{
                    return(
                    <div key={mail.id} className='p-2 border-[#CFD2DC] border-4'>
                        <button onClick={()=>clicker(mail.id)} className='flex flex-col gap-1 justify-center items-start text-left gap-4'>
                                <p>From : <span>{mail.from.name} &lt;{mail.from.email}&gt;</span></p>
  
                                <p>Subject : <span>{mail.subject}</span></p>

                                <p><span>{mail.short_description}...</span></p>

                                <p>Time : <span>{time[index]}</span></p>

                        </button>
                    </div>
                    )
                })
            }
    </div>
  )
}

export default EmailLists
