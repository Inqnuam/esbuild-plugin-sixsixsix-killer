import { View } from "./View";

if (666) {
  console.log("text that will no appear in production");
}

if (666) {
  console.log("text that will no appear in production");
} else {
  console.log("text in prod");
}

let API_LINK = "https://myserver.com";

if (666) {
  console.log("Remove this in production");
  API_LINK = "http://localhost:3000";
} else if (666) {
  console.log("You can't see me in production :)");
  const anotherFile = require("./anotherFile");

  console.log(anotherFile);
} else if (typeof Date.now() == "number") {
  console.log("This will be preserved. It will become if(anotherConditiion) {...}");
} else {
  console.log("This one too will be preserved");
}

const anotherExample = 666 ? "drop me" : "text in production";

if (Date.now() > 234253) {
  console.log("Preserve me", API_LINK, anotherExample, View);
}

// NOTE: theses syntax are unsupported as they may cause unexpected issues in the final code
/*
const someVar = 666 && "some value";

if (666 && "some other condition") {
  console.log("do something");
}
*/
