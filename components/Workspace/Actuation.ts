export class Actuation {
  private UnityContext : any;
  private RobotSystemName : string;
  private formattedInput : string;

  constructor(UnityContext : any, RobotSystemName: string, formattedInput: string) {
    this.UnityContext = UnityContext;
    this.RobotSystemName = RobotSystemName;
    this.formattedInput = formattedInput;
  }

  public run() {
    this.UnityContext.send(this.RobotSystemName, "SetActuators", this.formattedInput);
  }
}