//Calculator Class
class calculator{
    constructor(previousText,currentText) {
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }
    clear(){
        this.previousText = '';
        this.currentText = '';
        this.operation = undefined;
    }
    delete(){
        this.currentText = this.currentText.substr(0,this.currentText.length-1);
    }
    appendNumber(number){
        if(number === '.' && this.currentText.includes(".")) return;
        this.currentText+= number;
    }
    chooseOperation(operand){
        this.operation = operand;
        if(this.currentText === '')
            return;
        if(this.previousText !== ''){
            this.compute();
            return;
        }       
        this.previousText = this.currentText;
        this.currentText = "";
    }
    compute(){
        let result;
        switch(this.operation){
            case '+':
                result = parseFloat(this.previousText) + parseFloat(this.currentText);
                break;
            case '-':
                result = parseFloat(this.previousText) - parseFloat(this.currentText);
                break;
            case '*':
                result = parseFloat(this.previousText) * parseFloat(this.currentText);
                break;
            case '/':
                result = parseFloat(this.previousText) / parseFloat(this.currentText);
                break;
        }
        if(this.operation == null)
            return;
        this.previousText=result;
        this.currentText ="";
        this.operation = null;
    }
    updateDisplay(){
        CurrOp.innerText = this.currentText;
        if(this.operation !=null)
            PrevOp.innerHTML = `${this.previousText} ${this.operation}`;
        else
        PrevOp.innerHTML = this.previousText;
    }
}
//Capturing elements

const NumOps = document.querySelectorAll('[data-number]');
const PrevOp = document.querySelector('[data-prev]');
const CurrOp = document.querySelector('[data-curr]');
const AceOp = document.querySelector('[data-ace]');
const DeleteOp = document.querySelector('[data-delete]');
const Operations = document.querySelectorAll('[data-operation]');
const EqualOp = document.querySelector('[data-equal]');

//Defining New calculator
const Calculator = new calculator(PrevOp,CurrOp);

//Numbers
NumOps.forEach(button =>{
    button.addEventListener("click",()=>{
        Calculator.appendNumber(button.innerText);
        Calculator.updateDisplay();
    })
})
//Delete
DeleteOp.addEventListener("click",()=>{
    Calculator.delete();
    Calculator.updateDisplay();
})
//ACE
AceOp.addEventListener("click",()=>{
    Calculator.clear();
    Calculator.updateDisplay();
})
//Operations
Operations.forEach(button =>{
    button.addEventListener("click",()=>{
        Calculator.chooseOperation(button.innerText);
        Calculator.updateDisplay();
    })
})
//Equal
EqualOp.addEventListener("click",()=>{
    Calculator.compute();
    Calculator.updateDisplay();
})