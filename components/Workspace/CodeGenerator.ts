import blockFunctions from "../../public/data/blocks.json";

export class CodeGenerator {
  private blockFunctions: Array<any>;
  private content: string;
  private executes: Array<string>;
  private execute: string;
  private increment: number;
  private code: string;

  constructor() {
    this.blockFunctions = blockFunctions;
    this.content = "";
    this.executes = [];
    this.execute = "";
    this.increment = 1;
    this.code = "";
  }

  private start(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find(element => {
      return (element.robot === blockDetail.robot && blockDetail.type === "start");
    });
    // Add to content
    this.content += blockFunction.logic;
  }

  private move(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find(element => {
      if (element.type === "move") {
        return ((element.function.name === blockDetail.name) && (element.robot === blockDetail.robot));
      } else {
        return false;
      }
    });
    // Build input
    let inputVariables: string = "";
    let inputs: string = "";
    for (let i = 0; i < blockFunction.function.inputs.length; i++) {
      const element = blockFunction.function.inputs[i];
      if (i === (blockFunction.function.inputs.length - 1)) {
        inputVariables += element.variable;
        inputs += String(blockDetail.value[element.variable]);
      } else {
        inputVariables += element.variable + ", ";
        inputs += String(blockDetail.value[element.variable]) + ", ";
      }
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
    await ((${inputVariables}) => {
      return new Promise((resolve, reject) => {
        ${blockFunction.function.logic}
      });
    })(${inputs});`;
    this.executes.push(execute);
  }

  private end(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find(element => {
      return (element.robot === blockDetail.robot && element.type === "end");
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
    this.executes = [ "document.querySelector('#stop-button').addEventListener('click', () => { clearInterval(communication); clearInterval(interval); });" ];
    this.execute = "";
    this.increment = 1;
    this.code = "";
    //
    for (let i = 0; i < blockDetails.length; i++) {
      const element = blockDetails[i];
      switch (element.type) {
        case "start": this.start(element); break;
        case "move": this.move(element); break;
        case "end": this.end(element); break;
        default: break;
      }
    }
    this.run();
    return (this.content + this.execute);
  }
}