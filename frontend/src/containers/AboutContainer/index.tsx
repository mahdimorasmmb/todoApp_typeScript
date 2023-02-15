import React, { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import AboutText from "../../assets/About.md"

const AboutContainer = () => {
  const [content,setContent] = useState('')


  useEffect(()=>{
    fetch(AboutText).then((res)=> res.text()).then((content)=>setContent(content)
      
    )
    
  },[])
  return <ReactMarkdown>{content}</ReactMarkdown>;
};

export default AboutContainer;
