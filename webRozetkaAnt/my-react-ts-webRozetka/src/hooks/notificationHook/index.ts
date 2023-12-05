import {MessageInstance} from "antd/es/message/interface";

export const useNotification = (messageApi : MessageInstance) => {
    const showMessage = (type: 'success' | 'error', content: string) => {
        messageApi.open({
            type,
            duration: 3,
            content,
        });
    };

    const handleSuccess = (content: string) => {
        showMessage('success', content);
    };

    const handleError = (error: any) => {
        const errorsObject = error?.payload?.errors;
        let errorList = '';

        if (errorsObject) {
            for (const field in errorsObject) {
                const fieldErrors = errorsObject[field];
                errorList += fieldErrors.map((errorMessage: string) => `${errorMessage} `);
            }
            showMessage('error', errorList);
        } else {
            showMessage('error', 'Непередбачувана помилка сервера!');
        }
    };
    return { handleSuccess, handleError };
};