export interface PaymentMethod {
  id: string
  name: string
  icon: string
  type: 'upi' | 'card' | 'wallet' | 'netbanking'
  isRecommended?: boolean
}

export interface UPIProvider {
  id: string
  name: string
  icon: string
  appPackage: string
  deepLink: string
}

export interface PaymentData {
  courseId: string
  courseName: string
  amount: number
  originalAmount: number
  discount: number
  teacherId: string
  teacherName: string
  studentName: string
  studentEmail: string
  studentPhone: string
  paymentMethod: string
  upiId?: string
  upiProvider?: string
}

export interface PaymentResponse {
  success: boolean
  transactionId?: string
  paymentId?: string
  error?: string
  message?: string
}

export const UPI_PROVIDERS: UPIProvider[] = [
  {
    id: 'googlepay',
    name: 'Google Pay',
    icon: 'https://pay.google.com/about/static_kcs/images/logos/google-pay-logo.svg',
    appPackage: 'com.google.android.apps.nbu.paisa.user',
    deepLink: 'googlepay://upi/pay'
  },
  {
    id: 'phonepe',
    name: 'PhonePe',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg',
    appPackage: 'com.phonepe.app',
    deepLink: 'phonepe://upi/pay'
  },
  {
    id: 'paytm',
    name: 'Paytm',
    icon: 'https://img.icons8.com/?size=100&id=zB8j6RfneRmV&format=png&color=000000',
    appPackage: 'net.one97.paytm',
    deepLink: 'paytm://upi/pay'
  },
  {
    id: 'bhim',
    name: 'BHIM',
    icon: 'https://upload.wikimedia.org/wikipedia/en/6/65/BHIM_SVG_Logo.svg',
    appPackage: 'in.gov.uidai.bhim',
    deepLink: 'bhim://upi/pay'
  }
]

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'upi',
    name: 'UPI',
    icon: '⚡',
    type: 'upi',
    isRecommended: true
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: '💳',
    type: 'card'
  },
  {
    id: 'wallet',
    name: 'Wallet',
    icon: '👛',
    type: 'wallet'
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: '🏦',
    type: 'netbanking'
  }
]
