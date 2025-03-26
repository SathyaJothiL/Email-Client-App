import React from 'react'

const Button = ({name})=>{
 return (
    <>
    
    </>
 )
}

const Filter = ({filterAll,filterRead, filterFavourite,filterUnread,activeFilter}) => {
    const buttonLists = [
        'All','Read','Unread','Favourite'
    ]
  return (
    <div className='flex justify-start items-center gap-4 m-4'>
      <p className='text-[#636363] font-bold'> FilterBy:</p>
        < button onClick={()=>filterAll()} className={'px-8 py-2 rounded-3xl text-[#636363] font-bold '+(activeFilter===buttonLists[0] ? 'bg-[#E54065]' : 'bg-[#E1E4EA]')}>
        All
        </button>
        < button onClick={()=>filterRead()} className={'px-8 py-2 rounded-3xl text-[#636363] font-bold ' + (activeFilter===buttonLists[1] ? 'bg-[#E54065]' : 'bg-[#E1E4EA]')}>
        read
        </button>
        < button onClick={()=>filterUnread()} className={'px-8 py-2 rounded-3xl text-[#636363] font-bold ' + (activeFilter===buttonLists[2] ? 'bg-[#E54065]' : 'bg-[#E1E4EA]')}>
        Unread
        </button>
        < button onClick={()=>filterFavourite()} className={'px-8 py-2 rounded-3xl text-[#636363] font-bold '+(activeFilter===buttonLists[3] ? 'bg-[#E54065]' : 'bg-[#E1E4EA]')}>
        favourite
        </button>
    </div>
  )
}

export default Filter
