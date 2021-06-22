import { useContext } from 'react';
import {Link} from 'react-router-dom';

import {Button} from '../components/Button';
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'



import '../styles/auth.scss'
import { AuthContext } from '../App';


export function NewRoom(){

  const {user} = useContext(AuthContext);


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
          <h1>{user?.name}</h1>
          <h2>Create a new room</h2>
          <form>
            <input 
            type="text"
            placeholder="Room's name"            
            />
            
            <Button type="submit">Create Room</Button>
          </form>
          <p>
            Do you want enter in an existent room? <Link to='/' >Click here</Link>
          </p>
        </div>
      </main>
    </div>
  )

}