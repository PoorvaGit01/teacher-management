import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  XCircle, 
  Loader2, 
  CreditCard, 
  Smartphone, 
  Shield, 
  ArrowLeft
} from "lucide-react"
import { PAYMENT_METHODS, UPI_PROVIDERS, PaymentData } from '@/constants/paymentType'
import { Course, Teacher } from '@/constants/types'
import { paymentService } from './PaymentService'

const paymentSchema = z.object({
  studentName: z.string().min(2, 'Name must be at least 2 characters'),
  studentEmail: z.string().email('Please enter a valid email'),
  studentPhone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid phone number'),
  paymentMethod: z.string().min(1, 'Please select a payment method'),
  upiId: z.string().optional(),
  upiProvider: z.string().optional(),
})

type PaymentFormData = z.infer<typeof paymentSchema>

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  course: Course
  teacher: Teacher
}

type PaymentStep = 'details' | 'method' | 'processing' | 'success' | 'error'

export const PaymentModal = ({ isOpen, onClose, course, teacher }: PaymentModalProps) => {
  const [step, setStep] = useState<PaymentStep>('details')
  const [paymentResponse, setPaymentResponse] = useState<any>(null)
  const [selectedMethod, setSelectedMethod] = useState('')
  const [selectedUPIProvider, setSelectedUPIProvider] = useState('')

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      studentName: '',
      studentEmail: '',
      studentPhone: '',
      paymentMethod: 'upi',
      upiId: '',
      upiProvider: ''
    }
  })

  const discount = paymentService.calculateDiscount(course.originalPrice, 25)
  const finalAmount = course.price

  const handleClose = () => {
    setStep('details')
    setPaymentResponse(null)
    setSelectedMethod('')
    setSelectedUPIProvider('')
    form.reset()
    onClose()
  }

  const handleDetailsSubmit = (data: PaymentFormData) => {
    setStep('method')
    setSelectedMethod(data.paymentMethod)
  }

  const handlePaymentMethodSelect = (method: string) => {
    setSelectedMethod(method)
    form.setValue('paymentMethod', method)
  }

  const handleUPIProviderSelect = (provider: string) => {
    setSelectedUPIProvider(provider)
    form.setValue('upiProvider', provider)
  }

  const processPayment = async () => {
    setStep('processing')
    
    const formData = form.getValues()
    const paymentData: PaymentData = {
      courseId: course.id,
      courseName: course.title,
      amount: finalAmount,
      originalAmount: course.originalPrice,
      discount: discount,
      teacherId: teacher.id,
      teacherName: teacher.name,
      studentName: formData.studentName,
      studentEmail: formData.studentEmail,
      studentPhone: formData.studentPhone,
      paymentMethod: formData.paymentMethod,
      upiId: formData.upiId,
      upiProvider: formData.upiProvider
    }

    try {
      const response = await paymentService.processPayment(paymentData)
      setPaymentResponse(response)
      
      if (response.success) {
        setStep('success')
      } else {
        setStep('error')
      }
    } catch (error) {
      setPaymentResponse({
        success: false,
        error: 'Payment failed',
        message: 'An unexpected error occurred'
      })
      setStep('error')
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 'details':
        return (
          <form onSubmit={form.handleSubmit(handleDetailsSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="studentName">Full Name *</Label>
                <Input
                  id="studentName"
                  {...form.register('studentName')}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
                {form.formState.errors.studentName && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.studentName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="studentEmail">Email Address *</Label>
                <Input
                  id="studentEmail"
                  type="email"
                  {...form.register('studentEmail')}
                  placeholder="Enter your email"
                  className="mt-1"
                />
                {form.formState.errors.studentEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.studentEmail.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="studentPhone">Phone Number *</Label>
                <Input
                  id="studentPhone"
                  {...form.register('studentPhone')}
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
                {form.formState.errors.studentPhone && (
                  <p className="text-red-500 text-sm mt-1">
                    {form.formState.errors.studentPhone.message}
                  </p>
                )}
              </div>
            </div>

            <Separator />

            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Course Price</span>
                <span className="text-sm line-through text-gray-500">
                  {paymentService.formatAmount(course.originalPrice)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Discount</span>
                <span className="text-sm text-green-600">
                  -{paymentService.formatAmount(discount)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between items-center font-semibold">
                <span>Total Amount</span>
                <span className="text-lg text-blue-600">
                  {paymentService.formatAmount(finalAmount)}
                </span>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Continue to Payment
            </Button>
          </form>
        )

      case 'method':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setStep('details')}
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <h3 className="text-lg font-semibold">Choose Payment Method</h3>
            </div>

            <div className="space-y-4">
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodSelect(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{method.icon}</span>
                      <div>
                        <div className="font-medium">{method.name}</div>
                        {method.isRecommended && (
                          <Badge variant="secondary" className="text-xs">
                            Recommended
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {selectedMethod === method.id && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedMethod === 'upi' && (
              <div className="space-y-4">
                <Label>Choose UPI App</Label>
                <div className="grid grid-cols-2 gap-3">
                  {UPI_PROVIDERS.map((provider) => (
                    <div
                      key={provider.id}
                      className={`border rounded-lg p-3 cursor-pointer text-center transition-all ${
                        selectedUPIProvider === provider.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleUPIProviderSelect(provider.id)}
                    >
                      <img src={provider.icon} className="text-2xl mb-1"/>
                      <div className="text-sm font-medium">{provider.name}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <Label htmlFor="upiId">Or enter UPI ID</Label>
                  <Input
                    id="upiId"
                    {...form.register('upiId')}
                    placeholder="yourname@upi"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Shield className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700">
                Your payment is secured with 256-bit encryption
              </span>
            </div>

            <Button onClick={processPayment} className="w-full" size="lg">
              <CreditCard className="h-4 w-4 mr-2" />
              Pay {paymentService.formatAmount(finalAmount)}
            </Button>
          </div>
        )

      case 'processing':
        return (
          <div className="text-center py-8">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-blue-500" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600">
              Please wait while we process your payment...
            </p>
          </div>
        )

      case 'success':
        return (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-green-700">
              Payment Successful!
            </h3>
            <p className="text-gray-600 mb-4">
              {paymentResponse?.message || 'Your enrollment has been confirmed.'}
            </p>
            {paymentResponse?.transactionId && (
              <p className="text-sm text-gray-500 mb-6">
                Transaction ID: {paymentResponse.transactionId}
              </p>
            )}
            <div className="space-y-3">
              <Button onClick={handleClose} className="w-full">
                Start Learning
              </Button>
              <Button variant="outline" onClick={handleClose} className="w-full">
                Go to Dashboard
              </Button>
            </div>
          </div>
        )

      case 'error':
        return (
          <div className="text-center py-8">
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-red-700">
              Payment Failed
            </h3>
            <p className="text-gray-600 mb-6">
              {paymentResponse?.message || 'Something went wrong. Please try again.'}
            </p>
            <div className="space-y-3">
              <Button onClick={() => setStep('method')} className="w-full">
                Try Again
              </Button>
              <Button variant="outline" onClick={handleClose} className="w-full">
                Cancel
              </Button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {step === 'details' && 'Student Details'}
            {step === 'method' && 'Payment Method'}
            {step === 'processing' && 'Processing'}
            {step === 'success' && 'Payment Successful'}
            {step === 'error' && 'Payment Failed'}
          </DialogTitle>
          <DialogDescription>
            {step === 'details' && `Enroll in ${course.title} by ${teacher.name}`}
            {step === 'method' && 'Select your preferred payment method'}
            {step === 'processing' && 'Please do not close this window'}
            {step === 'success' && 'Welcome to the course!'}
            {step === 'error' && 'Please try again or contact support'}
          </DialogDescription>
        </DialogHeader>
        
        {renderStepContent()}
      </DialogContent>
    </Dialog>
  )
}