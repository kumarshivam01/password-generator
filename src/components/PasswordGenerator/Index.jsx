import React, { useCallback, useEffect, useState, useRef } from 'react'

const Index = () => {
  const [length, setLength]= useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  console.log(charAllowed)
  // useref hooks
  const passwordRef = useRef(null)
  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    console.log(str)
    if(numberAllowed){
      str += "0123456789"
     
      console.log('str')
    }
    if(charAllowed){
   
      str += "!@#$%^&*()[]{}`+-./~="
    }
    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length+1)
      pass += str.charAt(char)
      console.log(str)
    }
    setPassword(pass)

  },[length,charAllowed,numberAllowed,setPassword ])


  // copy password
  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0,20)  
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{
    passwordGenerator()
  },[length,charAllowed,numberAllowed,passwordGenerator])
  return (
    <div className='h-[100vh] py-[35vh] bg-gray-900'>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3  text-orange-500 bg-gray-700'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className='flex shadow rounded-lg overflow-hidden mb-4'>

    <input type="text" value={password} className='outline-none w-full py-1 px-3' ref={passwordRef} placeholder='password' readOnly />
    <button onClick={copyPassword} className='outline-none bg-blue-700 hover:bg-blue-800 text-white px-3 py-0.5 shrink-0'>
      copy
    </button>
    </div>
    <div className="flex text-sm gap-x-2">
      <div className="flex items-center gap-x-1">
        <input type="range" min={6} max={100} value={length} onChange={(e)=>{setLength(e.target.value)}} className='cursor-pointer' />
        <label htmlFor="">Length:{length}</label>
      </div> 
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={()=>{setNumberAllowed(!numberAllowed)}} />
        <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
        <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={()=>{setCharAllowed(!charAllowed)}} />
        <label htmlFor="charInput">Characters</label>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Index