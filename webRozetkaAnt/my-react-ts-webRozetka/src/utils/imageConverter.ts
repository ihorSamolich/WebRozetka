import {UploadChangeParam} from "antd/es/upload";

export const imageConverter = (e: UploadChangeParam<File>) => {
    return e?.fileList[0] as File;
};