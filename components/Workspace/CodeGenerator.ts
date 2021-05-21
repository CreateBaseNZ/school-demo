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

  private move(blockDetail: any) {
    // Fetch the Block Function
    const blockFunction = this.blockFunctions.find(element => {
      return ((element.function.name === blockDetail.name) && (element.robot === blockDetail.robot));
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
    this.content += func;
    // Add execute
    const execute = `await ${functionName}(${inputs});`;
    this.executes.push(execute);
  }

  private run() {
    this.execute = "const run = async () => {\n";
    for (let i = 0; i < this.executes.length; i++) {
      const element = this.executes[i];
      this.execute += "\t" + element + "\n";
    }
    this.execute += "};\nrun();";
  }

  public build(blockDetails: Array<any> = []) {
    for (let i = 0; i < blockDetails.length; i++) {
      const element = blockDetails[i];
      if (element.type === "move") {
        this.move(element);
      }
    }
    this.run();
    return (this.content + this.execute);
  }
}