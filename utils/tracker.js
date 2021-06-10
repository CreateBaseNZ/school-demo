import trackings from "../public/data/trackings.json";
import axios from "axios";

const send = (behaviour) => {
  return new Promise(async (resolve, reject) => {
    
  });
};

const click = (code, properties) => {
  return new Promise(async (resolve, reject) => {
    // Declare variables
    properties.date = new Date().toString();
    // Fetch the tracking
    const tracking = trackings.find(element => element.code === code);
    // Validate properties and create the behaviour
    let behaviour = new Object({ code });
    for (const property in tracking.properties) {
      if (!properties[property]) {
        return reject({ status: "failed", content: `You are missing '${property}' property.` });
      } else {
        behaviour[property] = properties[property]
      }
    }
    // Store the behaviour
    try {
      await send(behaviour);
    } catch (data) {
      return reject(data);
    }
  });
};

export const tracker = {
  click
};
