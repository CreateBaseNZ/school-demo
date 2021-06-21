import blockFunctions from "../../../public/data/blocks.json";

export class CodeGenerator {
  private blockFunctions: Array<any>;
  private content: string;
  private executes: Array<string>;
  private execute: string;
  private increment: number;
  private code: string;
  private variables: string[];
  private functions: string[];


  constructor() {
    this.blockFunctions = blockFunctions;
    this.content = "";
    this.executes = [];
    this.execute = "";
    this.increment = 1;
    this.code = "";
    this.variables = [];
    this.functions = [];
  }

  private checkCorrectVar(varName: string) {
    //Check if variable in correct system
    const spaces = varName.includes(' ');
    const numberStart = (varName[0] < 'A' || varName[0] > 'z');
    if (numberStart || spaces||this.isBool(varName)) {
      console.log("Invalid Variable Name");
    }
    //Checks if variable created
    let found = false;
    for (let i = 0; i < this.variables.length; i++){
      if (this.variables[i] === varName) {
        found = true;
        break;
      }
    }
    if (!found) {
      this.variables.push(varName);
    }
    return varName+" = ";
  }

  private intialiseVar() {
    let str="";
    const varNum=this.variables.length-1;
    if(this.variables.length>0){
      str+=`let `;
      this.variables.forEach((data,index)=>{
        str += `${data}`;
        if(index==varNum){
          str+=`;\n`;
        }else{
          str+=`, `
        }
      })
    }
    return str;
  }

  private isNumber(varName: string) {
    for (let i = 0; i < varName.length; i++){
      if (varName[i] < '0' || varName[i] > '9') {
        return false
      }
    }
    return true;
  }

  private isBool(varName: string) {
    if (varName == "true" || varName == "false") {
      return true;
    }
    return false;
  }

  private addFunction(functionName) {
    for (let i = 0; i < this.functions.length; i++){
      if (this.functions[i] === functionName) {
        return false;
      }
    }
    this.functions.push(functionName);
    return true;
  }

  private checkEqualitySign(varName: string) {
    const possibility=["<",">",">=","<=","==","!=",">="]
    for (let i = 0; i < possibility.length; i++){
      const data = possibility[i];
      if (varName === data) {
        return true;
      }
    }      
    console.log("Incorrect Sign!");
    return false;
  }
  
  private checkSign(varName: string) {
    const possibility=["+","-","*","/","**","%"]
    for (let i = 0; i < possibility.length; i++){
      const data = possibility[i];
      if (varName === data) {
        return true;
      }
    }      
    console.log("Incorrect Sign!");
    return false;
  }

