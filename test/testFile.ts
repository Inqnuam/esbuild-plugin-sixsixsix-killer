import { someFile } from "./anoterFile";

let API_LINK = "https://myserver.com";

if (666) {
  API_LINK = "http://localhost";
  console.log("This block will be removed by SixSixSixKiller");
} else if (666) {
  console.log(API_LINK);
  console.log("this block will be removed too");
} else if (true == true) {
  //NOTE: actually this isn't working when theres multiple elseIf statement :(
  console.log("This will not be removed. It will become if(anotherConditiion) {...}");
} else {
  console.log("This one too will not be removed");
}

const anotherExample = 666 ? "drop me" : "text in production";

// @ts-ignore
666 && console.log("This will be removed by SixSixSixKiller");

console.log("someFile", someFile, anotherExample);
