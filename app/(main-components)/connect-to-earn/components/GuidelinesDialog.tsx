'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2 } from 'lucide-react';

interface GuidelinesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: () => void;
  gpuName: string;
}

export const GuidelinesDialog: React.FC<GuidelinesDialogProps> = ({
  open,
  onOpenChange,
  onAccept,
  gpuName,
}) => {
  const guidelines = [
    {
      title: 'Hardware Requirements',
      items: [
        'Compatible GPU with minimum 6GB VRAM',
        'Stable internet connection (minimum 10Mbps)',
        'Updated GPU drivers',
        'Adequate power supply',
      ],
    },
    {
      title: 'Operating Guidelines',
      items: [
        'Maintain 90% uptime for optimal rewards',
        'Monitor GPU temperature regularly',
        'Keep mining software updated',
        'Follow security best practices',
      ],
    },
    {
      title: 'Reward Structure',
      items: [
        'Rewards based on computational contribution',
        'Daily payouts in NLOV tokens',
        'Performance-based bonuses',
        'Network participation incentives',
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Connect-to-Earn Guidelines</DialogTitle>
          <DialogDescription>
            Please review and accept these guidelines before proceeding
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {guidelines.map((section, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Terms and Conditions</h3>
              <p className="text-sm text-gray-500">
                By accepting these guidelines, you agree to participate in the NeuroLov
                Connect-to-Earn program and comply with all stated requirements and
                operational guidelines. You understand that rewards are subject to
                network performance and your contribution level.
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="flex space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Review Later
          </Button>
          <Button onClick={onAccept}>
            Accept & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
