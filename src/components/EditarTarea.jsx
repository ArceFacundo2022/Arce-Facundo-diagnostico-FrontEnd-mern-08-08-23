import { useState, useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { mainContext } from '../contexts/mainContext';
//import Form from 'react-bootstrap/Form';

function EditarTarea({idTask, title, description}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {dispatchReload, reload} = useContext(mainContext)


  const [inicio, setInicio] = useState({
    titulo: title,
    descripcion : description
  });

  const enviarDatos = async (id) => {
    const rawTareas = {
      titulo : inicio.titulo,
      descripcion : inicio.descripcion
  }

  const json = await fetch(`http://localhost:3000/tareas/${id}`, {
      headers: {
          'Content-Type': 'application/json',
  },
      method: 'PUT',
      body: JSON.stringify(rawTareas)
  })

  if (!json.ok){
      return alert(`Error al hacer la peticion`);
  }

  const data = await json.json()
  console.log(data)
  }

  return (
    <>
      <a type="button" onClick={handleShow}>
      🔶
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: 'black', border: '2px solid yellow' }}>
          <Modal.Title style={{ color: 'yellow' }}>Cargar Tareas a la lista</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'black', color: 'yellow', border: '2px solid yellow' }}>
          <form action="">
            <div className="row">
              <label htmlFor="formGroupExampleInput" className="form-label"><strong>Titulo de la Tarea</strong></label>
              <div className="form-group input-group flex-nowrap">
                <input type="text" name="" className="form-control" id="titulo" value={inicio.titulo} required onChange={(e) => { setInicio({...inicio, "titulo" : e.target.value }) }} />
              </div>
              <label htmlFor="formGroupExampleInput" className="form-label mt-2"><strong>Descripcion de la tarea</strong></label>
              <div className="form-group mt-2 input-group flex-nowrap">
                <input type="text" className="form-control" name="" id="descripcion" value={inicio.descripcion} required onChange={(e) => { setInicio({ ...inicio, "descripcion": e.target.value }) }} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'black', color: 'yellow', border: '2px solid yellow' }}>
          <button className="d-none d-md-inline appointment-btn scrollto btn btn-outline-warning regButton" onClick={handleClose}>
            Cerrar
          </button>

          <button className="d-none d-md-inline appointment-btn scrollto btn btn-outline-warning" onClick={async () => { await enviarDatos(idTask);handleClose();dispatchReload({type : "[Reload]", reload})}}>
            Ingresar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditarTarea;