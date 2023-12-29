import {UploadChangeParam} from "antd/es/upload";
import {IUploadedFile} from "interfaces/account";

export const imageConverterToFile = (e: UploadChangeParam) => {
    const image = e?.fileList[0] as IUploadedFile;
    return image?.originFileObj
};

