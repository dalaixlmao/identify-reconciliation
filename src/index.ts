import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response } from "express";
import indentify from "./constollers/identityController";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: Request, res: Response)=>{
  const filePath = path.join(__dirname, '../index.html');
  res.sendFile(filePath);
})


app.post("/identify", (req: Request, res: Response) => {
    console.log(req.body);
  indentify(req, res);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
