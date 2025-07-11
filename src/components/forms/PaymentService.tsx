import { PaymentData, PaymentResponse, UPI_PROVIDERS } from "@/constants/paymentType"

class PaymentService {
  private generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private generateUPIURL(paymentData: PaymentData): string {
    const { amount, courseName, studentName } = paymentData
    const merchantVPA = 'merchant@paytm' // Replace with your merchant VPA
    const transactionId = this.generateTransactionId()
    
    const params = new URLSearchParams({
      pa: merchantVPA,
      pn: 'EduPlatform',
      am: amount.toString(),
      cu: 'INR',
      tn: `Payment for ${courseName}`,
      tr: transactionId,
      mc: '8999', // Education category code
      url: `${window.location.origin}/payment/callback`
    })
    
    return `upi://pay?${params.toString()}`
  }

  private async simulatePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulate success/failure (90% success rate)
    const isSuccess = Math.random() > 0.1
    
    if (isSuccess) {
      return {
        success: true,
        transactionId: this.generateTransactionId(),
        paymentId: `PAY_${Date.now()}`,
        message: 'Payment completed successfully!'
      }
    } else {
      return {
        success: false,
        error: 'Payment failed. Please try again.',
        message: 'Transaction was declined by the bank.'
      }
    }
  }

  async initiateUPIPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const upiURL = this.generateUPIURL(paymentData)
      
      if (paymentData.upiProvider) {
        const provider = UPI_PROVIDERS.find(p => p.id === paymentData.upiProvider)
        if (provider) {
          const deepLinkURL = upiURL.replace('upi://', `${provider.deepLink}?`)
          window.location.href = deepLinkURL
        }
      } else {
        window.location.href = upiURL
      }
      
      return {
        success: true,
        message: 'Redirecting to UPI app...'
      }
    } catch (error) {
      return {
        success: false,
        error: 'Failed to initiate UPI payment',
        message: 'Please try again or choose a different payment method.'
      }
    }
  }

  async processPayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      if (paymentData.paymentMethod === 'upi') {
        return await this.simulatePayment(paymentData)
      }
      return await this.simulatePayment(paymentData)
    } catch (error) {
      return {
        success: false,
        error: 'Payment processing failed',
        message: 'An unexpected error occurred. Please try again.'
      }
    }
  }

  async verifyPayment(transactionId: string): Promise<PaymentResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      return {
        success: true,
        transactionId,
        message: 'Payment verified successfully!'
      }
    } catch (error) {
      return {
        success: false,
        error: 'Payment verification failed',
        message: 'Unable to verify payment status.'
      }
    }
  }

  formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount)
  }

  calculateDiscount(originalAmount: number, discountPercent: number): number {
    return Math.round(originalAmount * (discountPercent / 100))
  }

  isValidUPIId(upiId: string): boolean {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z0-9.\-_]{2,64}$/
    return upiRegex.test(upiId)
  }

  isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^[6-9]\d{9}$/
    return phoneRegex.test(phone)
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
}

export const paymentService = new PaymentService()
