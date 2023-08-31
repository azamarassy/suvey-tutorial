import React from 'react';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import { useState, useEffect } from 'react';

// const ResultComponent = ({ handleResetClick }) => {//propsで別のファイルの関数を使う方法を知りたい
//フォーム内容をfirebaseに送信した後、入力内容をリセットする処理をしたい。
//リセットの処理はhandleResetClickを使ってやりたい。
      const ResultComponent = ( props ) => {
        //状態変数および状態関数を定義
        //状態変数が変わったときに再レンダリングされる。
        //状態関数を呼び出して状態変数を更新する。   
        const [averages, setAverages] = useState({});
        const [answerCount, setAnswerCount] = useState({});
        const surveyData = props.surveyData;
        //FireStoreに保存されたパラメータの平均値を求める処理
        const calculateAverages = async () => {
          const paramLabels = ['顔', '楽しさ', '頭', '価値観', '情緒'];
          const querySnapshot = await getDocs(collection(firestore, 'results'));   
          const sums = {};
          const counts = {};
          
          //Firestoreからデータを取得
          querySnapshot.forEach((doc) => {
            for (let label of paramLabels) {
              sums[label] = (sums[label] || 0) + Number(doc.data()[label]);
              counts[label] = (counts[label] || 0) + 1;
            }
          });   

          const newAverages = {};
          for (let label of paramLabels) {
            newAverages[label] = sums[label] / counts[label];
          }
          setAverages(newAverages);
    
          // これまでの回答者の数を取得し、状態変数に保存する
          const answerCount = querySnapshot.size;
          setAnswerCount(answerCount);
        };  

        //ページ更新したときにcalculateAverages()が呼ばれる
        useEffect(() => {
          calculateAverages();
        }, []);
         
        //Firestoreにデータを保存する処理
        const saveToFirestore = async () => {
          //配列を定義
          // const paramLabels = ['顔', '楽しさ', '頭', '価値観', '情緒'];
          // //form-controlの要素のvalueを配列にする
          // //つまるフォームに入力した値を取得して配列にする
          // const kekkaText = Array.from(document.getElementsByClassName('form-control')).map((control) => {
          //   //Array.from:配列のようなオブジェクトを新しい配列に変換するための関数
          //   //document.getElementsByClassName('form-control')):form-controlというクラス名を持つすべての要素を取得
          //   //.map((control) => ...): 取得した要素のリストに対してmap()関数を実行
          //   return control.value;
          //   //form-controlsに含まれるinput要素のvalueを取得して、それらの値を新しい配列として取得
          // });
          
          // //paramLabelsとkekkaTextという2つの配列を使用して、surveyDataという新しいオブジェクトを生成
          // const surveyData = {}; //surveyDataというオブジェクトを定義

          // for (let i = 0; i < paramLabels.length; i++) {//iがparamLabelsという配列の要素の数より小さい間処理を実行。一回実行するごとにiを1プラス
          //   //オブジェクトを作成
          //   surveyData[paramLabels[i]] = kekkaText[i];
          //   //javascriptのオブジェクトの作成の仕方の1つ(ブラケット法)-------------------------------------
          //    //↑↑の場合は{ paramLabels[i]: 'kekkaText[i]' }というオブジェクトができる。
          //    // const person = {};
          //    // const key = 'name';
          //    // const value = 'John';

          //    // // プロパティを設定する
          //    // person[key] = value;

          //    // console.log(person);
          //    // // 出力: { name: 'John' }
          //    //------------------------------------------------------------------------------------
          // }  

          
          try {
            //try { ... } catch (error) { ... }: JavaScriptの例外処理構文。
            //tryブロック内のコードを実行し、エラーが発生した場合はcatchブロック内のコードが実行される。
            //エラーが発生しない場合は、catchブロックはスキップされる。
            await addDoc(collection(firestore, 'results'), {
              //addDoc()関数:Firestoreのデータベースにドキュメントを追加するための関数
              //collection()関数:指定されたFirestoreのコレクションへの参照を取得
              //'results'というコレクションに新しいドキュメントを追加

              //surveyDataオブジェクトに含まれるデータを...（スプレッド構文）を使用して展開し、新しいドキュメントとしてFirestoreに保存
              //...surveyDataというようにスプレッド構文を使うことでfirestoreにドキュメント : serveydata,フィールド : 顔: 15って感じで保存できる
              //surveyDataオブジェクトのプロパティを直接ドキュメントの階層に持たせる
              ...surveyData, //surveyData[paramLabels[i]] = kekkaText[i];({ 顔: 15 }って感じのオブジェクト)

              //送信した時間
              timestamp: new Date(),
            });
            window.alert("データが送信されました");
            calculateAverages();
          } catch (error) {//エラーが発生した時の処理
            window.alert("データの保存に失敗しました: " + error);
          }
        };
    
        // 平均値を表示するための状態変数と更新関数を定義する
        const [showAverage, setShowAverage] = useState(false);
        const [showSendButton, setShowSendButton] = useState(true);
        // const [showAnswer, setShowAnswer] = useState(false);

  //--------------------------------------------------------------------------
  
  // const [latestData, setLatestData] = useState([]);

  //   async function fetchLatestData() {
  //     // Firestoreのクエリを構築して最新のデータを取得
  //     const q = query(collection(firestore, 'results'), orderBy('timestamp', 'desc'), limit(1));
  //     const querySnapshot = await getDocs(q);

  //     // 最新のデータを取得してlatestDataにセット
  //     const data = querySnapshot.docs.map((doc) => doc.data());
  //     setLatestData(data);
  //   }

//--------------------------------------------------------------------------------------
// // rankの値を保持するstateを作る
// const [valuerank, setvalueRank] = useState(null);
//   //何人中何位か表示したい
//   const values = [];
//   getDocs(collection(firestore, 'results')).then((querySnapshot) => {

//     const docArray = Array.from(querySnapshot.docs); // querySnapshot.docs を配列に変換
    
//     docArray.forEach((doc) => {
//       values.push(doc.data()["価値観"]);
//     });
  

//   // 送信された'価値観'の値を取得する
//   let value = surveyData["価値観"];
//   values.push(value);
//   // 配列を降順にソートする
//   values.sort((a, b) => a - b);
  
//   // 配列の中で送信された値のインデックスを取得する
//   let index = values.indexOf(value);
  
//   // インデックスに1を足して順位を求める
//   setvalueRank(index + 1); 
// });
//--------------------------------------------------------------------------------------
//各パラメータの順位を計算
const calculateRank = (property, surveyValue, rankSetter) => {
  const dataValues = [];
  getDocs(collection(firestore, 'results')).then((querySnapshot) => {
    const docArray = Array.from(querySnapshot.docs);
    
    docArray.forEach((doc) => {
      dataValues.push(doc.data()[property]);
    });

    dataValues.push(surveyValue);
    dataValues.sort((a, b) => a - b);

    const index = dataValues.indexOf(surveyValue);
    rankSetter(index + 1);
  });
};

const [faceRank, setFaceRank] = useState(null);
const [funRank, setFunRank] = useState(null);
const [intelligenceRank, setIntelligenceRank] = useState(null);
const [valueRank, setValueRank] = useState(null);
const [emotionRank, setEmotionRank] = useState(null);

useEffect(() => {
  calculateRank("顔", surveyData["顔"], setFaceRank);
  calculateRank("楽しさ", surveyData["楽しさ"], setFunRank);
  calculateRank("頭", surveyData["頭"], setIntelligenceRank);
  calculateRank("価値観", surveyData["価値観"], setValueRank);
  calculateRank("情緒", surveyData["情緒"], setEmotionRank);
}, [surveyData]);

//----------------------------------------------------------------------------------

// // 平均値を求める関数
// const mean = (array) => {
//   const sum = array.reduce((a, b) => a + b, 0);
//   return sum / array.length;
// };

// // 標準偏差を求める関数
// const standardDeviation = (array) => {
//   const avg = mean(array);
//   const squaredDifferences = array.map((x) => Math.pow(x - avg, 2));
//   const variance = mean(squaredDifferences);
//   return Math.sqrt(variance);
// };

// // 偏差値を求める関数
// const deviationValue = (value, array) => {
//   const avg = mean(array);
//   const sd = standardDeviation(array);
//   return Math.floor(((value - avg) / sd * 10 + 50)* 10) / 10;
// };

// // プロパティごとに偏差値を計算する関数
// const calculateDeviationValue = (property, surveyValue, deviationValueSetter) => {
//   const dataValues = [];
//   getDocs(collection(firestore, 'results')).then((querySnapshot) => {
//     const docArray = Array.from(querySnapshot.docs);
    
//     docArray.forEach((doc) => {
//       dataValues.push(doc.data()[property]);
//     });

//     dataValues.push(surveyValue);

//     // 偏差値を計算する
//     const dv = deviationValue(surveyValue, dataValues);
//     deviationValueSetter(dv);
//   });
// };

// // useStateで各プロパティの偏差値を管理する
// const [faceDV, setFaceDV] = useState(null);
// const [funDV, setFunDV] = useState(null);
// const [intelligenceDV, setIntelligenceDV] = useState(null);
// const [valueDV, setValueDV] = useState(null);
// const [emotionDV, setEmotionDV] = useState(null);

// // useEffectで各プロパティの偏差値を計算する
// useEffect(() => {
//   calculateDeviationValue("顔", surveyData["顔"], setFaceDV);
//   calculateDeviationValue("楽しさ", surveyData["楽しさ"], setFunDV);
//   calculateDeviationValue("頭", surveyData["頭"], setIntelligenceDV);
//   calculateDeviationValue("価値観", surveyData["価値観"], setValueDV);
//   calculateDeviationValue("情緒", surveyData["情緒"], setEmotionDV);
// }, [surveyData]);



  //---------------------------------------------------------------------------------------
        
  const handleResultClick = (event) => {
    event.preventDefault();
    saveToFirestore();
    // props.handleResetClick(); // props経由で受け取ったhandleResetClickを呼び出す
    // fetchLatestData();
    // props.handleShowComponents(false); //結果以外を消す状態関数をpropsで呼びたい
    setShowAverage(true);
    setShowSendButton(false);
    // setShowAnswer(true);
  };
  //-----------------------------------------------------------------------------------------
  const RankDisplay = ({ property, rank }) => (
    <div className="text-center my-2">{property}の順位{rank}位</div>
  );
//-------------------------------------------------------------------------------------------
  // プロパティと偏差値のオブジェクトを作る
// const properties = {
//   顔: faceDV,
//   楽しさ: funDV,
//   頭: intelligenceDV,
//   価値観: valueDV,
//   情緒: emotionDV,
// }

// // オブジェクトのキーと値を使ってdiv要素をマップする
// const divElements = Object.keys(properties).map((key) => (
//   <div className="text-center my-2">{key}の偏差値{properties[key]}</div>
// ))
  //---------------------------------------------------------------------------------------

  return (
    <div>
        {/* showAnswerがtrueのときはレンダリングされる */}
        {/* {showAnswer && (
          <div>
            <div className="mx-2 my-3">あなたの回答</div>
            <ul>
            {latestData.map((data) => (
                  <div key={data.id}>
                  <p>顔: {data["顔"]}</p>
                  <p>楽しさ: {data["楽しさ"]}</p>
                  <p>頭: {data["頭"]}</p>
                  <p>価値観: {data["価値観"]}</p>
                  <p>情緒: {data["情緒"]}</p>                  
                </div>
            ))}
            </ul>
          </div>
        )}  */}

        {showAverage && (
          <div>
            <RankDisplay property="顔" rank={faceRank} />
            <RankDisplay property="楽しさ" rank={funRank} />
            <RankDisplay property="頭" rank={intelligenceRank} />
            <RankDisplay property="価値観" rank={valueRank} />
            <RankDisplay property="情緒" rank={emotionRank} />
            {/* <div>{divElements}</div> */}

            <div className="text-center my-4">これまでの回答者{answerCount}人の平均値</div>
              <ul>
                {Object.keys(averages).map((label) => (
                  <div className="text-center my-3" key={label}>{label} : {averages[label].toFixed(1)}</div>
                ))}
              </ul>
          </div>
          )}

          {showSendButton && (
            <div>
            <button type="button" id="resultButton" className="mx-2 my-2 btn btn-primary" onClick={handleResultClick} style={{width: '100px'}}>
              送信
            </button>
          </div>
          )}
    </div>
  );
};

export default ResultComponent;
