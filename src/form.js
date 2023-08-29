import React from 'react';

const FormComponent = () => {

  const formCount = 5;
  const forms = [];

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
    event.preventDefault();

    const formControls = document.getElementsByClassName('form-control');
    for (let i = 0; i < formControls.length; i++) {
      if (!isValidNumber(formControls[i].value)) {
        formControls[i].value = '';
      }
    }

    let input = calculateInput();
    let output = 125 - input;
    document.getElementById('leftPt').textContent = output;
  };

  //git test
  //git test2

  const clearForm = (event, i) => {
    event.preventDefault();
    const formControls = document.getElementsByClassName('form-control');
    formControls[i-1].value = "";
  };

  for (let i = 1; i <= formCount; i++) {
    forms.push(
      <form key={i} className="form-horizontal" action="/" method="POST" name={`assumption${i}`}>
        <div className="form-group row ms-1 my-3">
          <label className="col-sm-4 control-label my-2 ml-3" style={{ fontSize: '20px' }} htmlFor={`asset${i}`}>名前</label>
          <div className="col-sm-4">
            <input type="text" name={`asset_name${i}`} className="my-2 form-control" onChange={restrictInputToNumbers}/>
          </div>
          <div className="col-sm-4 d-flex align-items-center">
            <input type="submit" className="submitButton btn btn-primary mr-2" style={{ fontSize: '20px' }} value="決定" onClick={getValue}/>
            <input type="reset" className="clearButton my-2 btn btn-primary" name={`clear${i}`} style={{ fontSize: '20px', marginLeft: '4px' }} value="クリア" onClick={(event) => clearForm(event, i)}/>
          </div>
        </div>
      </form>
    );
  }

  return <div>{forms}</div>;
};

export default FormComponent;
