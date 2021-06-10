import trackings from "../public/data/trackings.json";
import axios from "axios";

const send = (behaviour) => {
  return new Promise(async (resolve, reject) => {
    // Fetch the current date
    const date = new Date().toString();
    // Send the behaviour
    let data;
    try {
      data = (
        await axios.post("/api/cookie/add-behaviour", { date, behaviour })
      )["data"];
    } catch (error) {
      return reject({ status: "succeeded", content: error });
    }
    // Handlers
    switch (data.status) {
      case "failed":
        return reject(data);
      case "error":
        return reject(data);
      default:
        return resolve(data.content);
    }
  });
};

const click = (code, properties) => {
  return new Promise(async (resolve, reject) => {
    // Declare variables
    properties.date = date;
    // Fetch the tracking
    const tracking = trackings.find((element) => element.code === code);
    // Validate properties and create the behaviour
    let behaviour = new Object({ code });
    for (const property in tracking.properties) {
      if (!properties[property]) {
        return reject({
          status: "failed",
          content: `You are missing '${property}' property.`,
        });
      } else {
        behaviour[property] = properties[property];
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
  click,
};
