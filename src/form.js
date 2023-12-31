import React from 'react';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';

const FormComponent = () => {
 //--------------------------------------------------------------------------------------------------------
 //フォームの入力値の判定、バリデーション
  //1以上50以下の整数か判定する関数
  const isValidNumber = (value) => {
    const numericValue = Number(value); //入力値を数値型に変換(文字列は変換結果がNaNになる)
    //1以上50以下の整数ならtrueを返す
    return Number.isInteger(numericValue) && numericValue >= 1 && numericValue <= 50;
     //Number.isInteger(numericValue):整数かどうか判定するメソッド。整数であればtrue,整数以外であればfalseを返す
     //numericValue >= 1 && numericValue <= 50:1以上50以下か判定する
  };

  //フォームに入力した値が1以上50以下の整数かどうかを確認し、不正な値を取り除く
  const restrictInputToNumbers = (evt) => {
    const inputElement = evt.target; //フォームの入力要素をinputElementに代入
    const inputValue = inputElement.value.trim(); //入力値の文字列を取得し、前後の余分な空白を削除

    if (inputValue === '') return; //入力値が空の場合、チェックを行わずに関数を終了

    if (!isValidNumber(inputValue)) { //isValidNumber 関数を呼び出して、入力値が1から50の整数であるかを判定
      inputElement.value = ''; //不正な値であれば取り除く
    }
  };
 //--------------------------------------------------------------------------------------------------------
  //5つのフォームの入力値の合計を計算する関数
  const calculateInput = () => {
    const formControls = document.getElementsByClassName('form-control');
    let input = 0;
    for (let i = 0; i < 5; i++) {
      input += Number(formControls[i].value);
    }
    return input;
  };

  //残りポイントの計算
  const getValue = (event) => {
    let input = calculateInput();
    let output = 125 - input;
    document.getElementById('leftPt').textContent = output;
  };

  //各フォームの値を消去する関数
  const clearForm = (event, i) => {
    const formControls = document.getElementsByClassName('form-control');
    formControls[i-1].value = "";
  };
  //----------------------------------------------------------------------------------------------------------------------------------

  //-----------------------------------------------------------------------------------------------------------------------------------
  //レンダリングする部分を配列で作成
  const formCount = 5;//フォームの数を指定
  const forms = [];

  for(let i = 1; i <= formCount; i++){
    forms.push(//.push:配列の末尾に新しい要素を追加するメソッド
      <form key={i} className="form-horizontal">
        {/* key={i}:要素を区別するために使用する識別子。リスト内で同じ要素が複数回レンダリングされる場合に必要 */}
        <div className="form-group row ms-1 my-3">
          {/* プロパティ名 */}
          <label className="col-sm-4 control-label my-2 ml-3" style={{ fontSize: '20px' }}>プロパティ名</label>
          {/* フォーム */}
          <div className="col-sm-4">
            <input type="text" className="my-2 form-control" onChange={function(event){
              restrictInputToNumbers(event);
              getValue(event);        
            }}/>
          </div>
          {/* クリアボタン */}
          <div className="col-sm-4 d-flex align-items-center">
            <input type="reset" className="clearButton my-2 btn btn-primary" style={{ fontSize: '20px', marginLeft: '4px' }} value="クリア" onClick={(event) => {
              clearForm(event, i);//フォームの入力値を消す
              getValue(event);//残りポイントを計算
              }}/>
          </div>
        </div>
      </form>
    );
  }
  //---------------------------------------------------------------------------------------------------------------------------------

  return(<div>{forms}</div>);

};//FormComponent

export default FormComponent;