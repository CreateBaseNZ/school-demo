/* ================================= Move Arm ================================== */

// This function let's the arm move freely
let MoveArm = () => {
  return new Promise((resolve, reject) => {
    // The function below is made to move the arm to a new location. First, we will find the angles each of the joints should have to reach this point. We will send these positions to the motors, which will try to reach them. Next, we will wait untill the arm has actually reached by checking if each of the joints has reached to the correct angle.
    //Use inverse kinematics to find the angles required by each joint. This would return false if position is unreachable and angles if it is.
    const TargetAngles = actions.InverseKinematics(x, y, z);
    //If TargetAngles is an array then we will change the target angle of each servo
    if (TargetAngles) {
      for (let i = 0; i < noOfJoints; i++) {
        Joints[i].SetAngle(TargetAngles[i]);
      }
    }
    // set the interval to run every 1000 seconds (1s)
    const rate = 1000;
    //Every second we will check if the motors of the robotic arm have reached their required angle and once we reach we will advance to next step
    interval = setInterval(() => {
      //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
      let Reached = true;
      //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 5 degrees the value of Reached is set to false and the loop is broken
      for (let i = 0; i < noOfJoints; i++) {
        const error = Math.abs(TargetAngles[i] - sensorData.jointData[i].angle);
        if (error > 5) {
          Reached = false;
          break;
        }
      }
      // If the error in each of the joints is less than 5, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function
      if (Reached) {
        clearInterval(interval);
        resolve();
      }
    }, rate); //setting the rate of the interval running
  });
};

/* ============================ Move Arm Restricted ============================ */

// This function restricts the end effector to certain angles. For now, we have two restrictions, 0 degrees (horizontal) and 90 degrees (vertical).
let MoveArmRestricted = (x, y, z, restriction) => {
  return new Promise((resolve, reject) => {
    // The function below is made to move the arm to a new location. First, we will find the angles each of the joints should have to reach this point. We will send these positions to the motors, which will try to reach them. Next, we will wait untill the arm has actually reached by checking if each of the joints has reached to the correct angle.
    //Use inverse kinematics to find the angles required by each joint. This would return false if position is unreachable and angles if it is.
    const TargetAngles = actions.InverseKinematics_restricted (x, y, z);
    //If TargetAngles is an array then we will change the target angle of each servo
    if (TargetAngles) {
      for (let i = 0; i < noOfJoints; i++) {
        Joints[i].SetAngle(TargetAngles[i]);
      }
    }
    // set the interval to run every 1000 seconds (1s)
    const rate = 1000;
    //Every second we will check if the motors of the robotic arm have reached their required angle and once we reach we will advance to next step
    interval = setInterval(() => {
      //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
      let Reached = true;
      //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 5 degrees the value of Reached is set to false and the loop is broken
      for (let i = 0; i < noOfJoints; i++) {
        const error = Math.abs(TargetAngles[i] - sensorData.jointData[i].angle);
        if (error > 5) {
          Reached = false;
          break;
        }
      }
      // If the error in each of the joints is less than 5, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function
      if (Reached) {
        clearInterval(interval);
        resolve();
      }
    }, rate); //setting the rate of the interval running
  });
};

/* ================================ Toggle Claw ================================ */

let ToggleClaw = (inOpen) => {
  return new Promise((resolve, reject) => {
    //Within this function, we will first check whether the claw is to be opened or closed. If we wanted to open the claw then we will need the motors of the claw to open to 20 degrees. If we want to close them, we send 0 degrees to the motor. We will then wait until we reached that targeted angles.
    //First, we will check is open and if it is true the value after the question mark is set to TargetAngles, otherwise it takes the values after the colon
    const TargetAngles = isOpen ? [-40, 40] : [-0, 0];
    // We will set the angle values in TargetAngles to the claw motors.
    for (let i = noOfJoints; i < noOfMotors; i++) {
      Joints[i].SetAngle(TargetAngles[i - noOfJoints]);
    }
    // set the interval to run every 1000 seconds (1s)
    let timer = 0;
    const rate = 1000;
    //Every second we will check if the motors of the claw have reached their required angle and once we reach we will advance to next step
    interval = setInterval(() => {
      //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
      let Reached = true;
      //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 3 degrees the value of Reached is set to false and the loop is broken
      for (let i = 0; i < noOfMotors - noOfJoints; i++) {
        const error = Math.abs(
          TargetAngles[i] - sensorData.jointData[i + noOfJoints].angle
        );
        if (error > 3) {
          Reached = false;
          break;
        }
      }
      // If the error in each of the joints is less than 3, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function. Another situation to leave the function is to wait 5 seconds

      timer++;
      if (Reached || timer >= 5) {
        clearInterval(interval);
        resolve();
      }
    }, rate);
  });
};


/* ================================ Delay ================================ */

let Delay = (time, unit) => {
  return new Promise((resolve, reject) => {
    let repeated, rate;
    if (unit == 'ms') {
      rate = 100;
      repeated = Math.ceil(time / 100);
    } else if (unit = 's') {
      rate = 1000;
      repeated = Math.ceil(time);
    } else {
      rate = 1000;
      repeated = Math.ceil(time);
    }
    let counter = 0;
    interval = setInterval(() => {
      counter++;
      if (counter >= repeated) {
        clearInterval(interval);
        resolve();
      }
    },rate)
  })
}
