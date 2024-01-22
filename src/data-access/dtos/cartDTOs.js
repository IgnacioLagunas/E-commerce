export class CartPurchaseResponse {
  constructor(products, ticket, productsOutOfStock) {
    this.products_detail = products;
    this.ticket = ticket;
    this.products_out_of_stock = productsOutOfStock;
  }
}
