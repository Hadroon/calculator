// import * as fs from 'fs';
const fs = require('fs')

const memoryFileName = 'memory-file.txt'

function createMemoryFile() {
  console.log('Memory file')
    fs.open(memoryFileName,'r',function(err, fd){
      if (err) {
        fs.writeFile(memoryFileName, '', function(err) {
            if(err) {
                console.log(err);
            }
        });
      }
    });
}

function setMemoryValue(memoryValue) {
  fs.writeFileSync(memoryFileName, String(memoryValue));
}

function getMemoryValue() {
  try {
    const data = fs.readFileSync(memoryFileName, 'utf8')
    return data
  } catch (err) {
    console.error(err)
    return 'err'
  }
}

module.exports = {
  createMemoryFile,
  setMemoryValue,
  getMemoryValue,
};