import trackings from "../public/data/trackings.json";
import axios from "axios";

const send = (object) => {
  return new Promise(async (resolve, reject) => {
    // Send the behaviour
    let data;
    try {
      data = (
        await axios.post("/api/tracker/add-behaviour", object)
      )["data"];
    } catch (error) {
      data = { status: "error", content: error };
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

const click = (code, properties = new Object()) => {
  return new Promise(async (resolve, reject) => {
    // Declare variables
    const date = new Date().toString();
    // Fetch the tracking
    const tracking = trackings.find((element) => element.code === code);
    // Validate properties and create the behaviour
    let behaviour = new Object({ code, date });
    for (let i = 0; i < tracking.properties.length; i++) {
      const property = tracking.properties[i];
      if (properties[property] === undefined) {
        return reject({
          status: "failed",
          content: `You are missing '${property}' property.`,
        });
      } else {
        behaviour[property] = properties[property];
      }
    }
    // Store the behaviour
    let data;
    try {
      data = await send(behaviour);
    } catch (error) {
      data = { status: "error", content: error };
    }
    console.log(code, properties);
    console.log(data);
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

export default {
  click
};
