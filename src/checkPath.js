const path = require('path');
const rootpath = path.join(__dirname, '../');
const fs = require('fs');
let BlockList;

if(fs.existsSync(`${rootpath}/block.list`)) {
	BlockList = fs.readFileSync(`${rootpath}/block.list`, 'utf8');
    BlockList = BlockList.replace('\r','').split("\n")
    if(fs.readFileSync(`${rootpath}/block.list`, 'utf8').length === 0){
        console.log('[A] \x1b[31mError: Blocklist is empty!\x1b[0m')
    }else{
        console.log(`[A] Blocking (403) following files: ${BlockList.join(", ")}`)
    }
}else{
    console.log('[A] \x1b[31mError: No Blocklist was found!\x1b[0m')
}

/**
 * Checks if the requested path is listed in block.list, if so returns false and prevents file access.
 * @param {String} URL 
 * @returns {boolean}
 */
function checkPath(URL){
    return BlockList.includes(URL)
}

module.exports = {
    checkPath
};
  