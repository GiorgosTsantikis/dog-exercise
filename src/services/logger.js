import { logger, consoleTransport } from "react-native-logs";
import customTransport from "./LocalStorageTransport";
import { sendLogs } from "./ApiCalls";

var applicationLogger = logger.createLogger({
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  severity: "debug",
  transport: customTransport,
  transportOptions: {
    colors: {
      info: "blueBright",
      warn: "yellowBright",
      error: "redBright",
    },
  },
  async: true,
  dateFormat: "time",
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true,
});

setInterval(()=>{
  async function send(){
    const logs=localStorage.getObj('logs');
    if(Array.isArray(logs)){
      await sendLogs(logs)
        .then(()=>localStorage.removeItem('logs'))
        .catch(err=>applicationLogger.error(err));
    }else{
      console.log("logs no array");
    }
    
  }
  send();
},5000)

export default applicationLogger;