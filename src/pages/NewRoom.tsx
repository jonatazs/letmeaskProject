import {FormEvent, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Button} from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';


export function NewRoom(){
  const {user} = useAuth();
  const [newRoom, setNewRoom] = useState('');
  const history = useHistory();

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();
 
    if (newRoom.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,      
      })

      history.push(`rooms/${firebaseRoom.key}`);
  }


  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration showing ask and answers" />
        <strong>Create rooms of Q&amp;A in live</strong>
        <p>Solve questions of your public interest in real-time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask"></img>
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input 
            type="text"
            placeholder="Room name"  
            onChange={event => setNewRoom(event.target.value)}  
            value={newRoom}        
            />
            
            <Button type="submit">
              Create Room
            </Button>
          </form>
          <p>
            Do you want enter in an existent room? <Link to='/' >Click here</Link>
          </p>
        </div>
      </main>
    </div>
  )

}