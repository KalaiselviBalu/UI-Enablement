

const calculator = {
add : function(num1 , num2){
    this.num1 = num1;
    this.num2 = num2;
    console.log(this.num1 + this.num2)
},
sub : function(num1 , num2){
    this.num1 = num1;
    this.num2 = num2;
    console.log(this.num1 - this.num2)
},
multiply : function(num1 , num2){
    this.num1 = num1;
    this.num2 = num2;
    console.log(this.num1 * this.num2)
},
division : function(num1 , num2){
    this.num1 = num1;
    this.num2 = num2;
    console.log(this.num1 / this.num2)
}
}

const calcObj = new calculator.division(6,2);




