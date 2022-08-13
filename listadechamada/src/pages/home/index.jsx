import { useState } from 'react'
import './global.css'
import {Card} from '../../components/Card'
import { useEffect } from 'react'


function Home() {

  const [nomeDoEstudante, setnomeDoEstudante] = useState()
  const [user, setUser] = useState({name: '', avatar: ''})
  const [estudante, setEstudante] = useState([])

  function addEstudante(){
    const newEstudante = {
      name: nomeDoEstudante,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })

    }
    setEstudante(prevState =>[...prevState, newEstudante])
  }

  useEffect(() => {
   fetch('https://api.github.com/users/swesley400')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
      })
    })
  }, 
  [])
  

  return (
    <div className='container'>
      <header><h1>Lista de presença</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt='foto de perfil'></img>
      </div>
      </header>

      <input type="text" placeholder='Digite o nome...' onChange={e => setnomeDoEstudante(e.target.value)} />
      <button type='Adicionar' onClick={addEstudante}>
        Adicionar
      </button>
      {
        estudante.map(estudante => (<Card
          key={estudante.time}
          nome= {estudante.name}
          time={estudante.time}>
           </Card>
          )) 
      }
   </div>
  )
}

export default Home
