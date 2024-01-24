import {NotificationInstance} from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const openNotification = (type: NotificationType, notification: NotificationInstance, message: string, description: string) => {
    notification[type]({
        message,
        description,
    });
};
