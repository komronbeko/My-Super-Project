const fs = require("fs").promises;

class Io{
    #dir;
    constructor(dir){
        this.#dir = dir;
    }

    async read(){
        const data = await fs.readFile(this.#dir, "utf8");
        return data ? JSON.parse(data) : [];
    }

    write(data){
        fs.writeFile(this.#dir, JSON.stringify(data, null, 2));
        return "success";
    }
}

module.exports = Io;