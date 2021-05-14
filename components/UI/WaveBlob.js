import { useEffect, useRef } from "react";

// create anchor points by averaging the control points
const calcAvgs = (p) => {
  const avg = [];
  const leng = p.length;
  let prev;

  for (let i = 2; i < leng; i++) {
    prev = i - 2;
    avg.push((p[prev] + p[i]) / 2);
  }
  // close
  avg.push((p[0] + p[leng - 2]) / 2, (p[1] + p[leng - 1]) / 2);
  return avg;
};

// array of xy coords, closed boolean
const bezierSkin = (bez, context, closed = true) => {
  const avg = calcAvgs(bez);
  const leng = bez.length;

  if (closed) {
    context.moveTo(avg[0], avg[1]);
    for (let i = 2; i < leng; i += 2) {
      let n = i + 1;
      context.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
    }
    context.quadraticCurveTo(bez[0], bez[1], avg[0], avg[1]);
  } else {
    context.moveTo(bez[0], bez[1]);
    context.lineTo(avg[0], avg[1]);
    for (let i = 2; i < leng - 2; i += 2) {
      let n = i + 1;
      context.quadraticCurveTo(bez[i], bez[n], avg[i], avg[n]);
    }
    context.lineTo(bez[leng - 2], bez[leng - 1]);
  }
};

const WaveBlob = (props) => {
  let blobCanvasRef = useRef();

  useEffect(() => {
    let canvas = blobCanvasRef.current;
    let context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    console.log(canvas.width);
    console.log(canvas.height);

    const bumpRadius = 100;
    const halfBumpRadius = bumpRadius / 2;

    const blob = {
      wobbleIncrement: 0,
      // use to change the size of the blob
      radius: 800,
      // think of as detail level
      // number of connections in the `bezierSkin`
      segments: 20,
      step: Math.PI / 2 / 12,
      anchors: [],
      radii: [],
      thetaOff: [],
      context: context,
      theta: 0,
      thetaRamp: 0,
      thetaRampDest: 12,
      rampDamp: 25,
    };

    for (let i = 0; i < blob.segments + 2; i++) {
      blob.anchors.push(0, 0);
      blob.radii.push(Math.random() * bumpRadius - halfBumpRadius);
      blob.thetaOff.push(Math.random() * 2 * Math.PI);
    }

    const update = (scale) => {
      blob.thetaRamp += (blob.thetaRampDest - blob.thetaRamp) / blob.rampDamp;
      blob.theta += 0.03;

      blob.anchors = [0, blob.radius];
      for (let i = 0; i <= blob.segments + 2; i++) {
        const sine = Math.sin(blob.thetaOff[i] + blob.theta + blob.thetaRamp);
        const rad = blob.radius + blob.radii[i] * sine;
        const x = rad * Math.sin(blob.step * i);
        const y = rad * Math.cos(blob.step * i);
        blob.anchors.push(x, y);
      }

      blob.context.save();
      blob.context.translate(-10, -10);
      blob.context.scale(scale, scale);
      blob.context.fillStyle = "#0a73dc";
      blob.context.beginPath();
      blob.context.moveTo(0, 0);
      bezierSkin(blob.anchors, blob.context, false);

      blob.context.lineTo(0, 0);
      blob.context.fill();
      blob.context.restore();
    };

    let requestId,
      i = 0;

    const loop = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      update(i / 2);
      i += 0.05;
      requestId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return <canvas className={props.className} ref={blobCanvasRef}></canvas>;
};

export default WaveBlob;
