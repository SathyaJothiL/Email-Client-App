export function dateFormatter(timestamp){
    const date = new Date(timestamp)
    let newDate = `${date.getDate().toString().padStart(2,'0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`
    return newDate  
}
export function timeFormatter(timestamp){
  const date = new Date(timestamp)
  let hr = date.getHours()
  let min =date.getMinutes()
 let meridian 
  if(hr>12){
    hr-=12
    meridian = 'pm'
  }else{
    meridian = 'am'
  }  
   const time = hr.toString().padStart(2,'0')+ ":" + min.toString().padStart(2,'0')+ " " + meridian
  return time
}