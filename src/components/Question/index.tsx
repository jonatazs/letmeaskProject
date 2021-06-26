import { ReactNode } from 'react';
import './styles.scss';
import cs from 'classnames';


type QuestionProps = {
  content: string,
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}



export function Question({
    content,
    author,
    children,
    isAnswered = false,
    isHighlighted = false,
  }: QuestionProps){
  return (
    <div 
    // className={`question ${isAnswered ? 'answered': ''} ${isHighlighted ? 'highlighted' : ''} `}
    className={cs(`question`,
      {answered: isAnswered},
      {highlighted: isHighlighted && !isAnswered},
    )}
    >
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name}></img>
          <span>{author.name}</span>
        </div>
        <div>
            {children}
        </div>
      </footer>
    </div>


  );


}