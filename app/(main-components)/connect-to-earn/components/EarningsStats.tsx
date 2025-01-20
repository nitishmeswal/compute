'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Coins, Clock, TrendingUp, ArrowUpRight } from 'lucide-react';

interface EarningsStatsProps {
  stats: {
    totalEarned: number;
    dailyRate: number;
    uptime: number;
    nextPayout: number;
  };
  onCashout?: () => void;
}

export const EarningsStats: React.FC<EarningsStatsProps> = ({ stats, onCashout }) => {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Earnings Overview</h3>
        <Badge variant="secondary" className="font-mono">
          Active
        </Badge>
      </div>

      <div className="grid gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Coins className="w-4 h-4" />
            <span className="text-sm">Total Earned</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{stats.totalEarned}</span>
            <span className="text-sm text-muted-foreground">NLOV</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">Daily Rate</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{stats.dailyRate}</span>
            <span className="text-sm text-muted-foreground">NLOV/day</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Next Payout</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{stats.nextPayout}</span>
            <span className="text-sm text-muted-foreground">hours</span>
          </div>
          <Progress value={stats.uptime} className="mt-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Uptime: {stats.uptime}%</span>
            <span>Target: 95%</span>
          </div>
        </div>

        {onCashout && (
          <Button 
            onClick={onCashout}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Coins className="w-4 h-4 mr-2" />
            Cashout Now
            <ArrowUpRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </div>
    </Card>
  );
};
