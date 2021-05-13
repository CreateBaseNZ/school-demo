
export class ServoMotors {
  private UnityContext : any;
  private RobotSystemName : string;
  private JointIndex : number;
  private TargetVelocity : number;
  private MotorType : string;

  constructor(UnityContext : any, RobotSystemName: string, JointIndex: number, TargetVelocity: number, MotorType: string) {
    this.UnityContext = UnityContext;
    this.RobotSystemName = RobotSystemName;
    this.JointIndex = JointIndex;
    this.TargetVelocity = TargetVelocity;
    this.MotorType = MotorType;
    this.Evaluate();
  }

  public Evaluate() {
    switch (this.MotorType) {
      case "6kg":
        this.SixKg();
        console.log("Evaluated");
        break;
    
      default:
        break;
    }
  }

  /**
   * SixKg
   */
  private SixKg() {
    // Configurations

    // Format Input
    let formattedInput;
    formattedInput = JSON.stringify({
      motors: [
        {
            motorIndex: this.JointIndex,
            force: 100000,
            targetVelocity: this.TargetVelocity,
            freeSpin: true
        }
      ]
    });
    // Run Unity Simulation
    this.UnityContext.send(this.RobotSystemName, "SetActuators", formattedInput);
  }
  
  /**
   * Twelve
   */
  private TwelveKg() {
    // Configurations

    // Format Input
    let formattedInput;
    formattedInput = JSON.stringify({
      motors: [
        {
            motorIndex: this.JointIndex,
            force: 100000,
            targetVelocity: this.TargetVelocity,
            freeSpin: true
        }
      ]
    });
    // Run Unity Simulation
    this.UnityContext.send(this.RobotSystemName, "SetActuators", formattedInput);
  }
}