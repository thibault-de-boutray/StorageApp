import fs from "node:fs";

const userFile = new URL("../data/users.json", import.meta.url);

const readUser = () => {
    const data = fs.readFileSync(userFile, "utf-8");
    return JSON.parse(data);
};

const writeUser = (users) => {
    fs.writeFileSync(userFile, JSON.stringify({ users }, null, 2));
};

export { readUser, writeUser };
