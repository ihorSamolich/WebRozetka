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
    cityId: number,
    deliveryServiceId: number,
    departmentNumberId: number,
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
    userEmail : string,
    customerPersonalData: IOrderUser,
    departmentData : IOrderDelivery,
    orderProducts: IOrderProduct[],
}