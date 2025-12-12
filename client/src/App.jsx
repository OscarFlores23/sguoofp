import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [formulario, setFormulario] = useState({
    nombreCompleto: '',
    correo: '',
    telefono: ''
  });
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/usuarios');
      const data = await response.json();
      if (data.success) {
        setUsuarios(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editando) {
        const response = await fetch(`http://localhost:8080/api/usuarios/${editando}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formulario)
        });
        const data = await response.json();
        if (data.success) {
          cargarUsuarios();
          limpiarFormulario();
        }
      } else {
        const response = await fetch('http://localhost:8080/api/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formulario)
        });
        const data = await response.json();
        if (data.success) {
          cargarUsuarios();
          limpiarFormulario();
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditar = (usuario) => {
    setFormulario({
      nombreCompleto: usuario.nombreCompleto,
      correo: usuario.correo,
      telefono: usuario.telefono
    });
    setEditando(usuario.id);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
          method: 'DELETE'
        });
        const data = await response.json();
        if (data.success) {
          cargarUsuarios();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      nombreCompleto: '',
      correo: '',
      telefono: ''
    });
    setEditando(null);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <h1>Tu Nombre Completo - Grado y Grupo</h1>
      </nav>
      
      <div className="container">
        <div className="form-section">
          <h2>{editando ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nombreCompleto"
              placeholder="Nombre Completo"
              value={formulario.nombreCompleto}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              value={formulario.correo}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formulario.telefono}
              onChange={handleChange}
              required
            />
            <div className="botones">
              <button type="submit">
                {editando ? 'Actualizar' : 'Guardar'}
              </button>
              {editando && (
                <button type="button" onClick={limpiarFormulario}>
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="tabla-section">
          <h2>Lista de Usuarios</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombreCompleto}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.telefono}</td>
                  <td>
                    <button onClick={() => handleEditar(usuario)}>Editar</button>
                    <button onClick={() => handleEliminar(usuario.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;