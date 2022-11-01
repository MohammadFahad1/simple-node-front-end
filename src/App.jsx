import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
    event.target.reset();
  }

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder='Name' />
        <br />
        <input type="email" name="email" placeholder='Email' />
        <br />
        <button type="submit">Add User</button>
        <br />
      </form>
      <h1>Total Users: {users.length}</h1>
      {
        users.map(user =>
          <p key={user.id}>{user.name}, {user.email}</p>
        )
      }
    </div>
  )
}

export default App
