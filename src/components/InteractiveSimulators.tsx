import React, { useState } from 'react';
import { Play, RotateCcw, CheckCircle, ArrowRight, ShieldAlert, Cpu, Calculator, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const InteractiveSimulators: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'decision' | 'metering'>('decision');

  // YES/NO Decision Graph State
  const [sampleQuery, setSampleQuery] = useState('Build an automated report pipeline with retry policies');
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [workflowLog, setWorkflowLog] = useState<Array<{ step: string; result: 'YES' | 'NO' | 'INFO'; reason: string }>>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Metering Engine State
  const [plan, setPlan] = useState<'free' | 'pro'>('pro');
  const [standardInputTokens, setStandardInputTokens] = useState(1200);
  const [cachedInputTokens, setCachedInputTokens] = useState(4000);
  const [reasoningOutputTokens, setReasoningOutputTokens] = useState(850);
  const [simulatedUsageThisMonth, setSimulatedUsageThisMonth] = useState(18500);
  const [idempotencyKey, setIdempotencyKey] = useState('idem_req_9921a');
  const [hasFiredOnce, setHasFiredOnce] = useState(false);

  // Run decision graph simulation
  const handleRunWorkflow = () => {
    setIsRunning(true);
    setWorkflowLog([]);
    setCurrentNodeId('node-1');

    setTimeout(() => {
      // Step 1: Technical query check
      const isTech = sampleQuery.toLowerCase().includes('pipeline') || 
                     sampleQuery.toLowerCase().includes('report') || 
                     sampleQuery.toLowerCase().includes('ai') || 
                     sampleQuery.length > 10;
      
      const step1Result: 'YES' | 'NO' = isTech ? 'YES' : 'NO';
      setWorkflowLog(prev => [
        ...prev,
        {
          step: 'Step 1: Inngest Triggered [Evaluator Node 1]',
          result: step1Result,
          reason: isTech 
            ? 'Classifier returned YES: Input contains technical pipeline intent.' 
            : 'Classifier returned NO: Input classified as generic prose.'
        }
      ]);

      if (step1Result === 'YES') {
        setCurrentNodeId('node-2-async');
        setTimeout(() => {
          // Step 2: Asynchronous execution needed?
          const needsAsync = sampleQuery.toLowerCase().includes('pipeline') || 
                             sampleQuery.toLowerCase().includes('retry') || 
                             sampleQuery.toLowerCase().includes('report');
          const step2Result: 'YES' | 'NO' = needsAsync ? 'YES' : 'NO';
          setWorkflowLog(prev => [
            ...prev,
            {
              step: 'Step 2: Execution Router [Inngest Durable Step]',
              result: step2Result,
              reason: needsAsync 
                ? 'Classifier returned YES: Workload exceeds sync threshold (>5s estimated). Routed to background worker queue.' 
                : 'Classifier returned NO: Lightweight operation. Returning synchronous response.'
            }
          ]);

          setCurrentNodeId('completed');
          setIsRunning(false);
        }, 900);
      } else {
        setCurrentNodeId('completed');
        setIsRunning(false);
      }
    }, 800);
  };

  const handleResetWorkflow = () => {
    setCurrentNodeId(null);
    setWorkflowLog([]);
    setIsRunning(false);
  };

  // Pricing formula modeled from his FlyRank capstone
  // Standard input: $2.50 per 1M tokens ($0.0000025 per token)
  // Cached input (75% discount): $0.625 per 1M tokens ($0.000000625 per token)
  // Reasoning output: $10.00 per 1M tokens ($0.000010 per token)
  const standardCostCents = (standardInputTokens * 0.00025);
  const cachedCostCents = (cachedInputTokens * 0.0000625);
  const reasoningCostCents = (reasoningOutputTokens * 0.001);
  const totalCostCents = Number((standardCostCents + cachedCostCents + reasoningCostCents).toFixed(3));
  
  const totalTokensThisCall = standardInputTokens + cachedInputTokens + reasoningOutputTokens;
  const projectUsage = simulatedUsageThisMonth + totalTokensThisCall;
  const quotaLimit = plan === 'free' ? 20000 : 100000;
  const isOverQuota = projectUsage > quotaLimit;
  const quotaStatusCode = isOverQuota ? (plan === 'free' ? 402 : 429) : 200;

  return (
    <section className="py-16 border-t border-neutral-900 bg-neutral-950/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-sky-400 font-mono mb-2">
                Interactive System Prototypes
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
                Live Architecture Simulators
              </h2>
              <p className="mt-1 text-sm text-neutral-400 max-w-xl">
                Hands-on interactive models representing the core engineering logic in my open-source repositories and FlyRank capstone.
              </p>
            </div>

            <div className="flex items-center gap-1 p-1 bg-neutral-900/80 border border-neutral-800 rounded-lg self-start md:self-auto">
              <button
                onClick={() => setActiveTab('decision')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'decision'
                    ? 'bg-neutral-800 text-sky-300 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>YES/NO Decision Graph</span>
              </button>
              <button
                onClick={() => setActiveTab('metering')}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'metering'
                    ? 'bg-neutral-800 text-sky-300 shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>AI Token Metering Engine</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          {/* TAB 1: YES/NO Workflow Simulator */}
        {activeTab === 'decision' && (
          <div className="border border-neutral-800/80 bg-neutral-900/40 rounded-xl p-5 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs text-neutral-400">
              <span className="font-mono text-sky-400">repo: RanaRafay-prog/ai-workflow-inngest</span>
              <span>Next.js 15 · React Flow · Inngest Durable Steps · OpenAI SDK</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Controls */}
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Simulation Query Prompt
                  </label>
                  <textarea
                    rows={3}
                    value={sampleQuery}
                    onChange={(e) => setSampleQuery(e.target.value)}
                    placeholder="Enter an arbitrary user prompt or task..."
                    className="w-full text-xs font-mono bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-neutral-200 focus:outline-none focus:border-sky-500/60 focus:ring-1 focus:ring-sky-500/40 resize-none"
                  />
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      type="button"
                      onClick={() => setSampleQuery('Build an automated report pipeline with retry policies')}
                      className="text-[11px] text-neutral-400 hover:text-sky-300 underline"
                    >
                      Technical task preset
                    </button>
                    <span className="text-neutral-600">·</span>
                    <button
                      type="button"
                      onClick={() => setSampleQuery('Write a haiku about rain')}
                      className="text-[11px] text-neutral-400 hover:text-sky-300 underline"
                    >
                      Creative prompt preset
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleRunWorkflow}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-2 text-xs font-medium bg-sky-500 text-neutral-950 rounded-lg hover:bg-sky-400 transition-colors disabled:opacity-50"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isRunning ? 'Executing Step...' : 'Trigger Workflow Run'}</span>
                  </button>
                  <button
                    onClick={handleResetWorkflow}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-400 hover:text-neutral-200 border border-neutral-800 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 text-xs text-neutral-400 space-y-1.5">
                  <div className="flex items-center gap-2 text-neutral-300 font-medium">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>How This Architecture Works:</span>
                  </div>
                  <p className="text-[12px] leading-relaxed">
                    Unlike linear agent chains, this visual graph forces models into strict binary YES/NO decision contracts. Inngest steps guarantee automatic retry if the output format deviates, preventing silent failure.
                  </p>
                </div>
              </div>

              {/* Visual Graph & Trace */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-neutral-950/70 border border-neutral-800 rounded-lg p-4">
                <div className="space-y-3 mb-4">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Decision Tree State Canvas</span>
                    <span className="text-neutral-500">
                      {currentNodeId ? `Active: ${currentNodeId}` : 'Idle'}
                    </span>
                  </div>

                  {/* Node 1 */}
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      currentNodeId === 'node-1'
                        ? 'border-sky-500 bg-sky-950/20 ring-1 ring-sky-500/40'
                        : 'border-neutral-800 bg-neutral-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-200">Node 1: Technical Pipeline Intent?</span>
                      <span className="text-[11px] font-mono text-neutral-400">step.run(&apos;eval-node-1&apos;)</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Evaluates whether input involves async queues, backend pipelines, or heavy processing.
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] font-mono">
                      <span className="text-emerald-400 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> YES Branch (Proceed to Node 2)
                      </span>
                      <span className="text-rose-400 flex items-center gap-1">
                        <ArrowRight className="w-3 h-3" /> NO Branch (Direct sync response)
                      </span>
                    </div>
                  </div>

                  {/* Node 2 */}
                  <div
                    className={`p-3 rounded-lg border transition-all ${
                      currentNodeId === 'node-2-async'
                        ? 'border-sky-500 bg-sky-950/20 ring-1 ring-sky-500/40'
                        : 'border-neutral-800 bg-neutral-900/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-200">Node 2: Asynchronous Worker Required?</span>
                      <span className="text-[11px] font-mono text-neutral-400">step.run(&apos;eval-node-2&apos;)</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1">
                      Determines if task needs durable background job queue or fast lightweight return.
                    </p>
                  </div>
                </div>

                {/* Execution Trace Output */}
                <div className="border-t border-neutral-800/80 pt-3">
                  <div className="text-[11px] font-mono text-neutral-400 mb-2">Step Execution Trace:</div>
                  {workflowLog.length === 0 ? (
                    <div className="text-xs font-mono text-neutral-600 py-3 text-center">
                      Click &quot;Trigger Workflow Run&quot; to execute step trace.
                    </div>
                  ) : (
                    <div className="space-y-2 font-mono text-xs">
                      {workflowLog.map((log, index) => (
                        <div key={index} className="p-2 rounded bg-neutral-900 border border-neutral-800">
                          <div className="flex items-center justify-between">
                            <span className="text-sky-300 font-semibold">{log.step}</span>
                            <span
                              className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                log.result === 'YES'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-rose-950 text-rose-300 border border-rose-800'
                              }`}
                            >
                              {log.result}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-1">{log.reason}</p>
                        </div>
                      ))}
                      {currentNodeId === 'completed' && (
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 pt-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Durable graph execution completed without retries.</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI Token Metering & Quota Simulator */}
        {activeTab === 'metering' && (
          <div className="border border-neutral-800/80 bg-neutral-900/40 rounded-xl p-5 sm:p-7">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 text-xs text-neutral-400">
              <span className="font-mono text-sky-400">repo: RanaRafay-prog/flyrank-capstone-metering-billing</span>
              <span>Express · Stripe Webhooks · Idempotency-Key · Multi-Tier AI Pricing</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-4">
                {/* Plan Selector */}
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Tenant Plan & Tier Quota
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPlan('free')}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        plan === 'free'
                          ? 'border-sky-500 bg-sky-950/20 text-neutral-100'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">Free Tier</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">Quota: 20,000 tokens/mo</div>
                      <div className="text-[10px] text-amber-400 font-mono mt-1">402 on limit (Upgrade)</div>
                    </button>
                    <button
                      onClick={() => setPlan('pro')}
                      className={`p-2.5 rounded-lg border text-left transition-colors ${
                        plan === 'pro'
                          ? 'border-sky-500 bg-sky-950/20 text-neutral-100'
                          : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                      }`}
                    >
                      <div className="text-xs font-semibold">Pro Tier</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">Quota: 100,000 tokens/mo</div>
                      <div className="text-[10px] text-sky-400 font-mono mt-1">429 on burst (Rate limit)</div>
                    </button>
                  </div>
                </div>

                {/* Token Sliders */}
                <div className="space-y-3 bg-neutral-950/60 border border-neutral-800/80 rounded-lg p-3.5">
                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span>Standard Prompt Input Tokens</span>
                      <span className="font-mono text-sky-400 tabular-nums">{standardInputTokens.toLocaleString()} tokens</span>
                    </div>
                    <input
                      type="range"
                      min="100"
                      max="10000"
                      step="100"
                      value={standardInputTokens}
                      onChange={(e) => setStandardInputTokens(Number(e.target.value))}
                      className="w-full accent-sky-500 bg-neutral-800 h-1.5 rounded cursor-pointer"
                    />
                    <span className="text-[10px] text-neutral-500">$2.50 / 1M tokens</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span>Cached Input Tokens</span>
                        <span className="text-[10px] text-emerald-400 font-medium">(75% Discount)</span>
                      </span>
                      <span className="font-mono text-emerald-400 tabular-nums">{cachedInputTokens.toLocaleString()} tokens</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20000"
                      step="500"
                      value={cachedInputTokens}
                      onChange={(e) => setCachedInputTokens(Number(e.target.value))}
                      className="w-full accent-emerald-500 bg-neutral-800 h-1.5 rounded cursor-pointer"
                    />
                    <span className="text-[10px] text-neutral-500">$0.625 / 1M tokens (Cache hit pricing)</span>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-neutral-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span>Reasoning & Output Tokens</span>
                        <span className="text-[10px] text-amber-400 font-medium">(High Compute)</span>
                      </span>
                      <span className="font-mono text-amber-400 tabular-nums">{reasoningOutputTokens.toLocaleString()} tokens</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="4000"
                      step="50"
                      value={reasoningOutputTokens}
                      onChange={(e) => setReasoningOutputTokens(Number(e.target.value))}
                      className="w-full accent-amber-500 bg-neutral-800 h-1.5 rounded cursor-pointer"
                    />
                    <span className="text-[10px] text-neutral-500">$10.00 / 1M tokens (Reasoning cost)</span>
                  </div>
                </div>

                {/* Simulated existing usage */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-400 mb-1">
                    <span>Month-to-Date Accumulated Usage</span>
                    <span className="font-mono text-neutral-300 tabular-nums">{simulatedUsageThisMonth.toLocaleString()} / {quotaLimit.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="110000"
                    step="5000"
                    value={simulatedUsageThisMonth}
                    onChange={(e) => setSimulatedUsageThisMonth(Number(e.target.value))}
                    className="w-full accent-neutral-400 bg-neutral-800 h-1.5 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Engine Output & Inspection Panel */}
              <div className="lg:col-span-6 flex flex-col justify-between bg-neutral-950/70 border border-neutral-800 rounded-lg p-4 font-mono">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase tracking-wider mb-3 flex items-center justify-between pb-2 border-b border-neutral-800">
                    <span>Engine Rollup & Quota Guard</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      quotaStatusCode === 200 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : quotaStatusCode === 402
                        ? 'bg-amber-950 text-amber-300 border border-amber-800'
                        : 'bg-rose-950 text-rose-300 border border-rose-800'
                    }`}>
                      HTTP {quotaStatusCode}
                    </span>
                  </div>

                  {/* Idempotency header display */}
                  <div className="p-2.5 rounded bg-neutral-900 border border-neutral-800/80 mb-3 text-xs space-y-1">
                    <div className="flex justify-between text-neutral-400">
                      <span>Header: Idempotency-Key</span>
                      <span className="text-sky-300">{idempotencyKey}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-neutral-500">
                      <span>Guarantees: Exactly-once billing</span>
                      <button
                        onClick={() => {
                          setIdempotencyKey(`idem_req_${Math.random().toString(36).substring(2, 7)}`);
                          setHasFiredOnce(false);
                        }}
                        className="text-neutral-400 hover:text-neutral-200 underline"
                      >
                        Rotate key
                      </button>
                    </div>
                  </div>

                  {/* Calculations breakdown */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Standard Input Cost:</span>
                      <span className="text-neutral-200 tabular-nums">${(standardCostCents / 100).toFixed(5)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Cached Input Cost:</span>
                      <span className="text-emerald-400 tabular-nums">${(cachedCostCents / 100).toFixed(5)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Reasoning Output Cost:</span>
                      <span className="text-amber-400 tabular-nums">${(reasoningCostCents / 100).toFixed(5)}</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800 flex justify-between font-bold text-sm text-neutral-100">
                      <span>Total Inferred Cost:</span>
                      <span className="text-sky-300 tabular-nums">{totalCostCents}¢ (${(totalCostCents / 100).toFixed(4)})</span>
                    </div>
                  </div>

                  {/* Quota Gauge */}
                  <div className="mt-4 pt-3 border-t border-neutral-800">
                    <div className="flex justify-between text-xs text-neutral-400 mb-1">
                      <span>Projected Quota Utilization:</span>
                      <span className="text-neutral-200 tabular-nums">
                        {Math.min(100, Math.round((projectUsage / quotaLimit) * 100))}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          isOverQuota ? 'bg-rose-500' : projectUsage / quotaLimit > 0.8 ? 'bg-amber-500' : 'bg-sky-500'
                        }`}
                        style={{ width: `${Math.min(100, (projectUsage / quotaLimit) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Over quota message */}
                  {isOverQuota && (
                    <div className="mt-3 p-2.5 rounded bg-rose-950/40 border border-rose-900/60 text-[11px] text-rose-300 flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                      <div>
                        {quotaStatusCode === 402 ? (
                          <span>402 Payment Required: Free plan quota exceeded ({projectUsage.toLocaleString()} &gt; 20k). Prompt checkout upgrade via Stripe.</span>
                        ) : (
                          <span>429 Too Many Requests: Pro quota burst limit exceeded. Quota middleware suspended generate execution.</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 text-[11px] text-neutral-500 pt-2 border-t border-neutral-800 flex items-center justify-between">
                  <span>Architecture: services/meter.js & services/quota.js</span>
                  <span className="text-emerald-400">SQLite DatabaseSync</span>
                </div>
              </div>
            </div>
          </div>
        )}
        </ScrollReveal>
      </div>
    </section>
  );
};
