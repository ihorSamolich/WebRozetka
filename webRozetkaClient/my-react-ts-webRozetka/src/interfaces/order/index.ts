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
    areaId: number,
    settlementId: number,
    warehouseId: number,
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