import { PaymentStatusType, SalesPaymentType } from '@/shared'

export const excludeAttribute = (entity: any, keys: string[]) => {
  return Object.fromEntries(Object.entries(entity).filter(([key]) => !keys.includes(key)))
}

export const getPaymentMethod = (method: string): SalesPaymentType => {
  const lowercasedMethod = method.toLowerCase()
  if (lowercasedMethod.includes('pix')) return SalesPaymentType.Pix

  for (const key in SalesPaymentType) {
    if (lowercasedMethod.includes(key.toLowerCase())) {
      return SalesPaymentType[key as keyof typeof SalesPaymentType]
    }
  }

  return SalesPaymentType.Others
}

const TotalPaymentMethodType: Record<SalesPaymentType, number> = {
  [SalesPaymentType.Mastercard]: 0,
  [SalesPaymentType.Visa]: 0,
  [SalesPaymentType.Elo]: 0,
  [SalesPaymentType.Amex]: 0,
  [SalesPaymentType.Hipercard]: 0,
  [SalesPaymentType.Pix]: 0,
  [SalesPaymentType.Boleto]: 0,
  [SalesPaymentType.Others]: 0,
}

const TotalPaymentStatusType: Record<PaymentStatusType, number> = {
  [PaymentStatusType.Paid]: 0,
  [PaymentStatusType.AwaitingPayment]: 0,
  [PaymentStatusType.Canceled]: 0,
}

export const calcTotalByPaymentMethod = (method: string) => {
  const lowercasedMethod = method.toLowerCase()

  for (const key in TotalPaymentMethodType) {
    if (lowercasedMethod.includes(key.toLowerCase())) TotalPaymentMethodType[key]++
  }

  return TotalPaymentMethodType
}

export const calcTotalByPaymentStatus = (status: string) => {
  const lowercasedMethod = status.toLowerCase()

  for (const key in TotalPaymentStatusType) {
    if (lowercasedMethod.includes(key.toLowerCase())) TotalPaymentStatusType[key]++
  }

  return TotalPaymentStatusType
}

export const getTotalByPaymentStatus = () => {
  return {
    totalPaidSales: TotalPaymentStatusType[PaymentStatusType.Paid],
    totalAwaitingPaymentSales: TotalPaymentStatusType[PaymentStatusType.AwaitingPayment],
    totalCanceledSales: TotalPaymentStatusType[PaymentStatusType.Canceled],
  }
}

export const getTotalByPaymentMethod = () => {
  return {
    creditCard:
      TotalPaymentMethodType[SalesPaymentType.Mastercard] +
      TotalPaymentMethodType[SalesPaymentType.Visa] +
      TotalPaymentMethodType[SalesPaymentType.Elo] +
      TotalPaymentMethodType[SalesPaymentType.Amex] +
      TotalPaymentMethodType[SalesPaymentType.Hipercard],
    pix: TotalPaymentMethodType[SalesPaymentType.Pix],
    boleto: TotalPaymentMethodType[SalesPaymentType.Boleto],
  }
}

export const formatOnlyNumbers = (number: string) => {
  return number.replace(/\D/g, '')
}

export const formatCellPhone = (number: string) => {
  const onlyNumbers = formatOnlyNumbers(number)

  if (onlyNumbers.length != 11) {
    return {
      phone: number,
      phone_prefix: '0',
    }
  }

  return {
    phone: onlyNumbers.slice(2),
    phone_prefix: onlyNumbers.slice(0, 2),
  }
}
