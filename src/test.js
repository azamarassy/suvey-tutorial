import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormComponent from './form'; 
import DecideComponent from './decideButton';
import ResultComponent from './resultButton';

const App = () => {

const [displayText, setDisplayText] = useState(['', '', '', '', '']);
const [leftPt, setLeftPt] = useState(125);

useEffect(() => {
  
  setting();
}, []);
  
  const setting = () => {
    document.getElementById('js-question').textContent = "女選びゲーム";

    let koumoku = ['顔 : 体型なども含む(服装は含みません) ', '楽しさ : 会話や遊んだときの楽しさ', '頭 : 理解力,記憶力,柔軟性など', '価値観 : 金銭感覚や共通の知識など', '情緒 : キレやすさや動揺しやすさなど'];
    let i = 0;
    while (i < 5) {
      document.getElementsByTagName('label')[i].textContent = koumoku[i];
      i++;
    }

    document.getElementById("resultButton").style.display = "none";
    document.getElementById("resetButton").style.display = "none";
  };

  const handleResetClick = () => {   
    setting();
    setDisplayText(['', '', '', '', '']);
    setLeftPt(125);

    for (let i = 0; i < 5; i++) {
      document.getElementsByClassName('kekka')[i].textContent = "";
    }

    document.getElementById('leftPt').textContent = "125";
    
    const clearForm = (i) => {
      const formControls = document.getElementsByClassName('form-control');
      formControls[i].value = "";
    };

    for (let i = 0; i < document.getElementsByClassName('clearButton').length; i++) {
        clearForm(i);
    }
  };

  return (
    <div className="container">
      <div id="js-question" className="mt-3 alert alert-primary" role="alert" style={{ fontSize: '25px' }}>
        A simple primary alert—check it out!
      </div>

      <div className="card-deck">
        <div className="card">
          <div className="card-header">
            <h1 id="1pName" style={{ fontSize: '30px' }}>女のパラメータ</h1>
          </div>

          <p style={{ fontSize: '20px' }} className="ms-2 mt-2 ml-4">残りポイントが0になるように1~50の数字を入力してください。</p>
          <p style={{ fontSize: '20px' }} className="ms-2 ml-4">各パラメータは50人中の順位を表しており、1に近づくほど自分の理想に近づきます。</p>
          <p style={{ fontSize: '20px' }} className="ms-2 ml-4">例えば、顔 : 1ptにすると、50人中1位の顔になります。</p>

          <FormComponent />

          <dl className="row">
            <dt style={{ fontSize: '25px' }} className="ms-2 mt-1 ml-3 col-4">残りポイント</dt>
            <dd style={{ fontSize: '25px' }} className="ms-2 mt-1 ml-8 " id="leftPt">{leftPt}</dd>
          </dl>

          <DecideComponent />

          <div id="displayText" className="my-3 ml-3 col-4">
            {displayText.map((text, index) => (
              <p key={index} className="kekka">{text}</p>
            ))}
          </div>

          <ResultComponent />  
           
          <button type="button" className="ms-1 my-1 btn btn-primary" id="resetButton" onClick={handleResetClick}>
             リセット
          </button>


        </div>
      </div>
    </div>
  );
};

export default App;










