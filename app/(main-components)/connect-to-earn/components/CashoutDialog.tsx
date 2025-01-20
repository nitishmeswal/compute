'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Wallet,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  CreditCard,
  Building2,
  Coins,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CashoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
}

type PaymentType = 'upi' | 'card' | 'netbanking' | 'crypto';

interface PaymentOption {
  id: PaymentType;
  name: string;
  description: string;
  icon: React.ElementType;
  minAmount: number;
  maxAmount: number;
  processingFee: number;
  estimatedTime: string;
}

const paymentOptions: PaymentOption[] = [
  {
    id: 'upi',
    name: 'UPI Transfer',
    description: 'Instant transfer to your UPI ID',
    icon: Wallet,
    minAmount: 100,
    maxAmount: 10000,
    processingFee: 0,
    estimatedTime: '2-5 minutes'
  },
  {
    id: 'card',
    name: 'Card Transfer',
    description: 'Transfer to your debit/credit card',
    icon: CreditCard,
    minAmount: 500,
    maxAmount: 50000,
    processingFee: 2,
    estimatedTime: '30-60 minutes'
  },
  {
    id: 'netbanking',
    name: 'Bank Transfer',
    description: 'Direct transfer to your bank account',
    icon: Building2,
    minAmount: 1000,
    maxAmount: 100000,
    processingFee: 1,
    estimatedTime: '1-2 business days'
  },
  {
    id: 'crypto',
    name: 'Crypto Transfer',
    description: 'Convert to ETH, SOL, or BTC',
    icon: Coins,
    minAmount: 50,
    maxAmount: 1000000,
    processingFee: 0.5,
    estimatedTime: '10-15 minutes'
  },
];

export const CashoutDialog: React.FC<CashoutDialogProps> = ({
  open,
  onOpenChange,
  amount: availableBalance,
}) => {
  const [selectedOption, setSelectedOption] = useState<PaymentType | null>(null);
  const [step, setStep] = useState<'select' | 'confirm' | 'success'>('select');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');

  const selectedPaymentOption = paymentOptions.find(opt => opt.id === selectedOption);
  const numericAmount = Number(amount);
  const processingFeeAmount = selectedPaymentOption ? (numericAmount * selectedPaymentOption.processingFee) / 100 : 0;
  const finalAmount = numericAmount - processingFeeAmount;

  const handleCashout = () => {
    const cashoutAmount = Number(amount);
    
    if (!selectedPaymentOption) {
      setError('Please select a payment method');
      return;
    }

    if (isNaN(cashoutAmount)) {
      setError('Please enter a valid number');
      return;
    }

    if (cashoutAmount < selectedPaymentOption.minAmount) {
      setError(`Minimum cashout amount for ${selectedPaymentOption.name} is ${selectedPaymentOption.minAmount} NLOV`);
      return;
    }

    if (cashoutAmount > selectedPaymentOption.maxAmount) {
      setError(`Maximum cashout amount for ${selectedPaymentOption.name} is ${selectedPaymentOption.maxAmount} NLOV`);
      return;
    }

    if (cashoutAmount > availableBalance) {
      setError('Insufficient balance');
      return;
    }

    if (step === 'select') {
      setStep('confirm');
      return;
    }

    setProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setTransactionId(Math.random().toString(36).substring(2, 15));
      setStep('success');
    }, 2000);
  };

  const renderContent = () => {
    switch (step) {
      case 'select':
        return (
          <div className="space-y-6">
            <Card className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Available Balance</p>
                  <p className="text-2xl font-bold">{availableBalance} NLOV</p>
                </div>
                <Wallet className="w-8 h-8 text-blue-500" />
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {paymentOptions.map((option) => (
                <Card
                  key={option.id}
                  className={cn(
                    'p-4 cursor-pointer transition-all hover:border-blue-500',
                    selectedOption === option.id && 'border-blue-500 bg-blue-500/5'
                  )}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <option.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-gray-500">{option.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge variant="secondary">Min: {option.minAmount} NLOV</Badge>
                        <Badge variant="secondary">Fee: {option.processingFee}%</Badge>
                        <Badge variant="secondary">{option.estimatedTime}</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {selectedOption && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="amount">Cashout Amount</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setAmount(availableBalance.toString())}
                  >
                    Max
                  </Button>
                </div>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError('');
                  }}
                />
                {error && (
                  <div className="flex items-center text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    {error}
                  </div>
                )}
                {selectedPaymentOption && amount && !error && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Amount:</span>
                      <span>{numericAmount} NLOV</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Processing Fee ({selectedPaymentOption.processingFee}%):</span>
                      <span>{processingFeeAmount} NLOV</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>You'll Receive:</span>
                      <span>{finalAmount} NLOV</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      case 'confirm':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium">Confirm Your Cashout</h3>
              <p className="text-gray-500">Please review the transaction details</p>
            </div>

            <Card className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Payment Method</span>
                <div className="flex items-center">
                  {selectedPaymentOption?.icon && (
                    <selectedPaymentOption.icon className="w-4 h-4 mr-2" />
                  )}
                  <span>{selectedPaymentOption?.name}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Amount</span>
                <span>{numericAmount} NLOV</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Processing Fee</span>
                <span>{processingFeeAmount} NLOV</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">You'll Receive</span>
                <span className="font-medium">{finalAmount} NLOV</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Estimated Time</span>
                <span>{selectedPaymentOption?.estimatedTime}</span>
              </div>
            </Card>
          </div>
        );

      case 'success':
        return (
          <div className="space-y-6 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-lg font-medium">Cashout Successful!</h3>
              <p className="text-gray-500">Your transaction has been processed</p>
            </div>

            <Card className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Transaction ID</span>
                <span className="font-mono">{transactionId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Amount</span>
                <span>{finalAmount} NLOV</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Payment Method</span>
                <span>{selectedPaymentOption?.name}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Estimated Arrival</span>
                <span>{selectedPaymentOption?.estimatedTime}</span>
              </div>
            </Card>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cashout NLOV Tokens</DialogTitle>
          <DialogDescription>
            {step === 'select' && 'Choose your preferred cashout method'}
            {step === 'confirm' && 'Review your transaction details'}
            {step === 'success' && 'Transaction Complete'}
          </DialogDescription>
        </DialogHeader>

        {renderContent()}

        <DialogFooter>
          {step === 'select' && (
            <>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCashout}
                disabled={!amount || !selectedOption || processing}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </>
          )}

          {step === 'confirm' && (
            <>
              <Button variant="outline" onClick={() => setStep('select')}>
                Back
              </Button>
              <Button
                onClick={handleCashout}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Processing
                  </>
                ) : (
                  <>
                    Confirm Cashout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </>
          )}

          {step === 'success' && (
            <Button onClick={() => onOpenChange(false)}>
              Done
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
