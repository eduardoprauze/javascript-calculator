//Initial variables
var exp = false;
var base_input = document.getElementById('base_input');
var power_input = document.getElementById('power_input');

//Add event listener for mouse
var spans = document.getElementsByTagName('span');
for(i=0;i<spans.length;i++)
{
  spans[i].addEventListener("click",
           function() {
        buttonClicked(this.innerHTML);
    });
}

//Add event listener for keyboard
document.addEventListener("keypress", function(e) {
    var key = e.keyCode;
    if ((key == 47) ||
        (key == 42) ||
        (key == 45) ||
        (key == 43)
       )
    {
      buttonClicked(String.fromCharCode(key));
    }
});

document.addEventListener("keydown", function(e) {
    var key = e.keyCode;
    if ((key  >= 48 && key <= 57) || key == 173 )
    {
      addInput(String.fromCharCode(key), currentInput());
    }
    else if(key >= 96 && key <= 105)
    {
      addInput(String.fromCharCode(key - 48), currentInput());
    }
    else if(key == 13 || key == 61 || key == 187)
    {
      exp == true ? totalExponential(base_input, power_input ) : total(base_input);
    }
    else if(key == 46 || key == 8)
    {
      deleteInput(currentInput());
    }
    else if(key == 187 && e.shiftKey)
    {
      addInput('+', currentInput());
    }
});

function buttonClicked(val)
{
  var value = val;
  if (value == 'exp'){
    exp == true ? totalExponential(base_input, power_input) : exponential();
    return;
  }
  switch (value)
  {
    case 'c':
      clearInput(currentInput());
      break;
    case 'del':
      deleteInput(currentInput());
      break;
    case '=':
      exp == true ? totalExponential(base_input, power_input) : total(base_input);
      break;
    default:
      addInput(value, currentInput());
  }
}

function clearInput(input)
{
  input.value = '';
}

function deleteInput(input)
{
  input.value = input.value.slice(0,-1);
}

function addInput(value, input)
{
  if (inputValidation(value, input.value))  {  return;  }
  input.value += value;
}

function inputValidation(value, current_value)
{
  if (doubleOperator(value, current_value))  {  return true;  }
  if (initialOperator(value, current_value))  {  return true;  }
  if (operatorAsPower(value))  {  return true;  }
  if (doubleDots(value, current_value))  {  return true;  }
  return false;
}

function doubleDots(value, current_value)
{
  if (value == '.')
  {
    var regex = /^[-+÷x]+$/;
    for(i=current_value.length;i>-1;i--)
    {
       if (current_value[i] == '.') { return true; break; }
       if (regex.test(current_value[i])) { return false; break; }
    }
    return false;
  }

}

function operatorAsPower(value)
{
  var regex = /^[\-\+\÷\x\.]+$/;
  return exp == true && regex.test(value);
}

function doubleOperator(value, current_value)
{
  var regex = /^[\-\+\÷\x\.]+$/;
  return (regex.test(value) && regex.test(current_value.slice(-1)));
}

function initialOperator(value, current_value)
{
  var regex = /^[\+\÷\x\/\*]+$/;
  return (regex.test(value) && current_value.length < 1);
}

function currentInput()
{
  return exp == true ? power_input : base_input;
}

function total(input)
{
  if (input.value == ""){ return; }
  var equation = input.value.replace("÷", "/").replace("x", "*");
  input.value = eval(equation);
}

function totalExponential(base_input, power_input)
{
  var base = base_input.value;
  var power = power_input.value || '1';
  base_input.value = Math.pow(base, power);
  power_input.value = '';
  exp = false;
  expInputStyle(base_input, power_input);
}

function exponential()
{
  var input = base_input
  if ( input.value.length < 1)  { return; }
  if (exp == false)  { total(base_input); }
  exp = exp == true ? false : true;
  expInputStyle(base_input, power_input);
}

function expInputStyle(base_input, power_input)
{
  if (exp == true)
  {
    var font_size = '30px';
    var padding_top = '20px';
    var width = '270px';
    var placeholder = 'enter the power';
  }
  else
  {
    var font_size = '40px';
    var padding_top = '10px';
    var width = '290px';
    var placeholder = '';
  }
  base_input.style.fontSize = font_size;
  base_input.style.paddingTop = padding_top;
  base_input.style.width = width;
  power_input.placeholder = placeholder;
}
