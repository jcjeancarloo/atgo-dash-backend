export enum SalesPaymentType {
  Mastercard = 'Mastercard',
  Visa = 'Visa',
  Elo = 'Elo',
  Amex = 'Amex',
  Hipercard = 'Hipercard',
  Pix = 'Pix',
  Boleto = 'Boleto',
  Others = 'Others',
}

export enum PaymentStatusType {
  Paid = 'paid',
  AwaitingPayment = 'awaiting_payment',
  Canceled = 'canceled',
}
