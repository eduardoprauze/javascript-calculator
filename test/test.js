describe('JavaScript-Calculator', function(){
  var input;
  beforeEach(function (done) {
      input = document.createElement("input");
      input.type = "text";
      done();
  });

  describe('add input', function(){
    beforeEach(function (done) {
        input.value = "2";
        done();
    });

    it('should add value to regular input', function(){
        exp = false;
        addInput('5', input);
        expect(input.value).to.equal('25');
    });

    it('should add value to exponential power input', function(){
        exp = true;
        addInput('5', input);
        expect(input.value).to.equal('25');
    });

  });

  describe('input rules', function(){

    describe('#doubleOperator', function(){

      it('should not accept double operators in sequence', function(){
          var result = doubleOperator('+', '12+');
          expect(result).to.be.true;
      });

      it('should accept numbers after operators', function(){
          var result = doubleOperator('4', '12+');
          expect(result).to.be.false;
      });

    });

    describe('#initialOperator', function(){

      it('should accept "-" as first input', function(){
          var result = initialOperator('-', '');
          expect(result).to.be.false;
      });

      it('should not accept "+" as first input', function(){
          var result = initialOperator('+', '');
          expect(result).to.be.true;
      });

      it('should not accept "x" as first input', function(){
          var result = initialOperator('x', '');
          expect(result).to.be.true;
      });

      it('should not accept "÷" as first input', function(){
          var result = initialOperator('÷', '');
          expect(result).to.be.true;
      });

      it('should accept numbers as first input', function(){
          var result = initialOperator('5', '');
          expect(result).to.be.false;
      });

    });

    describe('#doubleDots', function(){

      it('should accept decimal point', function(){
          var result = doubleDots('.', '123');
          expect(result).to.be.false;
      });

      it('should not accept double decimal point in same number', function(){
          var result = doubleDots('.', '12.2');
          expect(result).to.be.true;
      });

      it('should accept two numbers with decimal point', function(){
          var result = doubleDots('.', '12.2x45');
          expect(result).to.be.false;
      });

    });

  });

  describe('exponential power input', function(){

    before(function (done) {
        exp = true;
        done();
    });

    it('should not accept "+" as exponential power', function(){
        var result = operatorAsPower('+');
        expect(result).to.be.true;
    });

    it('should not accept "-" as exponential power', function(){
        var result = operatorAsPower('-');
        expect(result).to.be.true;
    });

    it('should not accept "x" as exponential power', function(){
        var result = operatorAsPower('x');
        expect(result).to.be.true;
    });

    it('should not accept "÷" as exponential power', function(){
        var result = operatorAsPower('÷');
        expect(result).to.be.true;
    });

    it('should not accept "." as exponential power', function(){
        var result = operatorAsPower('.');
        expect(result).to.be.true;
    });

    it('should accept numbers as exponential power', function(){
        var result = operatorAsPower('8');
        expect(result).to.be.false;
    });

  });

  describe('clear input', function(){
    it('should clear the input', function(){
        input.value = "2+6";
        clearInput(input);
        expect(input.value).to.equal('');
    });
  });

  describe('delete input', function(){
    it('should only delete the last char of input', function(){
        input.value = "2+6";
        deleteInput(input);
        expect(input.value).to.equal('2+');
    });
  });

  describe('total', function(){
    it('should evaluate the equation and update the input', function(){
        input.value = "2+6";
        total(input);
        expect(input.value).to.equal('8');
    });
  });

  describe('exponential total', function(){
    var base_input, power_input;
    before(function(done){
      base_input = document.createElement("input");
      base_input.type = "text";
      base_input.value = "2";
      power_input = document.createElement("input");
      power_input.type = "text";
      power_input.value = "3";
      done();
    });

    it('should calculate the exponential and update the input', function(){
        totalExponential(base_input, power_input);
        expect(base_input.value).to.equal('8');
    });
    it('should clear the power input', function(){
        totalExponential(base_input, power_input);
        expect(power_input.value).to.equal('');
    });

  });

});
