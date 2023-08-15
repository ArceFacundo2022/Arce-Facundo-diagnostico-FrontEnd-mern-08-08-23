//import CardFetch from '../components/CardFetch'
import { useReducer } from 'react'
import '../style.css'
import ListTasks from '../components/ListTasks'
import CargarTarea from '../components/CargarTarea'
import { mainReducer } from '../reducers/mainReducer'
import { mainContext } from '../contexts/mainContext'

function Home() {

  const [reload, dispatchReload] = useReducer(mainReducer,{
    reload : true
  })

  return (
    <mainContext.Provider value={{
      reload,dispatchReload
    }
    }>
      <div className='row'>
        <div className='container' style={{"marginTop":"250px"}}>
          <button type='button' className='buttMostrar btn btn-outline-warning' onClick={() => {}}><CargarTarea/></button>
        </div>
        <div className="card" style={{"background-color" : "black", "alignItems" : 'center'}}>
          <div className='row' id='cardFetch' style={{"textAlign" : 'center'}}>
            <ListTasks/>
          </div>
        </div>
      </div>
    </mainContext.Provider>
  )
}

export default Home