import React from 'react'
import DOMPurify from 'dompurify'

function SafeHtmlContent({htmlContent}){
    const cleanHtml = DOMPurify.sanitize(htmlContent)
    // console.log(cleanHtml);
    return(
        <div dangerouslySetInnerHTML={{__html: cleanHtml}}/>
    )
 }   

export default SafeHtmlContent
