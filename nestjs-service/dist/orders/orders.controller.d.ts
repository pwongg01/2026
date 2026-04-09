interface Order {
    id: number;
    customerId: number;
    customerName: string;
    amount: number;
    createdAt: Date;
}
export declare class OrdersController {
    private orders;
    findAll(): Order[];
    create(data: {
        customerId: number;
        customerName: string;
        amount: number;
    }): Order;
}
export {};
