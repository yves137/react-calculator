import { useState } from 'react';
import './App.css';


function NumbericButton({btnValue,onNumericClick}){
  return (
    <span className='bg-blue-300 py-3 px-10 rounded-lg hover:bg-blue-400' onClick={()=>onNumericClick(btnValue)}>{btnValue}</span>
  )
}

function SignOperatorButton({btnValue,onSignClick}){
  return (
    <span className='bg-orange-400 py-3 px-10 rounded-lg hover:bg-orange-500 text-white font-semibold text-xl' onClick={()=>onSignClick(btnValue)}>{btnValue}</span>
  )
}

function MiscellaniousButton({btnValue,onMiscClick}){
  return (
    <span className={`py-3 px-10 text-xl font-bold rounded-lg  ${btnValue==='=' ? 'col-span-2 text-center bg-orange-400 hover:bg-orange-500 text-white':'bg-blue-300 hover:bg-blue-400'}`} onClick={()=>onMiscClick(btnValue)}>{btnValue}</span>
  )
}

function DisplayerScreen({displayValue}){
  return (
  <div className='bg-blue-200 font-medium text-6xl flex justify-end py-12 px-3 rounded-md'>{displayValue}</div>
  )
}

function App() {

  const [total,setTotal]=useState(null)
  const [operator,setOperator]=useState(null)
  const [displayValue,setDisplayValue]=useState(0)
  const [isPointClicked,setIsPointClicked]=useState(false)
  const [zeroGo,setZeroGo]=useState(false)

  function handleNumerics(btnValue){
    if(zeroGo)
    setDisplayValue(v=>`${v}${btnValue}`)
    else if(btnValue!==0){
      setDisplayValue(`${btnValue}`)
      setZeroGo(true)
    }
    else if(btnValue==='0'){
      setDisplayValue(`${btnValue}`)
    }
  }
  
  function handleOperators(btnSign,isEqual=false){
    
    if(total===null || operator==null){
        setTotal(Number(displayValue))
        setDisplayValue(0)
        setOperator(btnSign)
    }
    else{
      if(operator==='+'){
        setTotal(v=>v+Number(displayValue))
        if(isEqual){
          setDisplayValue(total+Number(displayValue))
          setOperator(null)
        }
        else{
          setDisplayValue(0)
          setOperator(btnSign)
        }
      }
      else if(operator==='-'){
        setTotal(v=>v-Number(displayValue))
        if(isEqual){
          setDisplayValue(total-Number(displayValue))
          setOperator(null)
        }
      else{
        setDisplayValue(0)
        setOperator(btnSign)
      }
      }
      else if(operator==='*'){
        setTotal(v=>v*Number(displayValue))
        if(isEqual){
          setDisplayValue(total*Number(displayValue))
          setOperator(null)
        }
      else{
        setDisplayValue(0)
        setOperator(btnSign)
      }
      }
      else if(operator==='/'){
        setTotal(v=>v/Number(displayValue))
        if(isEqual){
          setDisplayValue(total/Number(displayValue))
          setOperator(null)
        }
      else{
        setDisplayValue(0)
        setOperator(btnSign)
      }
      }
    }

    if(isPointClicked)
      setIsPointClicked(v=>!v)
    if(zeroGo)
      setZeroGo(false)
  }

  function handleMiscellaneous(miscValue){
    if(miscValue==='=' && total!==null && operator !==null){
      handleOperators(operator,true)
    }
    else if(miscValue==='CE'){
      setDisplayValue(0)
      setTotal(null)
      setOperator(null)
      setIsPointClicked(false)
      setZeroGo(false)
    }
    else if(miscValue==='+/-'){
      setDisplayValue(v=>v*-1)
    }
    else if(miscValue==='%'){
      setDisplayValue(v=>v*100)
    }
    else if(miscValue==='.' && !isPointClicked){
      setDisplayValue(v=>`${v}.`)
      setIsPointClicked(v=>!v)
      setZeroGo(true)
    }
  }

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-indigo-950">
      <h1 className='text-blue-400 mb-24 text-7xl font-bold'>Calculator</h1>
      <div className='border-4 border-indigo-800 px-8 py-16 rounded-xl shadow-indigo-700 shadow-lg'>
          <DisplayerScreen displayValue={displayValue}/>
          <div >
              <div className='flex mt-5 gap-5'>
                <div className='grid grid-cols-3 text-lg font-medium gap-5'>
                  <MiscellaniousButton btnValue='CE' onMiscClick={handleMiscellaneous}/>
                  <MiscellaniousButton btnValue='+/-' onMiscClick={handleMiscellaneous}/>
                  <MiscellaniousButton btnValue='%' onMiscClick={handleMiscellaneous}/>
                  <NumbericButton btnValue={7} onNumericClick={handleNumerics}/>
                  <NumbericButton btnValue={8} onNumericClick={handleNumerics}/>
                  <NumbericButton btnValue={9} onNumericClick={handleNumerics}/>
                  <NumbericButton btnValue={4} onNumericClick={handleNumerics}/>
                  <NumbericButton btnValue={5} onNumericClick={handleNumerics}/>
                  <NumbericButton btnValue={6} onNumericClick={handleNumerics}/>
                  <NumbericButton btnValue={1} onNumericClick={handleNumerics}/>
                  <NumbericButton btnValue={2} onNumericClick={handleNumerics}/>
                  <NumbericButton btnValue={3} onNumericClick={handleNumerics}/>
                </div>
                <div className='grid gap-5'>
                  <SignOperatorButton btnValue='/' onSignClick={handleOperators}/>
                  <SignOperatorButton btnValue='*' onSignClick={handleOperators}/>
                  <SignOperatorButton btnValue='-' onSignClick={handleOperators}/>
                  <SignOperatorButton btnValue='+' onSignClick={handleOperators}/>
                </div>
              </div>
              <div className='grid grid-cols-4 gap-5 py-5'>
              <MiscellaniousButton btnValue='.' onMiscClick={handleMiscellaneous}/>
              <NumbericButton btnValue={0} onNumericClick={handleNumerics}/>
          
                <MiscellaniousButton btnValue='=' onMiscClick={handleMiscellaneous}/>
             
              </div>
          </div>
      </div>
    </div>
  );
}

export default App;
