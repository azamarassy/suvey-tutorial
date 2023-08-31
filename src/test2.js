import React, { useState, useEffect } from 'react';
import './App.css';
// import db from 'firebase/app'; 
// import firebase from 'firebase/app'; // Firebaseのインポート
// import 'firebase/firestore'; // Firestoreのインポート
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';


const firebaseConfig = {
  apiKey: "AIzaSyDvU9L07FZmaQI-hKAfH6Pu1XGEIVWVrQo",
  authDomain: "javascript-ankert-tutorial.firebaseapp.com",
  projectId: "javascript-ankert-tutorial",
  storageBucket: "javascript-ankert-tutorial.appspot.com",
  messagingSenderId: "59922096128",
  appId: "1:59922096128:web:536676015a53fffdaa38e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

function App() {
  const [face, setFace] = useState('');
  const [fun, setFun] = useState('');
  const [averageFace, setAverageFace] = useState(0);
  const [averageFun, setAverageFun] = useState(0);
  const [totalFace, setTotalFace] = useState(0);
  const [totalFun, setTotalFun] = useState(0);
  const [surveyData, setSurveyData] = useState([]);



  const handleFormSubmit = (event) => {
    event.preventDefault();

    const faceValue = parseInt(face);
    const funValue = parseInt(fun);

    addDoc(collection(firestore, 'survey_results'), {
      face: faceValue,
      fun: funValue,
    })
      .then(() => {
        alert('アンケート結果が保存されました！');
        setFace('');
        setFun('');
      })
      .catch((error) => {
        console.error('データの保存に失敗しました:', error);
      });
  };

  useEffect(() => {
    // Firestoreからデータを取得して平均値を計算する処理
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'survey_results'));
        //getDocs:Firestoreデータベース内のコレクション（collection）内のすべてのドキュメントを取得する
        //await:非同期処理。ドキュメントの取得が完了するまで待機
        //firestore 変数を使用してFirestoreのインスタンスを取得。collection メソッドの第一引数として渡されている。
        //第二引数にはコレクションの名前（ここでは 'survey_results2'）が渡されている。
        //querySnapshot 変数には、取得したドキュメントのデータやメタデータなどが格納される
        //このオブジェクトを使って取得したドキュメントにアクセスし、データを処理できる

        let totalFace = 0;
        let totalFun = 0;
        const data = [];
        
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          totalFace += docData.face;
          totalFun += docData.fun;
          data.push(docData);
        });

        const numberOfDocs = querySnapshot.size;
        const averageFaceValue = numberOfDocs === 0 ? 0 : totalFace / numberOfDocs;
        const averageFunValue = numberOfDocs === 0 ? 0 : totalFun / numberOfDocs;

        setAverageFace(averageFaceValue);
        setAverageFun(averageFunValue);
        setTotalFace(totalFace);
        setTotalFun(totalFun);
        setSurveyData(data);
      } catch (error) {
        console.error('データの取得に失敗しました:', error);
      }
    };

    // Firestoreのデータに変更があった場合も再度データを取得する
    const unsubscribe = onSnapshot(collection(firestore, 'survey_results'), () => {
      fetchData();
    });

    return () => {
      unsubscribe();
    };
  }, [face, fun]);

  return (
    <div className="container">
      <form id="surveyForm" onSubmit={handleFormSubmit} className="survey-form">
        <label htmlFor="face">顔：</label>
        <input type="number" id="face" value={face} onChange={(e) => setFace(e.target.value)} required />

        <label htmlFor="fun">楽しさ：</label>
        <input type="number" id="fun" value={fun} onChange={(e) => setFun(e.target.value)} required />
        

        <button type="submit">送信</button>

        <div>
          平均顔の値: {averageFace}
        </div>
        <div>
          合計顔の値: {totalFace}
        </div>
        <div>
          平均楽しさの値: {averageFun}
        </div>
        <div>
          合計楽しさの値: {totalFun}
        </div>
        <div>
          data.faceの値: {surveyData.map((data) => data.face).join(', ')}
        </div>
        <div>
          data.funの値: {surveyData.map((data) => data.fun).join(', ')}
        </div>
      </form>


    </div>
  );
}

export default App;
