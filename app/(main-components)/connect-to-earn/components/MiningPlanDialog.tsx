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
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  Zap,
  TrendingUp,
  Shield,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

interface MiningPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectPlan: (duration: number) => void;
}

export const MiningPlanDialog: React.FC<MiningPlanDialogProps> = ({
  open,
  onOpenChange,
  onSelectPlan,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');

  const plans = [
    {
      id: 'flexible',
      name: 'Flexible Mining',
      description: 'Mine when it suits you with no commitment',
      rewards: '1x Base Rate',
      features: [
        'No minimum time commitment',
        'Standard reward rate',
        'Basic support',
        'Manual optimization',
      ],
      icon: Clock,
      color: 'text-blue-500',
    },
    {
      id: 'dedicated',
      name: 'Dedicated Mining',
      description: 'Consistent mining with enhanced rewards',
      rewards: '1.5x Base Rate',
      features: [
        '12-hour daily minimum',
        'Enhanced reward rate',
        'Priority support',
        'Automated optimization',
      ],
      icon: Zap,
      color: 'text-purple-500',
      recommended: true,
    },
    {
      id: 'professional',
      name: 'Professional Mining',
      description: 'Maximum rewards for full-time miners',
      rewards: '2x Base Rate',
      features: [
        '20-hour daily minimum',
        'Maximum reward rate',
        'Premium support',
        'Advanced optimization tools',
      ],
      icon: TrendingUp,
      color: 'text-green-500',
    },
  ];

  const handleSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleConfirm = () => {
    const duration = selectedPlan === 'flexible' ? 4 : selectedPlan === 'dedicated' ? 12 : 24;
    onSelectPlan(duration);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Choose Your Mining Plan</DialogTitle>
          <DialogDescription>
            Select a mining plan that best suits your availability and goals
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`p-6 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'ring-2 ring-blue-500 dark:ring-blue-400'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => handleSelect(plan.id)}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <Icon className={`w-8 h-8 ${plan.color}`} />
                    {plan.recommended && (
                      <Badge className="bg-blue-100 text-blue-800">
                        Recommended
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>

                  <div>
                    <p className="text-2xl font-bold">{plan.rewards}</p>
                    <p className="text-sm text-gray-500">Reward Multiplier</p>
                  </div>

                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={selectedPlan === plan.id ? 'default' : 'outline'}
                    onClick={() => handleSelect(plan.id)}
                  >
                    Select Plan
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedPlan}>
            Confirm Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
