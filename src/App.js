import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; //bootstrapのインポート
//------------------------------------------------------------------------------------------
//フォーム、確定ボタン、送信ボタンのコンポーネントを別のファイルからインポート
import FormComponent from './form'; 
import DecideComponent from './decideButton';
import ResultComponent from './resultButton';

//index.jsのrootに渡される。そこからindex.htmlのrootに渡されてレンダリングされる。
//index.jsはアプリケーションの中で一番最初に呼び出される部分(エントリーポイント)
const App = () => {
  const [leftPt, setLeftPt] = useState(125);
  const [showComponents, setShowComponents] = useState(true);
  const [showComponents2, setShowComponents2] = useState(true);
  const [showComponents3, setShowComponents3] = useState(true);
  const [showDecideButton, setShowDecideButton] = useState(true);
  const [showAnswer2, setShowAnswer2] = useState(false);
  const [surveyData, setSurveyData] = useState({});
  //--------------------------------------------------------------------------------------------------------------------
  //useEffectを使ってリロードしたときにsettingが呼ばれるようにする。
  useEffect(() => {
    setting();
  }, []);
    
    const setting = () => {
      setShowComponents(true);//説明文やフォームを表示
      setShowComponents2(true);//リセットボタンの表示
      setShowComponents3(false);//送信ボタンを非表示
      setShowDecideButton(true);//確定ボタンを表示
      setShowAnswer2(false);//結果を非表示
    };
    //-------------------------------------------------------------------------------------------------------------------

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

  //----------------------------------------------------------------------------------------------------
  const functions = {
      handleResetClick: () => {   
        setting();
        setLeftPt(125);

        if (showComponents) {
         document.getElementById('leftPt').textContent = "125";
        
        const clearForm = (i) => {
          const formControls = document.getElementsByClassName('form-control');
          formControls[i].value = "";
        };
    
        for (let i = 0; i < document.getElementsByClassName('clearButton').length; i++) {
            clearForm(i);
        }
       }
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
      handleShowDecideButton: (newValue) => {
        setShowDecideButton(newValue); 
      },
        handleShowAnswer2: (newValue) => {
          setShowAnswer2(newValue); 
      },
      updateSurveyData: (index, newValue) => {
        const updatedSurveyData = [...surveyData];
        updatedSurveyData[index] = newValue;
        setSurveyData(updatedSurveyData);
      }
  };

  //---------------------------------------------------------------------------------------------------
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

        <div className="row">

    <DecideComponent 
      handleShowComponents={functions.handleShowComponents}
      handleShowComponents2={functions.handleShowComponents2}
      handleShowComponents3={functions.handleShowComponents3}
      handleShowDecideButton={functions.handleShowDecideButton}
      handleShowAnswer2={functions.handleShowAnswer2}
      showDecideButton={showDecideButton}
      showAnswer2={showAnswer2}
      surveyData={surveyData}
      updateSurveyData={functions.updateSurveyData}
    />


    {showComponents3 && (
      <div>
        <ResultComponent
          handleResetClick={functions.handleResetClick}
          handleShowComponents={functions.handleShowComponents}
          surveyData={surveyData}
        />
      </div>
    )}

    {showComponents2 && (
      <div>
        <button type="button" className="mx-2 my-1 btn btn-primary" id="resetButton" onClick={functions.handleResetClick} style={{width: '100px'}}>
          リセット
        </button>
      </div>
    )}
  </div>
</div>
            
      </div>
    </div>
  );
};

export default App;











//----------------------------------------------------------------------------------------
// function App() {
//   const [face, setFace] = useState('');
//   const [fun, setFun] = useState('');
//   const [averageFace, setAverageFace] = useState(0);
//   const [averageFun, setAverageFun] = useState(0);
//   const [totalFace, setTotalFace] = useState(0);
//   const [totalFun, setTotalFun] = useState(0);
//   const [surveyData, setSurveyData] = useState([]);



//   const handleFormSubmit = (event) => {
//     event.preventDefault();

//     const faceValue = parseInt(face);
//     const funValue = parseInt(fun);

//     addDoc(collection(firestore, 'survey_results'), {
//       face: faceValue,
//       fun: funValue,
//     })
//       .then(() => {
//         alert('アンケート結果が保存されました！');
//         setFace('');
//         setFun('');
//       })
//       .catch((error) => {
//         console.error('データの保存に失敗しました:', error);
//       });
//   };

//   useEffect(() => {
//     // Firestoreからデータを取得して平均値を計算する処理
//     const fetchData = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(firestore, 'survey_results'));
//         //getDocs:Firestoreデータベース内のコレクション（collection）内のすべてのドキュメントを取得する
//         //await:非同期処理。ドキュメントの取得が完了するまで待機
//         //firestore 変数を使用してFirestoreのインスタンスを取得。collection メソッドの第一引数として渡されている。
//         //第二引数にはコレクションの名前（ここでは 'survey_results2'）が渡されている。
//         //querySnapshot 変数には、取得したドキュメントのデータやメタデータなどが格納される
//         //このオブジェクトを使って取得したドキュメントにアクセスし、データを処理できる

//         let totalFace = 0;
//         let totalFun = 0;
//         const data = [];
        
//         querySnapshot.forEach((doc) => {
//           const docData = doc.data();
//           totalFace += docData.face;
//           totalFun += docData.fun;
//           data.push(docData);
//         });

//         const numberOfDocs = querySnapshot.size;
//         const averageFaceValue = numberOfDocs === 0 ? 0 : totalFace / numberOfDocs;
//         const averageFunValue = numberOfDocs === 0 ? 0 : totalFun / numberOfDocs;

//         setAverageFace(averageFaceValue);
//         setAverageFun(averageFunValue);
//         setTotalFace(totalFace);
//         setTotalFun(totalFun);
//         setSurveyData(data);
//       } catch (error) {
//         console.error('データの取得に失敗しました:', error);
//       }
//     };

//     // Firestoreのデータに変更があった場合も再度データを取得する
//     const unsubscribe = onSnapshot(collection(firestore, 'survey_results'), () => {
//       fetchData();
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [face, fun]);

//   return (
//     <div className="container">
//       <form id="surveyForm" onSubmit={handleFormSubmit} className="survey-form">
//         <label htmlFor="face">顔：</label>
//         <input type="number" id="face" value={face} onChange={(e) => setFace(e.target.value)} required />

//         <label htmlFor="fun">楽しさ：</label>
//         <input type="number" id="fun" value={fun} onChange={(e) => setFun(e.target.value)} required />
        

//         <button type="submit">送信</button>

//         <div>
//           平均顔の値: {averageFace}
//         </div>
//         <div>
//           合計顔の値: {totalFace}
//         </div>
//         <div>
//           平均楽しさの値: {averageFun}
//         </div>
//         <div>
//           合計楽しさの値: {totalFun}
//         </div>
//         <div>
//           data.faceの値: {surveyData.map((data) => data.face).join(', ')}
//         </div>
//         <div>
//           data.funの値: {surveyData.map((data) => data.fun).join(', ')}
//         </div>
//       </form>


//     </div>
//   );
// }

// export default App;
//------------------------------------------------------------------------------------------------------