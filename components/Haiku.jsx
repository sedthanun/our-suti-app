"use client"
import React from 'react'
import { CldImage } from 'next-cloudinary';
export default function Haiku(props) {
  return (
    <div className='relative rounded-xl overflow-hidden max-w-[650px] mx-auto'>
       {/* This make for Loading */}
      {/* <img src='/aspect-ratio.png' />
      <div className="absolute inset-0 bg-gray-200 grid">
      <span className='loading loading-dots loading-lg m-auto'></span>
      </div> */}
     <CldImage
    //  className='absolute inset-0'
   width="650"
   height="300"
   fillBackground
   crop={{type: "pad", source: true}}
   src={props.haiku.photo}
   sizes="650px"
   alt="Description of my image"
   overlays={[{
    position: {
        x: 34,
        y: 154,
        angle: -10,
        gravity: "north_west"
    },
    text: {
        color: "black",
        fontFamily: "Source Sans Pro",
        fontSize: 42,
        fontWeight: "bold",
        text: "Hello World"
    }

   },
   {
    position: {
        x: 30,
        y: 150,
        angle: -10,
        gravity: "north_west"
    },
    text: {
        color: "white",
        fontFamily: "Source Sans Pro",
        fontSize: 42,
        fontWeight: "bold",
        text: "Hello World"
    }

   }
  ]}
 />
         
 
 
            <p className="text-red-400  text-xl">{props.haiku.line1}</p>
            
            {props.haiku.line2}
            <br />
            {props.haiku.line3}
            <br />

          </div>
  )
}
