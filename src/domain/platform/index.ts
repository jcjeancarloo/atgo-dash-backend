import { CreateCoupon, GetSales } from './methods'

export default interface PlatformProvider extends CreateCoupon, GetSales {}