  private checkVariable(varName: string) {
    //Check if variable in correct system
    const spaces = varName.includes(' ');
    const numberStart = (varName[0] < 'A' || varName[0] > 'z');
    if (numberStart || spaces) {
      console.log("Invalid Variable Name");
      return false;
    }
    //Checks if variable created
    let found = false;
    for (let i = 0; i < this.variables.length; i++){
      if (this.variables[i] === varName) {
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("Unintialized Variable");
      return false;
    }
    return true;
  }

  private start(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find((element) => {
      return (
        element.robot === blockDetail.robot && blockDetail.type === "start"
      );
    });
    // Add to content
    this.content += blockFunction.logic;
  }

  private mathOp(blockDetail: any) {
    let compareInputs = ["var1", "sign", "var2"];
    let inputs: string = "";
    for (let i = 0; i < compareInputs.length; i++) {
      const val = String(blockDetail.value[compareInputs[i]]);
      if (compareInputs[i] != "sign") {
        if (!this.isNumber(val)) {
          this.checkVariable(val);
        }
      } else {
        this.checkSign(val);
      }
      inputs += val;
    }
    let output = '';
    output = this.checkCorrectVar(String(blockDetail.value.out));
    const str = `${output}(${inputs})`;
    this.executes.push(str);
  }

  private move(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find((element) => {
      if (element.type === "move") {
        return (
          element.function.name === blockDetail.name &&
          element.robot === blockDetail.robot
        );
      } else {
        return false;
      }
    });
    // Build input
    let inputVariables: string = "";
    let inputs: string = "";
    for (let i = 0; i < blockFunction.function.inputs.length; i++) {
      const element = blockFunction.function.inputs[i];
      const currentInput = String(blockDetail.value[element.variable]);
      if (!this.isNumber(currentInput)&&!this.isBool(currentInput)) {
        if (!this.checkVariable(currentInput)) {
          console.log("Can't be used");
        }
      }
      if (i === blockFunction.function.inputs.length - 1) {
        inputVariables += element.variable;
        inputs += currentInput;
      } else {
        inputVariables += element.variable + ", ";
        inputs += currentInput + ", ";
      }
    }
    const elementOut = blockFunction.function.output
    let output = '';
    if (elementOut) {
      output =this.checkCorrectVar(String(blockDetail.value[elementOut.variable]));
    }
    // Function name
    const functionName = blockFunction.function.name
    const added=this.addFunction(functionName);
    //const functionName = blockFunction.function.name + String(this.increment);
    this.increment++;
    // Build function
    const func = `let ${functionName} = (${inputVariables}) => {
      return new Promise((resolve, reject) => {
        ${blockFunction.function.logic}
      });
    }\n\n
    `;
    if (added) {
      this.content += func;
    }
    // Add execute
    const execute = `// ${blockFunction.name}
    ${output}await ${functionName}(${inputs});`;
    this.executes.push(execute);
  }

  private forStart(blockDetail) {
    const val = String(blockDetail.value.repNum);
    if (!this.isNumber(val)) {
      this.checkVariable(val);
    }
    const str = `for(let i=0;i<${val};i++){`;
    this.executes.push(str);
  }

  private ifStart(blockDetail: any) {
    const val = String(blockDetail.value.boolVar);
    if (!this.isBool(val)) {
      this.checkVariable(val);
    }
    let inputs = val;
    const str = `if(${inputs}){`;
    this.executes.push(str);
  }

  private whileStart(blockDetail: any) {
    const val = String(blockDetail.value.boolVar);
    if (!this.isBool(val)) {
      this.checkVariable(val);
    }
    let inputs = val;
    const str = `while(${inputs}){`;
    this.executes.push(str); 
  }

  private elseCondition() {
    let str = `}else{`;
    this.executes.push(str);
  }

  private compare(blockDetail) {
    let compareInputs = ["var1", "eqSign", "var2"];
    let inputs: string = "";
    for (let i = 0; i < compareInputs.length; i++) {
      const val = String(blockDetail.value[compareInputs[i]]);
      if (compareInputs[i] != "eqSign") {
        if (!this.isNumber(val)) {
          this.checkVariable(val);
        }
      } else {
        this.checkEqualitySign(val);
      }
      inputs += val;
    }
    let output = '';
    output = this.checkCorrectVar(String(blockDetail.value.out));
    const str = `${output}(${inputs})`;
    this.executes.push(str);
  }

  private intialise(blockDetail) {
    const currentInput = String(blockDetail.value.value);
    if (!this.isNumber(currentInput) && !this.isBool(currentInput)) {
      if (!this.checkVariable(currentInput)) {
        console.log("Can't be used");
      }
    }
    let output = '';
    output = this.checkCorrectVar(String(blockDetail.value.varName));
    const execute = `// Assign Variable
    ${output} ${currentInput};`;
    this.executes.push(execute);
  }

  private endCondition() {
    let str = `}`;
    this.executes.push(str);
  }

  private end(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find((element) => {
      return element.robot === blockDetail.robot && element.type === "end";
    });
    // Add to execute
    for (let i = 0; i < blockFunction.executes.length; i++) {
      const element = blockFunction.executes[i];
      this.executes.push(element);
    }
  }

  private run() {
    this.execute = "const run = async () => {\n";
    for (let i = 0; i < this.executes.length; i++) {
      const element = this.executes[i];
      this.execute += "\t" + element + "\n\n";
    }
    this.execute += "};\nrun();";
  }

  public build(blockDetails: Array<any> = []) {
    // Reset Values
    this.content = "";
    this.executes = [
      `// Terminate previous operations of the robotic system.
      const handler = () => {
        console.log('terminating')
        clearInterval(communication);
        clearInterval(interval);
        document.querySelectorAll(".terminate-code").forEach((el) => {
          el.removeEventListener("click", handler);
        });
      };
      document.querySelectorAll(".terminate-code").forEach((el) => {
        el.addEventListener("click", handler);
      });`,
    ];

    this.execute = "";
    this.increment = 1;
    this.code = "";
    //
    for (let i = 0; i < blockDetails.length; i++) {
      const element = blockDetails[i];
      switch (element.type) {
        case "start":
          this.start(element);
          break;
        case "move":
          this.move(element);
          break;
        case "end":
          this.end(element);
          break;
        case "if":
          this.ifStart(element);
          break;
        case "compare":
          this.compare(element);
          break;
        case "intialise":
          this.intialise(element);
          break;
        case "while":
          this.whileStart(element);
          break;
        case "math":
          this.mathOp(element);
          break;
        case "for":
          this.forStart(element);
          break;
        case "else-condition":
          this.elseCondition();
          break;
        case "end-condition":
          this.endCondition();
          break;
        default:
          break;
      }
    }
    this.run();
    return this.intialiseVar()+this.content + this.execute;
  }
}
