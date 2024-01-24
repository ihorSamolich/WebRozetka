import {UploadChangeParam} from 'antd/es/upload';

export const imageConverterToAntFile = (e: UploadChangeParam<File>) => {
    return e?.fileList[0] as File;
};
