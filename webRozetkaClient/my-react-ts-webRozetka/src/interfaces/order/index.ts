export interface IOrderUser {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
}
export interface IOrderProduct {
    productId: number,
    quantity: number,
}

export interface IOrderDelivery {
    areaRef: string,
    settlementRef: string,
    warehouseRef: string,
}

export interface IOrderPayment {
    paymentType: string,
}

export interface IOrder {
    user: IOrderUser,
    delivery: IOrderDelivery,
    payment: IOrderPayment
}

export interface IOrderData {
    customerPersonalData: IOrderUser,
    departmentData : IOrderDelivery,
    paymentData: IOrderPayment
}