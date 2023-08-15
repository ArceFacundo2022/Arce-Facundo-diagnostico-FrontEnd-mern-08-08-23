import { useEffect, useContext } from 'react'
import { useState } from 'react'
import EditarTarea from './EditarTarea'
import { mainContext } from '../contexts/mainContext'

function ListTasks() {

  const [respuesta, setRespuesta] = useState([])
  const {dispatchReload, reload} = useContext(mainContext)

  const deleteTask = async (id) => {
      const json = await fetch(`http://localhost:3000/tareas/${id}`, {
          headers: {
              'Content-Type': 'application/json'
          },
              method: 'DELETE',
        })
      if (!json.ok){
          return alert(`Error al hacer la peticion`);
      }
      const data = await json.json()
      console.log(data)
  }

  const StateTask = async (id, state) => {
    const json = await fetch(`http://localhost:3000/statusTarea/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
            method: 'PUT',
            body: JSON.stringify({state})
      })
    if (!json.ok){
        return alert(`Error al hacer la peticion`);
    }
    const data = await json.json()
    console.log(data)
  }

  const execute = async () => {
    const json = await fetch('http://localhost:3000/tareas', {
        headers: {
            'Content-Type': 'application/json'
        },
            method: 'GET',
      })
    if (!json.ok){
        return alert(`Error al hacer la peticion`);
    }
    const data = await json.json()
    setRespuesta(data.tasks)
  }

  useEffect(() => {

    execute()
  }, [reload])

  return (
    <>
    {respuesta.map((respuesta2,key) => {
      if(!respuesta2.hidden){
        let rgb = "rgb(77, 127, 221)"
        let icon = "✅"
        if(respuesta2.state == "Completado"){
          rgb = "rgb(192, 194, 31)"
          icon = "❎"
        }
        return (
        <>
            <div key={"respuesta" + key} className="card col-lg-4 col-md-6 bg-warning align-items-stretch mt-6 mt-lg-0 mr-6" >
                <div className='card-body bg-dark p-2 text-white'>
                    <div className="icon-box">
                      <h4 className="color: black;">{respuesta2.titulo}</h4>
                      <hr/>
                      <p className="color: black;">{respuesta2.descripcion}</p>
                      <hr/>
                        <span style={{"color":`${rgb}`}}>
                          <p  style={{"font-size":"30px"}} >{respuesta2.state}</p>
                        </span>
                      <hr/>
                      <div style={{"alignItems": "center"}}>
                        <a type="button" onClick={async () => {await StateTask(respuesta2._id, respuesta2.state);dispatchReload({type : "[Reload]", reload})}}>
                          <i style={{"font-size":"30px"}} >{icon}</i>
                        </a>
                        <a type="button" onClick={async () => {}}>
                          <i style={{"font-size":"30px"}} ><EditarTarea idTask={respuesta2._id} title={respuesta2.titulo} description={respuesta2.descripcion}/></i>
                        </a>
                        <a type="button" onClick={async () => {await deleteTask(respuesta2._id);dispatchReload({type : "[Reload]", reload})}}>
                          <i style={{"font-size":"30px"}} >❌</i>
                        </a>
                      </div>
                    </div>
                </div>
            </div>
        </>)}
    })}
    </>
  )
}

export default ListTasks