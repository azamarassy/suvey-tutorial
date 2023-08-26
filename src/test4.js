import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import FormComponent from './form'; 
import DecideComponent from './decideButton';
import ResultComponent from './resultButton';
const App = () => {
const [leftPt, setLeftPt] = useState(125);
const [showComponents, setShowComponents] = useState(true);
const [showComponents2, setShowComponents2] = useState(true);
const [showComponents3, setShowComponents3] = useState(true);
useEffect(() => {
  setting();
}, []);
  const setting = () => {
    setShowComponents(true);
    setShowComponents2(true);
    setShowComponents3(false);        
          const decide = DecideComponent();
          decide.setShowAnswer2(false);
  };
  useEffect(() => {
    if (showComponents) {
      document.getElementById('js-question').textContent = "女選びゲーム";
  
      let koumoku = ['顔 : 体型なども含む(服装は含みません) ', '楽しさ : 会話や遊んだときの楽しさ', '頭 : 理解力,記憶力,柔軟性など', '価値観 : 金銭感覚や共通の知識など', '情緒 : キレやすさや動揺しやすさなど'];
      let i = 0;
      while (i < 5) {
        document.getElementsByTagName('label')[i].textContent = koumoku[i];
        i++;
      }
    }
  }, [showComponents]);

const functions = {
    handleResetClick: () => {   
      setting();
      
      setLeftPt(125);    
    },
    handleShowComponents: (newValue) => {
      setShowComponents(newValue); 
    },
    handleShowComponents2: (newValue) => {
      setShowComponents2(newValue); 
    },
    handleShowComponents3: (newValue) => {
      setShowComponents3(newValue); 
    },
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

          {showComponents && (
          <div>
          <p style={{ fontSize: '20px' }} className="ms-2 mt-2 ml-4">残りポイントが0になるように1~50の数字を入力してください。</p>
          <p style={{ fontSize: '20px' }} className="ms-2 ml-4">各パラメータは50人中の順位を表しており、1に近づくほど自分の理想に近づきます。</p>
          <p style={{ fontSize: '20px' }} className="ms-2 ml-4">例えば、顔 : 1ptにすると、50人中1位の顔になります。</p>

          <FormComponent />

          <dl className="row text-center" >
            <dt style={{ fontSize: '25px' }} className=" mt-1 ">残りポイント</dt>
            <dd style={{ fontSize: '25px' }} className=" mt-1  " id="leftPt">{leftPt}</dd>
          </dl>
          </div>
          )} 

          <DecideComponent 
          handleShowComponents={functions.handleShowComponents}
          handleShowComponents2={functions.handleShowComponents2}
          handleShowComponents3={functions.handleShowComponents3}
          />
          {showComponents2 && (
          <div>
          <button type="button" className="mx-2 my-1 btn btn-primary" id="resetButton" onClick={functions.handleResetClick} style={{width: '100px'}}>
            リセット
          </button>
          </div>
          )}
          {showComponents3 && (
            <div>
          <ResultComponent
            handleResetClick={functions.handleResetClick}
            handleShowComponents={functions.handleShowComponents}/>
            </div>
            )}        
        </div>
      </div>
    </div>
  );
};
export default App;