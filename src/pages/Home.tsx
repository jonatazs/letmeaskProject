import { useContext } from 'react'
import { useHistory } from 'react-router-dom'


import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import {Button} from '../components/Button'



import '../styles/auth.scss'
import { AuthContext } from '../App'


export function Home() {

  const history = useHistory();
  const { user, signInWithGoogle } = useContext(AuthContext);

  async function handleCreateRoom(){    
    if (!user){
     await signInWithGoogle();
    }
    history.push('/rooms/new');    
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
          <form>
            <input 
            type="text"
            placeholder="Type the room code"            
            />

            <Button type="submit">Enter room</Button>
          </form>
          
        </div>
      </main>
    </div>
  )
}