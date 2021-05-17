

export class ServoMotors {
  private JointIndex : number;
  private TargetAngle : number;
  private MotorType: string;
  private Gain: number;
  private formattedInput: any;

  constructor(JointIndex: number, Gain: number, MotorType: string) {
    this.JointIndex = JointIndex;
    this.TargetAngle = 0;
    this.MotorType = MotorType;
    this.Gain = Gain;
  }

  public Evaluate(CurrentAngle: number) {
    const error: number = this.TargetAngle - CurrentAngle;
    const absError: number = Math.abs(error);
    
    let speed: number=this.Gain*error;
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