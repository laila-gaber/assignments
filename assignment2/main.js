const path = require("path");
const os = require("os");
const fs = require("fs");
const zlib = require("zlib");
const pipe = require("stream").pipeline;
const fsAsync = require("fs/promises");
const { EventEmitter } = require("events");
const event = new EventEmitter();
const http = require("http");
/*
 //Q1
function currPath()
{
    console.log("File:"+__filename,"Dir:"+__dirname)
}
currPath()

//Q2
const file="/user/files/report.pdf";
function getFileName(file)
{
    console.log(path.basename(file));
}
getFileName(file)

//Q3
const fileObj={ dir:"/folder", name:"app", ext:".js"};
function getFilePath(fileObj)
{
    console.log(path.normalize(path.format(fileObj)));
}
getFilePath(fileObj);

//Q4
function getFileExt(file) {
  console.log(path.extname(file));
}
getFileExt("/docs/readme.md");

//Q5
function parseFile(file) {
    const parsedPath = path.parse(file);
  console.log(
"Name:"+parseFile.name,"Ext:"+path.extname(file));
}
parseFile("/home/app/main.js");

//Q6
function isAbsolutePath(file) {
console.log( path.isAbsolute(file))
}
isAbsolutePath("/home/user/file.txt");

//Q7
function joinPath(...file) {
  console.log( path.join(...file))
  }
  joinPath("src","components", "App.js");

  //Q8  
function resolvePath(file) {
  console.log( path.resolve(file))
  }
  resolvePath("./index.js");

  //Q9
function joinPaths(p1,p2) {
  console.log( path.join(p1,p2))
  }
  joinPaths("/folder1", "folder2/file.txt");

  //Q10
function deleteFile(path) {
  fs.unlink(path, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted successfully.");
    }
  });
}
deleteFile("assignment2\\file.txt");

//Q11
function createFolder()
{
  try{
   fs.mkdirSync("assignment2\\newFolder",{recursive:true})
  console.log("Success");
}
catch(err)
  {
  console.log(err)
  }
} 
createFolder()

//Q12
event.on("start", () => 
  console.log("Welcome event triggered!"));
event.emit("start");

//Q13
event.on("login",(username)=>console.log(`User logged in:${username}`));
event.emit("login","Ahmed");

//Q14
function readFile(path) {
  try {
    console.log(fs.readFileSync(path, "utf-8"));
  } catch (err) {
    console.log(err);
  }
}
readFile("assignment2\\file.txt");

//Q15
function writeFileAsync(path) {
  fsAsync.writeFile(path, "Async save", (err) => console.log(err));
}
writeFileAsync("assignment2\\async.txt");

//Q16
function isDirExists(dirPath)
{
  console.log(fs.existsSync(dirPath));
}
isDirExists("assignment2");

//Q17
function OsPlatform() {
  console.log(`Platform: ${os.platform()}, Arch: ${os.arch()}`);
}
OsPlatform();

//Q18
const stream =fs.createReadStream("assignment2\\file.txt","utf-8");
stream.on("data",(chunk)=>console.log(chunk));
stream.on("error",(err)=>console.log(err)); 
stream.on("end",()=>console.log("File reading completed."));

//Q19
const readStream = fs.createReadStream("assignment2\\source.txt", "utf-8");
const writeStream = fs.createWriteStream("assignment2\\dest.txt", "utf-8");
readStream.pipe(writeStream);
writeStream.on("finish", () => console.log("File copied using streams."));
readStream.on("error", (err) => console.log("reading err"+ err));
writeStream.on("error", (err) => console.log("writting err:"+err));

//Q20
pipe(
  fs.createReadStream(path.join("assignment2","source.txt")),
  zlib.createGzip(),
  
  fs.createWriteStream(path.join("assignment2","source.txt.gz")),
  (err) => {

    if (err) {
      console.error("Pipeline failed:", err);
    } else {
      console.log("Pipeline succeeded.");
    }
 }
)
*/
//-------------------------Part 2-----------------------
//PostMan API
//https://www.postman.com/lilo-stetch/workspace/route-workspace/collection/48326491-b089457c-8593-453e-a80e-69c66f15b04c?action=share&source=copy-link&creator=48326491


const usersFile = path.join(__dirname, "users.json");

function readUsers() {
  const users = fs.readFileSync(usersFile, "utf-8");
  if (!users) return [];
  console.log(users);
  return JSON.parse(users);
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users));
}

const server = http.createServer((req, res) => {
  if (req.url == "/user" && req.method == "GET") {
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify(readUsers()));
  }

  if (req.url == "/user" && req.method == "POST") {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });

    req.on("end", () => {
      let newUser;
      try {
        newUser = JSON.parse(data);
      } catch {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: "Invalid JSON" }));
      }

      const users = readUsers();
      const isUserExists = users.some((user) => user.email === newUser.email);

      if (isUserExists) {
        res.statusCode = 400;
        return res.end(JSON.stringify("User already exists"));
      }

      users.push({ ...newUser, id: users.length + 1 });
      writeUsers(users);
      res.statusCode = 201;
      res.end(JSON.stringify("User added successfully"));
    });
  }

  if (req.url.includes("/user") && req.method == "PATCH") {
    const id = req.url.split("/")[2];
    if (!id) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: "User id is required" }));
    }
    let data = "";
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", () => {
      let updatedUser;
      try {
        updatedUser = JSON.parse(data);
      } catch {
        res.statusCode = 400;
        return res.end(JSON.stringify({ message: "Invalid JSON" }));
      }

      let users = readUsers();
      const userIndex = users.findIndex((user) => user.id == id);

      if (userIndex === -1) {
        res.statusCode = 404;
        return res.end(JSON.stringify({ message: "User not found" }));
      }

      users[userIndex] = { ...users[userIndex], ...updatedUser };
      writeUsers(users);
      res.end(JSON.stringify({ message: "User updated successfully" }));
    });
  }

  if (req.url.includes("/user") && req.method == "DELETE") {
    const id = req.url.split("/")[2];
    if (!id) {
      res.statusCode = 400;
      return res.end(JSON.stringify({ message: "User id is required" }));
    }
    let users = readUsers();
    users = users.filter((user) => user.id != id);
    writeUsers(users);
    res.end(JSON.stringify({ message: "User deleted successfully" }));
  }
});

server.listen(8080, () => console.log("Server running on port 8080"));
