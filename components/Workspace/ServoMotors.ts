export class ServoMotors {
  private JointIndex : number;
  private TargetAngle : number;
  private MotorType: string;
  private GainP: number;
  private GainD: number;
  private formattedInput: any;
  constructor(JointIndex: number, MotorType: string, GainP: number, GainD: number = 0) {
    this.JointIndex = JointIndex;
    this.TargetAngle = 0;
    this.MotorType = MotorType;
    this.GainP = GainP;
    this.GainD = GainD;
  }

  public Evaluate(CurrentAngle: number,CurrentVelocity:number =0) {
    const error: number = this.TargetAngle - CurrentAngle;
    const absError: number = Math.abs(error);
    
    let speed: number=this.GainP*error-this.GainD*CurrentVelocity;
    if (absError < 10) {
      speed *= 0.8;
    } else if (absError < 5) {
      speed *= 0.4;
    } else if (absError < 2) {
      speed *= 0.2;
    }
    if(Math.abs(speed)>1000){
      speed=1000*Math.sign(speed);
    }
    const strength: number = parseFloat(this.MotorType) * 100000000000;
    //console.log(this.JointIndex, error, speed, strength);

    this.formattedInput = {
      motorIndex: this.JointIndex,
      force: strength,
      targetVelocity: speed,
      freeSpin: true
    };
    return this.formattedInput;
  }

  public SetAngle(newTargetAngle: number) {
    this.TargetAngle = newTargetAngle;
  }
  public StopMotor() {
    const strength: number = parseFloat(this.MotorType) * 100000000000;

    this.formattedInput = {
      motorIndex: this.JointIndex,
      force: strength,
      targetVelocity: 0.0000001,
      freeSpin: true
    };
    return this.formattedInput;
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
      targetVelocity: 0,
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
      targetVelocity: 0,
      freeSpin: true
    };
  }
}