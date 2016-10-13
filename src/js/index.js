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

function currentInput()
{
  return exp == true ? power_input : base_input;
}
