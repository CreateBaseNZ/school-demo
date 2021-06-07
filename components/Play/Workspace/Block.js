import ReactDOM from "react-dom";
import { PictureAsPdfSharp } from "@material-ui/icons";
import { create, all, pi, abs } from "mathjs";
import { Log, Error, Warning } from "./Console/Console";

const config = {};
const math = create(all, config);

export class Block {
  _noOfJoints = 4;
  _jointLengths = [2.7, 3.1, 3.1, 2.7];
  constructor() {}

  _Translate_XYZ(x, y, z) {
    const M = math.matrix([
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1],
    ]);
    return M;
  }
  _Rotate_Z(theta) {
    const M = math.matrix([
      [Math.cos(theta), -Math.sin(theta), 0, 0],
      [Math.sin(theta), Math.cos(theta), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
    return M;
  }

  _Rotate_X(theta) {
    const M = math.matrix([
      [1, 0, 0, 0],
      [0, Math.cos(theta), -Math.sin(theta), 0],
      [0, Math.sin(theta), Math.cos(theta), 0],
      [0, 0, 0, 1],
    ]);
    return M;
  }

  _Rotate_Y(theta) {
    const M = math.matrix([
      [Math.cos(theta), 0, Math.sin(theta), 0],
      [0, 1, 0, 0],
      [-Math.sin(theta), 0, Math.cos(theta), 0],
      [0, 0, 0, 1],
    ]);
    return M;
  }

  _ForwardKinematics(angles) {
    const rotationMatrix = math.zeros(5, 4, 4);
    for (let i = 0; i < 4; i++) {
      rotationMatrix.subset(math.index(0, i, i), 1);
    }
    for (let i = 0; i < this._noOfJoints; i++) {
      const prev = math.squeeze(
        rotationMatrix.subset(math.index(i, math.range(0, 4), math.range(0, 4)))
      );
      let transform;
      if (i == 0 || (this._noOfJoints == 6 && (i == 3 || i == 5))) {
        transform = math.multiply(
          this._Rotate_Z(angles[i]),
          this._Translate_XYZ(0, 0, this._jointLengths[i])
        );
      } else {
        transform = math.multiply(
          this._Rotate_X(angles[i]),
          this._Translate_XYZ(0, 0, this._jointLengths[i])
        );
      }
      rotationMatrix.subset(
        math.index(i + 1, math.range(0, 4), math.range(0, 4)),
        math.multiply(prev, transform)
      );
    }
    return rotationMatrix;
  }

  _DotProduct(v1, v2) {
    if (v1.length != v2.length) {
      return 0;
    } else {
      let val = 0;
      for (let i = 0; i < v1.length; i++) {
        val += v1[i] * v2[i];
      }
      return val;
    }
  }

  _vectorLength(v1) {
    let val = 0;
    for (let i = 0; i < v1.length; i++) {
      val += v1[i] * v1[i];
    }
    return Math.sqrt(val);
  }

  _FindAngle(v1, v2) {
    if (v1.length != v2.length) {
      return 0;
    } else {
      const dot = this._DotProduct(v1, v2);
      const l1 = this._vectorLength(v1);
      const l2 = this._vectorLength(v2);
      let cosAngle = dot / (l1 * l2);
      if (Math.abs(cosAngle) > 1) {
        cosAngle = 1 * Math.sign(cosAngle);
      }
      return Math.acos(cosAngle);
    }
  }

  /*This function takes either 3 or 4 inputs. The first 3 inputs are the location x,y and z*/
  InverseKinematics_restricted(x_t, y_t, z_t, theta_deg = 0) {
    let x_inter, y_inter;
    y_inter = -x_t;
    x_inter = -y_t;
    x_t = x_inter;
    y_t = y_inter;
    const angles = [0, 0, 0, 0];
    let distance = 5000;
    const tolerence = 0.01;
    const large_tolerence = 0.5;
    const maxRep = 50;
    const maxLoop = maxRep * (this._noOfJoints - 2);
    let repNo = 0;
    const theta = (theta_deg * pi) / 180;
    const jointNo = this._noOfJoints - 1;
    let targetJoint = 2;
    const totaljointLengths = this._jointLengths.reduce(
      (sum, current) => sum + current,
      -this._jointLengths[0] - this._jointLengths[this._jointLengths.length - 1]
    );
    angles[0] = Math.atan2(-x_t, y_t);
    if (angles[0] > pi / 2) {
      angles[0] -= pi;
    } else if (angles[0] < -pi / 2) {
      angles[0] += pi;
    }
    const x =
      x_t -
      this._jointLengths[3] * Math.cos(theta) * Math.cos(angles[0] - pi / 2);
    const y =
      y_t -
      this._jointLengths[3] * Math.cos(theta) * Math.sin(angles[0] - pi / 2);
    const z = z_t - this._jointLengths[3] * Math.sin(theta);
    const totalDistance = math.sqrt(
      math.square(x) + math.square(y) + math.square(z - this._jointLengths[0])
    );
    if (totalDistance - totaljointLengths > 0.1) {
      // TODO
      ReactDOM.render(
        <Warning message={"Position is out of reach. Try another location"} />,
        document.querySelector("#console")
      );
      return false;
    }
    const targetPoint = [x, y, z];

    while (tolerence < distance && repNo < maxLoop) {
      let jointLocations = this._ForwardKinematics(angles);
      const endeffector_jointVector = [0, 0, 0];
      const target_jointVector = [0, 0, 0];
      let jointLoc = math.squeeze(
        jointLocations.subset(math.index(targetJoint, math.range(0, 3), 3))
      );
      let lastJointLoc = math.squeeze(
        jointLocations.subset(math.index(jointNo, math.range(0, 3), 3))
      );
      for (let i = 0; i < jointNo; i++) {
        endeffector_jointVector[i] =
          lastJointLoc.subset(math.index(i)) - jointLoc.subset(math.index(i));
        target_jointVector[i] = targetPoint[i] - jointLoc.subset(math.index(i));
      }

      let angleChange = this._FindAngle(
        endeffector_jointVector,
        target_jointVector
      );
      if (angleChange == 0) {
        if (repNo == 0) {
          angles[1] = pi / 4;
          angles[2] = pi / 4;
        } else {
          targetJoint--;
          if (targetJoint < 1) {
            targetJoint = 2;
          }
          repNo++;
        }
        continue;
      }
      angles[targetJoint] -= angleChange;

      jointLocations = this._ForwardKinematics(angles);
      jointLoc = math.squeeze(
        jointLocations.subset(math.index(targetJoint, math.range(0, 3), 3))
      );
      lastJointLoc = math.squeeze(
        jointLocations.subset(math.index(jointNo, math.range(0, 3), 3))
      );
      for (let i = 0; i < jointNo; i++) {
        endeffector_jointVector[i] =
          lastJointLoc.subset(math.index(i)) - jointLoc.subset(math.index(i));
        target_jointVector[i] = targetPoint[i] - jointLoc.subset(math.index(i));
      }
      angleChange = this._FindAngle(
        endeffector_jointVector,
        target_jointVector
      );
      angles[targetJoint] += angleChange;
      if (Math.abs(angles[targetJoint]) > (15 * pi) / 16) {
        angles[targetJoint] += 2 * pi;
      }
      if (Math.abs(angles[targetJoint]) > pi / 2) {
        angles[targetJoint] = (Math.sign(angles[targetJoint]) * pi) / 2;
      }
      jointLocations = this._ForwardKinematics(angles);
      lastJointLoc = math.squeeze(
        jointLocations.subset(math.index(jointNo, math.range(0, 3), 3))
      );
      const distanceVector = [0, 0, 0];
      for (let i = 0; i < jointNo; i++) {
        distanceVector[i] = targetPoint[i] - lastJointLoc.subset(math.index(i));
      }
      distance = this._vectorLength(distanceVector);
      targetJoint--;
      if (targetJoint < 1) {
        targetJoint = 2;
      }
      repNo++;
      if (repNo >= maxLoop) {
        break;
      }
    }
    //angles[0] = pi / 2;
    angles[3] = -theta + pi / 2 - angles[1] - angles[2];
    if (angles[3] > pi / 2) {
      angles[3] -= 2 * pi;
    } else if (angles[3] < -pi / 2) {
      angles[3] += 2 * pi;
    }
    if (Math.abs(angles[3]) > pi / 2) {
      angles[3] = (Math.sign(angles[3]) * pi) / 2;
    }
    for (let i = 0; i < this._noOfJoints; i++) {
      angles[i] *= 180 / pi;
    }
    if (distance > large_tolerence) {
      // TODO
      ReactDOM.render(
        <Warning
          message={"Position can not be reached. Closest position chosen"}
        />,
        document.querySelector("#console")
      );
    }
    return angles; //angles.map((val) => val * 180 / pi);
  }

  InverseKinematics(x_t, y_t, z_t) {
    let x_inter, y_inter;
    y_inter = -x_t;
    x_inter = -y_t;
    x_t = x_inter;
    y_t = y_inter;
   
    const angles = [0, 0, 0, 0];
    let distance = 5000;
    const tolerence = 0.01;
    const large_tolerence = 0.5;
    const maxRep = 50;
    const maxLoop = maxRep * (this._noOfJoints - 1);
    let repNo = 0;
    const jointNo = this._noOfJoints;
    let targetJoint = 3;
    const totaljointLengths = this._jointLengths.reduce(
      (sum, current) => sum + current,
      -this._jointLengths[0]
    );
    angles[0] = Math.atan2(-x_t, y_t);
    if (angles[0] > pi / 2) {
      angles[0] -= pi;
    } else if (angles[0] < -pi / 2) {
      angles[0] += pi;
    }
    const x = x_t;
    const y = y_t;
    const z = z_t;
    const totalDistance = math.sqrt(
      math.square(x) + math.square(y) + math.square(z - this._jointLengths[0])
    );
    if (totalDistance - totaljointLengths > 0.1) {
      // TODO
      ReactDOM.render(
        <Warning message={"Position is out of reach. Try another location"} />,
        document.querySelector("#console")
      );
      return false;
    }
    const targetPoint = [x, y, z];

    while (tolerence < distance && repNo < maxLoop) {
      let jointLocations = this._ForwardKinematics(angles);
      const endeffector_jointVector = [0, 0, 0];
      const target_jointVector = [0, 0, 0];
      let jointLoc = math.squeeze(
        jointLocations.subset(math.index(targetJoint, math.range(0, 3), 3))
      );
      let lastJointLoc = math.squeeze(
        jointLocations.subset(math.index(jointNo, math.range(0, 3), 3))
      );
      for (let i = 0; i < endeffector_jointVector.length; i++) {
        endeffector_jointVector[i] =
          lastJointLoc.subset(math.index(i)) - jointLoc.subset(math.index(i));
        target_jointVector[i] = targetPoint[i] - jointLoc.subset(math.index(i));
      }
      let angleChange = this._FindAngle(
        endeffector_jointVector,
        target_jointVector
      );
      if (abs(angleChange) < (0.1 * Math.PI) / 180) {
        if (repNo == 0) {
          angles[1] = pi / 4;
          angles[2] = pi / 4;
          angles[3] = pi / 4;
        } else {
          targetJoint--;
          if (targetJoint < 1) {
            targetJoint = 3;
          }
          repNo++;
        }
        continue;
      }
      angles[targetJoint] -= angleChange;

      jointLocations = this._ForwardKinematics(angles);
      jointLoc = math.squeeze(
        jointLocations.subset(math.index(targetJoint, math.range(0, 3), 3))
      );
      lastJointLoc = math.squeeze(
        jointLocations.subset(math.index(jointNo, math.range(0, 3), 3))
      );
      for (let i = 0; i < endeffector_jointVector.length; i++) {
        endeffector_jointVector[i] =
          lastJointLoc.subset(math.index(i)) - jointLoc.subset(math.index(i));
        target_jointVector[i] = targetPoint[i] - jointLoc.subset(math.index(i));
      }
      angleChange = this._FindAngle(
        endeffector_jointVector,
        target_jointVector
      );
      angles[targetJoint] += angleChange;
      if (Math.abs(angles[targetJoint]) > (15 * pi) / 16) {
        angles[targetJoint] += 2 * pi;
      }
      if (Math.abs(angles[targetJoint]) > pi / 2) {
        angles[targetJoint] = (Math.sign(angles[targetJoint]) * pi) / 2;
      }
      jointLocations = this._ForwardKinematics(angles);
      lastJointLoc = math.squeeze(
        jointLocations.subset(math.index(jointNo, math.range(0, 3), 3))
      );
      const distanceVector = [0, 0, 0];
      for (let i = 0; i < endeffector_jointVector.length; i++) {
        distanceVector[i] = targetPoint[i] - lastJointLoc.subset(math.index(i));
      }
      distance = this._vectorLength(distanceVector);
      targetJoint--;
      if (targetJoint < 1) {
        targetJoint = 3;
      }
      repNo++;
      if (repNo >= maxLoop) {
        break;
      }
    }
    for (let i = 0; i < this._noOfJoints; i++) {
      angles[i] *= 180 / pi;
    }
    if (distance > large_tolerence) {
      // TODO
      ReactDOM.render(
        <Warning
          message={"Position can not be reached. Closest position chosen"}
        />,
        document.querySelector("#console")
      );
    }

    return angles; //angles.map((val) => val * 180 / pi);
  }
}
