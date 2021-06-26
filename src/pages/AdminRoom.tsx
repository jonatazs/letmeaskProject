import { useParams, useHistory } from 'react-router-dom';
// import { useState, FormEvent } from 'react';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'

import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss'
// import { useAuth } from '../hooks/useAuth';
// import { database } from '../services/firebase';
import {Question} from '../components/Question';
import { UseRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';






type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const {user} = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = UseRoom(roomId);
  
  async function handleDeleQuestion(questionId: string) {
   if (window.confirm('Do you want to delete this question?')){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
   }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }


  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
    
  }


  async function handleHilightedQuestion(questionId: string){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }



  

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask"/>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Close room</Button>
          </div>

        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          { questions.length > 0 && <span>{questions.length} question(s)</span>} 
        </div>


        <div className="questions-list">
          {questions.map((question) => {
            return (
              <Question  
              key={question.id}
              content={question.content}
              author={question.author}            
              >

                <button
                  type="button"
                  onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >                  
                  <img  src={checkImg} alt="Check question as answered" />
                </button>

                <button
                  type="button"
                  onClick={() => handleHilightedQuestion(question.id)}
                >                  
                  <img  src={answerImg} alt="Get question appearance " />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleQuestion(question.id)}
                >                  
                  <img  src={deleteImg} alt="Delete Question" />
                </button>
              </Question>
            );
          } )}
        </div>
      </main>

    </div>

  ); 
}