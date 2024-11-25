import { fileURLToPath } from "url";
import { dirname } from "path";

const expressFilename = fileURLToPath(import.meta.url);
const profilesImgPath = dirname(expressFilename);

export default profilesImgPath;
