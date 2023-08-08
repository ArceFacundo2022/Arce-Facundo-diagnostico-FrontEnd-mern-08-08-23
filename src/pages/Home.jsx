//import CardFetch from '../components/CardFetch'
import { useState } from 'react'
import '../style.css'

function Home() {

  const [show, setShow] = useState(false)

  return (
    <div className='row'>
      <button type='button' className='buttMostrar btn btn-outline-danger' hidden={show} onClick={() => {setShow(true)}}>Mostrar Cartas</button>
      <div className="card" hidden={!show} style={{"background-color" : "black"}}>
        <div className='row' id='cardFetch'>
          { show }
        </div>
      </div>
    </div>
  )
}

export default Home