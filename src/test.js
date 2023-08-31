import React from 'react';

const FormComponent = () => {
  const isValidNumber = (value) => {
    const numericValue = Number(value); 
    return Number.isInteger(numericValue) && numericValue >= 1 && numericValue <= 50;  
  };

  const restrictInputToNumbers = (evt) => {
    const inputElement = evt.target; 
    const inputValue = inputElement.value.trim(); 

    if (inputValue === '') return; 

    if (!isValidNumber(inputValue)) { 
      inputElement.value = ''; 
    }
  };
 
  const calculateInput = () => {
    const formControls = document.getElementsByClassName('form-control');
    let input = 0;
    for (let i = 0; i < 5; i++) {
      input += Number(formControls[i].value);
    }
    return input;
  };

  const getValue = (event) => {
    let input = calculateInput();
    let output = 125 - input;
    document.getElementById('leftPt').textContent = output;
  };

  const clearForm = (event, i) => {
    const formControls = document.getElementsByClassName('form-control');
    formControls[i-1].value = "";
  };
  
  const formCount = 5;
  const forms = [];
  for(let i = 1; i <= formCount; i++){
    forms.push(
      <form key={i} className="form-horizontal">
        <div className="form-group row ms-1 my-3">
          <label className="col-sm-4 control-label my-2 ml-3" style={{ fontSize: '20px' }}>プロパティ名</label>
          <div className="col-sm-4">
            <input type="text" className="my-2 form-control" onChange={function(event){
              restrictInputToNumbers(event);
              getValue(event);        
            }}/>
          </div>
          <div className="col-sm-4 d-flex align-items-center">
            <input type="reset" className="clearButton my-2 btn btn-primary" style={{ fontSize: '20px', marginLeft: '4px' }} value="クリア" onClick={(event) => {
              clearForm(event, i);
              getValue(event);
              }}/>
          </div>
        </div>
      </form>
    );
  }
  return(<div>{forms}</div>);
};
export default FormComponent;