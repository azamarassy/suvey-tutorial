import React from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import { useState, useEffect } from 'react';
  
      const ResultComponent = ( props ) => {   
        const [averages, setAverages] = useState({});
        const [answers, setAnswers] = useState({});
        const [answerCount, setAnswerCount] = useState({});
        const [dataLoaded, setDataLoaded] = useState(false);
        const calculateAverages = async () => {
          const paramLabels = ['顔', '楽しさ', '頭', '価値観', '情緒'];    
          const querySnapshot = await getDocs(collection(firestore, 'results'));   
          const sums = {};
          const counts = {};
          querySnapshot.forEach((doc) => {
            for (let label of paramLabels) {
              sums[label] = (sums[label] || 0) + Number(doc.data()[label]);
              counts[label] = (counts[label] || 0) + 1;
            }
          });   

          const newAnswers = {};
          
          const kekkaText = Array.from(document.getElementsByClassName('form-control')).map((control) => {
            return control.value;
          });
          
          for (let index = 0; index < paramLabels.length; index++) {
            const label = paramLabels[index];
            newAnswers[label] = kekkaText[index];
          }
          
          setAnswers(newAnswers);
          

          const newAverages = {};
          for (let label of paramLabels) {
            newAverages[label] = sums[label] / counts[label];
          }
          setAverages(newAverages);
          setDataLoaded(true);
          
          const answerCount = querySnapshot.size;
          setAnswerCount(answerCount);
        };  
        useEffect(() => {
          calculateAverages();
        }, []);
         
        const saveToFirestore = async () => {
          const paramLabels = ['顔', '楽しさ', '頭', '価値観', '情緒'];
          const kekkaText = Array.from(document.getElementsByClassName('form-control')).map((control) => {
            return control.value;
          });
          
          const surveyData = {};
          for (let i = 0; i < paramLabels.length; i++) {
            surveyData[paramLabels[i]] = kekkaText[i];
          }
      
          try {
            await addDoc(collection(firestore, 'results'), {
              ...surveyData, 
              timestamp: new Date(),
            });
            window.alert("データがFirestoreに保存されました:\n" + paramLabels.map((label, index) => `${label} : ${kekkaText[index]}`).join("\n"));
            
            calculateAverages();
          } catch (error) {
            window.alert("データの保存に失敗しました: " + error);
          }
        };
    
        
        const [showAverage, setShowAverage] = useState(false);
        const [showAnswer, setShowAnswer] = useState(false);
        
  const handleResultClick = (event) => {
    event.preventDefault();
    saveToFirestore();
    setShowAnswer(true);
    props.handleResetClick(); 
    setShowAverage(true);

  };

  return (
    <div>

        {dataLoaded && showAnswer && (
          <div>
            <div className="mx-2">あなたの回答</div>
            <ul>
              {Object.keys(answers).map((label) => (
                <li key={label}>{label} : {answers[label]}</li>
              ))}
            </ul>
          </div>
        )} 

        {showAverage && (
          <div>
            <div className="mx-2">これまでの回答者{answerCount}人の平均値</div>
            <ul>
              {Object.keys(averages).map((label) => (
                <li key={label}>{label} : {averages[label].toFixed(1)}</li>
              ))}
            </ul>
          </div>
        )}

      <button type="button" id="resultButton" className="mx-2 my-2 btn btn-primary" onClick={handleResultClick} style={{width: '100px'}}>
        送信
      </button>
    </div>
  );
};

export default ResultComponent;
