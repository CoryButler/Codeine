import "./extensions/implementations";
import Interpreter from "./interpreter";

//@ts-ignore
document.getElementById("runButton").onclick = () => { Interpreter.run(document.getElementById('code').value); };