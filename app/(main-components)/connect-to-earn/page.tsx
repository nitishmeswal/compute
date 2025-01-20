'use client';

import React, { useState } from 'react';
import { GuidelinesDialog } from '@/app/(main-components)/connect-to-earn/components/GuidelinesDialog';
import { GPUScanDialog } from '@/app/(main-components)/connect-to-earn/components/GPUScanDialog';
import { MiningPlanDialog } from '@/app/(main-components)/connect-to-earn/components/MiningPlanDialog';
import { CashoutDialog } from '@/app/(main-components)/connect-to-earn/components/CashoutDialog';
import { GPUMonitor } from '@/app/(main-components)/connect-to-earn/components/GPUMonitor';
import { EarningsStats } from '@/app/(main-components)/connect-to-earn/components/EarningsStats';
import { Card } from '@/components/ui/card';
import { Power, Lock, Cpu, Zap, Coins, Shield, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { ComingSoonOverlay } from '@/components/ComingSoonOverlay';
import { useUser } from '@/lib/hooks/useUser';

const DEV_EMAILS = ['nitishmeswal@gmail.com', 'neohex262@gmail.com', 'neurolov.ai@gmail.com'];

export default function ConnectToEarn() {
  const { user } = useUser();
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [showMiningPlan, setShowMiningPlan] = useState(false);
  const [showCashout, setShowCashout] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [detectedGPU, setDetectedGPU] = useState('');

  // Mock data
  const mockEarningsData = {
    totalEarned: 450.75,
    dailyRate: 25.5,
    uptime: 98,
    nextPayout: 24,
  };

  const mockGPUStats = {
    utilization: 85,
    temperature: 72,
    power: 220,
    memory: 8192,
  };

  const handleConnectGPU = () => {
    if (user?.email && DEV_EMAILS.includes(user.email)) {
      setShowScanDialog(true);
    }
  };

  const handleScanComplete = (gpuName: string) => {
    console.log('GPU Scan complete:', gpuName);
    setShowScanDialog(false);
    setDetectedGPU(gpuName);
    setShowGuidelines(true);
  };

  const handleGuidelinesAccept = () => {
    console.log('Guidelines accepted');
    setShowGuidelines(false);
    setShowMiningPlan(true);
  };

  const handlePlanSelect = (duration: number) => {
    console.log('Plan selected:', duration);
    setShowMiningPlan(false);
    setIsConnected(true);
    setSessionDuration(duration);
  };

  const handleCashout = () => {
    console.log('Opening cashout dialog');
    setShowCashout(true);
  };

  const features = [
    {
      icon: Cpu,
      title: 'Smart GPU Detection',
      description: 'Auto-optimizes for your GPU model'
    },
    {
      icon: Shield,
      title: 'Secure Mining',
      description: 'Enterprise-grade security protocols'
    },
    {
      icon: Coins,
      title: 'Instant Rewards',
      description: 'Earn NLOV tokens in real-time'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-40 w-full backdrop-blur-xl bg-black/40 border-b border-blue-500/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Connect & Earn with Your GPU
            </h1>
            <div className="relative">
              <span className="px-3 py-1 text-sm font-semibold bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full border border-blue-400/30 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse">
                Beta
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20 blur-xl rounded-full"></div>
            </div>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Turn your idle GPU into passive income. Start earning NLOV tokens instantly.
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6 space-y-8 relative group">
        {(!user?.email || !DEV_EMAILS.includes(user.email)) && (
          <ComingSoonOverlay 
            type="hover"
            title="Connect to Earn"
            description="Connect to Earn experience will be live in Version 3.0!"
            version="3.0"
          />
        )}
        {!isConnected ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 bg-[#1A1A1A] border-gray-800 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10">
                      <feature.icon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 bg-[#1A1A1A] border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg text-white">Network Stats</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Current network performance and active miners</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">15.2K</p>
                  <p className="text-sm text-gray-400">Active GPUs Mining</p>
                </div>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg text-white">Estimated Earnings</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Projected earnings based on your GPU model and current network stats</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">$25-35</p>
                  <p className="text-sm text-gray-400">Per Day (Estimated)</p>
                </div>
              </Card>

              <Card className="p-6 bg-[#1A1A1A] border-gray-800">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg text-white">Power Efficiency</h3>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Optimized power usage to maximize your earnings</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold text-white">92%</p>
                  <p className="text-sm text-gray-400">Efficiency Rating</p>
                </div>
              </Card>
            </div>

            <div className="flex justify-center relative z-20">
              <button
                onClick={handleConnectGPU}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-colors flex items-center gap-2 group"
              >
                <Zap className="w-5 h-5 group-hover:animate-bounce" />
                <span>Connect GPU</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {isConnected && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <Card className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/20">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-full bg-green-500/20 animate-pulse">
                        <Lock className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-white">Active Session</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400">{sessionDuration}h Session</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                        </div>
                      </div>
                    </div>
                  </Card>

                  <GPUMonitor stats={mockGPUStats} />
                  <EarningsStats stats={mockEarningsData} onCashout={handleCashout} />
                </div>

                <CashoutDialog
                  open={showCashout}
                  onOpenChange={setShowCashout}
                  amount={mockEarningsData.totalEarned}
                />
              </>
            )}
            <div className="grid gap-6">
              <Card className="p-6 bg-[#1A1A1A] border-gray-800">
                <div className="flex flex-col space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">GPU Performance Monitor</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Info className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">Real-time GPU performance metrics</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-lg bg-black/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Temperature</span>
                        <span className="text-orange-400">75°C</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-orange-500 h-2 rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-black/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">GPU Usage</span>
                        <span className="text-green-400">98%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }} />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-black/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Memory</span>
                        <span className="text-blue-400">11.5/12 GB</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '95%' }} />
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-black/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-400">Fan Speed</span>
                        <span className="text-purple-400">65%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '65%' }} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-black/30">
                      <h4 className="text-white font-medium mb-3">Mining Performance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Hashrate</span>
                          <span className="text-white">120 MH/s</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Power Draw</span>
                          <span className="text-white">285W</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Efficiency</span>
                          <span className="text-green-400">0.42 MH/W</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-black/30">
                      <h4 className="text-white font-medium mb-3">Session Stats</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Uptime</span>
                          <span className="text-white">2h 45m</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Shares</span>
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">1,245</span>
                            <span className="text-red-400">(2 rejected)</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Pool Latency</span>
                          <span className="text-white">45ms</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <EarningsStats stats={mockEarningsData} onCashout={handleCashout} />
            </div>
          </div>
        )}

        <GPUScanDialog
          open={showScanDialog}
          onOpenChange={setShowScanDialog}
          onScanComplete={handleScanComplete}
        />

        <GuidelinesDialog
          open={showGuidelines}
          onOpenChange={setShowGuidelines}
          onAccept={handleGuidelinesAccept}
          gpuName={detectedGPU}
        />

        <MiningPlanDialog
          open={showMiningPlan}
          onOpenChange={setShowMiningPlan}
          onSelectPlan={handlePlanSelect}
        />
      </div>
    </div>
  );
}
