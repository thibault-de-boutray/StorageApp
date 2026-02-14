import fs from "node:fs";

const filesDataFile = new URL("../data/files.json", import.meta.url);

const defaultData = () => ({
    files: [],
    fileShares: []
});

const readFilesData = () => {
    if (!fs.existsSync(filesDataFile)) {
        writeFilesData(defaultData());
        return defaultData();
    }

    const raw = fs.readFileSync(filesDataFile, "utf-8");
    const parsed = JSON.parse(raw);

    return {
        files: Array.isArray(parsed?.files) ? parsed.files : [],
        fileShares: Array.isArray(parsed?.fileShares) ? parsed.fileShares : []
    };
};

const writeFilesData = (data) => {
    const payload = {
        files: Array.isArray(data?.files) ? data.files : [],
        fileShares: Array.isArray(data?.fileShares) ? data.fileShares : []
    };
    fs.writeFileSync(filesDataFile, JSON.stringify(payload, null, 2));
};

export { readFilesData, writeFilesData };
