//Within this code segment, we aim to configure the motors to operate
//The first step is to define the motors and their poperties
//The first property is the motor strentgh and would determine how much torque could it provide
const actuator = ["12kg", "12kg", "12kg", "12kg", "100000kg", "100000kg"];
//The next property is the gain. This would determine the relationship between the speed of each motor and how much angle should it rotate.
const gainsP = [1, 1, 1.25, 1.5, 15, 15];
const gainsD = [0.5, 0.5, 0, 0, 0, 0];
let Joints = [];
// For further point we would like to save the number of motors we have and the the number of joints the robotic arm has
const noOfMotors = actuator.length;
const noOfJoints = 4;
// We will now store the actuators with their properties in one location. This would help in making sure we are using the right motor properties
for(let i=0;i<noOfMotors;i++){
	Joints[i]=new ServoMotorsClass(i,actuator[i],gainsP[i],gainsD[i]);
}
//We will create a variable which would help us later in calling predefined set of instruction that are stored in the BlockClass
const actions=new BlockClass();
// ServoMotors Controller
// We will run these lines every 12.5 millisecond. This is to recieve information about each joint and its current location. Using that, we will determine the speed the motor should have to reach the required location
let communication = setInterval(() => {
	//First we will collect the sensor information about the current angles
	const angles = sensorData;
	//Sometimes, the data from the sensors won't be updated and we cant use the data as it would produce errors. To prevent that, we would make a check that there is something within angles.
	if (angles) {
		//Next, we go through each motor and evalute the speed required for the motor and store that in a input array.
		let input = { motors: [] };
		for (let i = 0; i < noOfMotors; i++) {
			input.motors.push(Joints[i].Evaluate(angles['jointData'][i].angle,angles['jointData'][i].velocity));
		}
		const formattedInput = JSON.stringify(input);
		//We will now send the messages containing the speed of the motors to the robotic arm motor's so they could follow that speed
		let robot = new ActuationClass(someVar, RoboticSystemName, formattedInput);
		robot.run();
	}
}, 1000 / 80);
const run = async () => {
    // Toggle Claw
    await ((isOpen) => {
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
            let interval = setInterval(() => {
                //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
                let Reached = true;
                //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 3 degrees the value of Reached is set to false and the loop is broken 
                for (let i = 0; i < noOfMotors - noOfJoints; i++) {
                    const error = Math.abs(TargetAngles[i] - sensorData.jointData[i + noOfJoints].angle);
                    if (error > 3) {
                        Reached = false;
                        break;
                    }
                }
                // If the error in each of the joints is less than 3, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function. Another situation to leave the function is to wait 5 seconds

                timer++;
                if (Reached || (timer >= 5)) {
                    clearInterval(interval);
                    resolve();
                }
            }, rate);

        });
    })(true);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(2.9, 1.5, 6.6);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(2.9, 1.2, 6.6);

    // Toggle Claw
    await ((isOpen) => {
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
            let interval = setInterval(() => {
                //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
                let Reached = true;
                //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 3 degrees the value of Reached is set to false and the loop is broken 
                for (let i = 0; i < noOfMotors - noOfJoints; i++) {
                    const error = Math.abs(TargetAngles[i] - sensorData.jointData[i + noOfJoints].angle);
                    if (error > 3) {
                        Reached = false;
                        break;
                    }
                }
                // If the error in each of the joints is less than 3, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function. Another situation to leave the function is to wait 5 seconds

                timer++;
                if (Reached || (timer >= 5)) {
                    clearInterval(interval);
                    resolve();
                }
            }, rate);

        });
    })(false);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(0.1, 5.3, 5.2);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(2.7, 3.5, -8.5);

    // Toggle Claw
    await ((isOpen) => {
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
            let interval = setInterval(() => {
                //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
                let Reached = true;
                //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 3 degrees the value of Reached is set to false and the loop is broken 
                for (let i = 0; i < noOfMotors - noOfJoints; i++) {
                    const error = Math.abs(TargetAngles[i] - sensorData.jointData[i + noOfJoints].angle);
                    if (error > 3) {
                        Reached = false;
                        break;
                    }
                }
                // If the error in each of the joints is less than 3, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function. Another situation to leave the function is to wait 5 seconds

                timer++;
                if (Reached || (timer >= 5)) {
                    clearInterval(interval);
                    resolve();
                }
            }, rate);

        });
    })(true);
    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(0.1, 5.3, -5.2);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(6.6, 1.5, -2.6);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(6.6, 1.2, -2.6);

    // Toggle Claw
    await ((isOpen) => {
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
            let interval = setInterval(() => {
                //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
                let Reached = true;
                //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 3 degrees the value of Reached is set to false and the loop is broken 
                for (let i = 0; i < noOfMotors - noOfJoints; i++) {
                    const error = Math.abs(TargetAngles[i] - sensorData.jointData[i + noOfJoints].angle);
                    if (error > 3) {
                        Reached = false;
                        break;
                    }
                }
                // If the error in each of the joints is less than 3, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function. Another situation to leave the function is to wait 5 seconds

                timer++;
                if (Reached || (timer >= 5)) {
                    clearInterval(interval);
                    resolve();
                }
            }, rate);

        });
    })(false);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(5.3, 5.3, 0);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(2.70, 3.5, -8.5);

    // Toggle Claw
    await ((isOpen) => {
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
            let interval = setInterval(() => {
                //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
                let Reached = true;
                //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 3 degrees the value of Reached is set to false and the loop is broken 
                for (let i = 0; i < noOfMotors - noOfJoints; i++) {
                    const error = Math.abs(TargetAngles[i] - sensorData.jointData[i + noOfJoints].angle);
                    if (error > 3) {
                        Reached = false;
                        break;
                    }
                }
                // If the error in each of the joints is less than 3, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function. Another situation to leave the function is to wait 5 seconds

                timer++;
                if (Reached || (timer >= 5)) {
                    clearInterval(interval);
                    resolve();
                }
            }, rate);

        });
    })(true);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(5.3, 5.3, 0);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(5.9, 1.5, 2.6);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(5.9, 1.2, 2.6);

    // Toggle Claw
    await ((isOpen) => {
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
            let interval = setInterval(() => {
                //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
                let Reached = true;
                //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 3 degrees the value of Reached is set to false and the loop is broken 
                for (let i = 0; i < noOfMotors - noOfJoints; i++) {
                    const error = Math.abs(TargetAngles[i] - sensorData.jointData[i + noOfJoints].angle);
                    if (error > 3) {
                        Reached = false;
                        break;
                    }
                }
                // If the error in each of the joints is less than 3, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function. Another situation to leave the function is to wait 5 seconds

                timer++;
                if (Reached || (timer >= 5)) {
                    clearInterval(interval);
                    resolve();
                }
            }, rate);

        });
    })(false);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(5.3, 5.3, 0);

    // Move Arm
    await ((x, y, z) => {
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
            let interval = setInterval(() => {
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
            }, rate);//setting the rate of the interval running

        });
    })(2.7, 3.5, -8.5);

    // Toggle Claw
    await ((isOpen) => {
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
            let interval = setInterval(() => {
                //Create a variable with the name Reached. We will assume that the arm has reached its location unless we find otherwise in the loop following
                let Reached = true;
                //Now, we will go through each of the joints and check the difference between the angle we want to reach to and the actual angle of each joint. If the difference is more than 3 degrees the value of Reached is set to false and the loop is broken 
                for (let i = 0; i < noOfMotors - noOfJoints; i++) {
                    const error = Math.abs(TargetAngles[i] - sensorData.jointData[i + noOfJoints].angle);
                    if (error > 3) {
                        Reached = false;
                        break;
                    }
                }
                // If the error in each of the joints is less than 3, then value of Reached will stay as positive and the interval is deleted and the code is allowed to progress to the next function. Another situation to leave the function is to wait 5 seconds

                timer++;
                if (Reached || (timer >= 5)) {
                    clearInterval(interval);
                    resolve();
                }
            }, rate);

        });
    })(true);



};
run();