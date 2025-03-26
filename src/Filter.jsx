import React from 'react'

const Button = ({name})=>{
 return (
    <>
    
    </>
 )
}

const Filter = ({filterAll,filterRead, filterFavourite,filterUnread}) => {
    const buttonLists = [
        'All','read','Unread','favourite'
    ]
  return (
    <div className='p-8 flex justify-start items-center gap-4 bg-pink-400'>
        < button onClick={()=>filterAll()} className='px-4 py-1 border-gray-700 border rounder-sm'>
        All
        </button>
        < button onClick={()=>filterRead()} className='px-4 py-1 border-gray-700 border rounder-sm'>
        read
        </button>
        < button onClick={()=>filterUnread()} className='px-4 py-1 border-gray-700 border rounder-sm'>
        Unread
        </button>
        < button onClick={()=>filterFavourite()} className='px-4 py-1 border-gray-700 border rounder-sm'>
        favourite
        </button>
    </div>
  )
}

export default Filter
