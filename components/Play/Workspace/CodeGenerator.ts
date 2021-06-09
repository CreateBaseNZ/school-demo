import blockFunctions from "../../../public/data/blocks.json";

export class CodeGenerator {
  private blockFunctions: Array<any>;
  private content: string;
  private executes: Array<string>;
  private execute: string;
  private increment: number;
  private code: string;
  private variables: string[];


  constructor() {
    this.blockFunctions = blockFunctions;
    this.content = "";
    this.executes = [];
    this.execute = "";
    this.increment = 1;
    this.code = "";
    this.variables = [];
  }

  private checkCorrectVar(varName: string) {
    //Check if variable in correct system
    const spaces = varName.includes(' ');
    const numberStart = (varName[0] < 'A' || varName[0] > 'z');
    if (numberStart || spaces) {
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
      varName = `let ${varName}`;
    }
    return varName+" = ";
  }

  private isNumber(varName: string) {
    for (let i = 0; i < varName.length; i++){
      if (varName[i] < '0' || varName[i] > '9') {
        return false
      }
    }
    return true;
  }

  private checkEqualitySign(varName: string) {
    const possibility=["<",">",">=","<=","==","!=",">="]
    for (let i = 0; i < possibility.length; i++){
      const data = possibility[i];
      console.log(data);
      if (varName === data) {
        console.log(1);
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
      if (i === blockFunction.function.inputs.length - 1) {
        inputVariables += element.variable;
        inputs += String(blockDetail.value[element.variable]);
      } else {
        inputVariables += element.variable + ", ";
        inputs += String(blockDetail.value[element.variable]) + ", ";
      }
    }
    const elementOut = blockFunction.function.output
    let output = '';
    if (elementOut) {
      output =this.checkCorrectVar(String(blockDetail.value[elementOut.variable]));
    }
    // Function name
    const functionName = blockFunction.function.name + String(this.increment);
    this.increment++;
    // Build function
    const func = `
    let ${functionName} = (${inputVariables}) => {
      return new Promise((resolve, reject) => {
        ${blockFunction.function.logic}
      });
    }\n\n
    `;
    //this.content += func;
    // Add execute
    const execute = `// ${blockFunction.name}
    ${output}await ((${inputVariables}) => {
      return new Promise((resolve, reject) => {
        ${blockFunction.function.logic}
      });
    })(${inputs});`;
    this.executes.push(execute);
  }



  private IfStart(blockDetail: any) {
    const blockFunction = this.blockFunctions.find((element) => {
      if (element.type === "if") {
        return (
          element.function.name === blockDetail.name &&
          element.robot === blockDetail.robot
        );
      } else {
        return false;
      }
    });
    console.log(blockFunction)
    if (blockFunction) {
      let inputs: string = "";
      for (let i = 0; i < blockFunction.function.inputs.length; i++) {
        const element = blockFunction.function.inputs[i];
        const val = String(blockDetail.value[element.variable]);
        if (i != 1) {
          if (!this.isNumber(val)) {
          this.checkVariable(val);
          }
        } else {
          this.checkEqualitySign(val);
        }
        inputs += String(blockDetail.value[element.variable]);
      }
      const str = `if(${inputs}){

      }`;
      this.executes.push(str);
    }
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
          this.IfStart(element);
        default:
          break;
      }
    }
    this.run();
    return this.content + this.execute;
  }
}
