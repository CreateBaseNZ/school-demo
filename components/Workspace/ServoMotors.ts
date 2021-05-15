
export class ServoMotors {
  private JointIndex : number;
  private TargetVelocity : number;
  private MotorType : string;
  private formattedInput: any;

  constructor(JointIndex: number, TargetVelocity: number, MotorType: string) {
    this.JointIndex = JointIndex;
    this.TargetVelocity = TargetVelocity;
    this.MotorType = MotorType;
  }

  public Evaluate() {
    switch (this.MotorType) {
      case "6kg":
        this.SixKg();
        break;
      case "12kg":
        this.TwelveKg();
        break;
    
      default:
        break;
    }
    return this.formattedInput;
  }

  public SetVelocity(newTargetVelocity: number) {
    this.TargetVelocity = newTargetVelocity;
  }

  /**
   * SixKg
   */
  private SixKg() {
    // Configurations

    // Format Input
    this.formattedInput = {
      motorIndex: this.JointIndex,
      force: 100000,
      targetVelocity: this.TargetVelocity,
      freeSpin: true
    };
  }
  
  /**
   * Twelve
   */
  private TwelveKg() {
    // Configurations

    // Format Input
    this.formattedInput = {
      motorIndex: this.JointIndex,
      force: 2000000000,
      targetVelocity: this.TargetVelocity,
      freeSpin: true
    };
  }
}