// import * as fs from 'fs';
const fs = require('fs')

const memoryFileName = 'memory-file.txt'

function createMemoryFile() {
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
  try {
    fs.writeFileSync(memoryFileName, String(memoryValue));
    return 'ok'
  } catch(err) {
    return err
  }
}

function getMemoryValue() {
  try {
    const data = fs.readFileSync(memoryFileName, 'utf8')
    return data
  } catch (err) {
    return err
  }
}

module.exports = {
  createMemoryFile,
  setMemoryValue,
  getMemoryValue,
};