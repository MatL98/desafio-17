import { model } from "mongoose";
import  msn  from "./Msns";





const message = new model.msn(mensajes)
const messageSave = await message.save()
console.log(messageSave);



