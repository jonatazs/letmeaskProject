
import { useHistory } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import {Button} from '../components/Button'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'


export function Home() {

  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [ roomCode, setRoomCode ] = useState('');

  async function handleCreateRoom(){    
    if (!user){
     await signInWithGoogle();
    }
    history.push('/rooms/new');    
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();

    if(roomCode.trim() === '' ){
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if(!roomRef.exists()){
      alert('Room does not exists.');
      return;
    }

    history.push(`/rooms/${roomCode}`)

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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google Logo"  />
            Create your room with Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom} >
            <input 
            type="text"
            placeholder="Type the room code"     
            onChange={event => setRoomCode(event.target.value)}
            value={roomCode}       
            />

            <Button type="submit">Enter room</Button>
          </form>
          
        </div>
      </main>
    </div>
  )
}