import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "../../lib/utils";
import { Trade } from "../../types/trade";
import { getTradeSymbol, getTradeDirection, getTradeOutcome, getTradeDisplayOutcome, getTradePnl, getTradeClosePrice, getTradeDate } from "../../lib/tradeUtils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Box, Activity, DollarSign, Image as ImageIcon, Expand } from "lucide-react";
import { Tag as TagIcon } from "lucide-react";

interface TradeDetailDialogProps {
  trade: Trade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TradeDetailDialog({ trade, open, onOpenChange }: TradeDetailDialogProps) {
  const [imageExpanded, setImageExpanded] = useState(false);

  if (!trade) return null;

  const symbol = getTradeSymbol(trade);
  const direction = getTradeDirection(trade);
  const outcomeRaw = getTradeOutcome(trade);
  const outcomeDisplay = getTradeDisplayOutcome(trade);
  const pnlResult = getTradePnl(trade);
  const closePrice = getTradeClosePrice(trade);
  const dateStr = getTradeDate(trade);
  let parsedDate = new Date();
  try {
    if (dateStr) parsedDate = new Date(dateStr);
  } catch(e) {}

  const isWin = outcomeRaw === "WIN";
  const isLoss = outcomeRaw === "LOSE" || outcomeRaw === "LOSS";

  const outcomeColor = isWin ? "text-green-500 bg-green-500/10 border-green-500/20" :
                       isLoss ? "text-red-500 bg-red-500/10 border-red-500/20" :
                       "text-amber-500 bg-amber-500/10 border-amber-500/20";

  const dirColor = direction === "LONG" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" :
                   direction === "SHORT" ? "text-purple-400 bg-purple-400/10 border-purple-400/20" :
                   "bg-muted/20 text-muted-foreground border-white/5";

  const screenshotUrl = trade.outcomeScreenshotUrl || trade.rrChartUrl || trade.imageUrl;

  return (
    <>
      {/* Fullscreen image overlay */}
      {imageExpanded && screenshotUrl && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center cursor-zoom-out"
          onClick={() => setImageExpanded(false)}
        >
          <img
            src={screenshotUrl}
            alt="Trade Chart Fullscreen"
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
          />
          <div className="absolute top-4 right-4 text-white/60 text-xs font-mono bg-black/60 px-3 py-1.5 rounded-full">
            Click anywhere to close
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl bg-background border-border/50 text-foreground p-0 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
          <DialogHeader className="p-6 pb-4 shrink-0 border-b border-border/50 bg-muted/20">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <DialogTitle className="text-2xl font-mono tracking-tight font-bold">
                    {symbol}
                  </DialogTitle>
                  <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold uppercase", dirColor)}>
                    {direction}
                  </div>
                  <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs font-bold uppercase", outcomeColor)}>
                    {outcomeDisplay}
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-1.5 border border-white/10 px-2 py-0.5 rounded-md bg-black/20">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    {format(parsedDate, "MMM d, yyyy • h:mm a")}
                  </div>

                  {trade.source === "bot" && (
                    <div className="flex items-center gap-1.5 border border-white/10 px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400">
                      <Activity className="w-3.5 h-3.5" />
                      BOT: {trade.botName || "Unknown"}
                    </div>
                  )}

                  {trade.accountType && (
                    <div className="flex items-center gap-1.5 border border-white/10 px-2 py-0.5 rounded-md bg-zinc-800">
                      <Box className="w-3.5 h-3.5" />
                      {trade.accountType.toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0">
                <span className="text-xs uppercase font-mono text-muted-foreground mb-1">Net PNL</span>
                <span className={cn("text-2xl font-mono font-bold tracking-tight", pnlResult > 0 ? "text-green-500" : pnlResult < 0 ? "text-red-500" : "text-amber-500")}>
                  {pnlResult > 0 ? "+" : ""}{trade.accountCurrency === "USD" ? "$" : ""}{pnlResult?.toFixed(2)}{trade.accountCurrency && trade.accountCurrency !== "USD" ? ` ${trade.accountCurrency}` : ""}
                </span>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Left Column: Stats */}
              <div className="lg:col-span-1 space-y-5">

                {/* Execution Details */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold font-mono uppercase text-muted-foreground border-b border-border/50 pb-2 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" /> Execution Details
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Entry</span>
                      <span className="font-mono text-sm font-semibold">{trade.entryPrice || "-"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Exit</span>
                      <span className="font-mono text-sm font-semibold">{closePrice || "-"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Volume</span>
                      <span className="font-mono text-sm font-semibold">{trade.volume || "-"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Close Reason</span>
                      <span className="font-mono text-sm font-semibold">{trade.closeReason || "-"}</span>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-border/50" />

                {/* Risk & Reward */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold font-mono uppercase text-muted-foreground border-b border-border/50 pb-2 flex items-center gap-2">
                    <DollarSign className="w-3.5 h-3.5" /> Risk / Reward
                  </h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-red-400 tracking-wide">Stop Loss</span>
                      <span className="font-mono text-sm font-semibold">{trade.stopLoss || "-"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-green-400 tracking-wide">Take Profit</span>
                      <span className="font-mono text-sm font-semibold">{trade.takeProfit || "-"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Gross PnL</span>
                      <span className="font-mono text-sm font-semibold">{trade.grossPnl !== undefined ? trade.grossPnl : "-"}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Est. RR</span>
                      <span className="font-mono text-sm font-semibold">{trade.rrRatio ? `1:${trade.rrRatio}` : "-"}</span>
                    </div>
                  </div>
                </div>

                {/* Classification */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold font-mono uppercase text-muted-foreground border-b border-border/50 pb-2 flex items-center gap-2">
                    <TagIcon className="w-3.5 h-3.5" /> Classification
                  </h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Strategy</span>
                      <span className="font-mono text-sm text-foreground">{trade.strategyName || trade.strategy || "None"}</span>
                    </div>
                    {trade.tags && trade.tags.length > 0 && (
                      <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase text-muted-foreground tracking-wide">Tags</span>
                        <div className="flex flex-wrap gap-1.5">
                          {trade.tags.map(t => (
                            <span key={t} className="text-xs bg-muted/40 px-2 py-0.5 rounded text-muted-foreground">{t}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Column: Screenshot */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="flex-1 flex flex-col rounded-xl overflow-hidden border border-white/10 bg-[#0c0c0c] min-h-[280px]">
                  {screenshotUrl ? (
                    <div
                      className="relative w-full h-full min-h-[280px] flex items-center justify-center bg-zinc-950 p-2 group cursor-zoom-in"
                      onClick={() => setImageExpanded(true)}
                      title="Click to expand"
                    >
                      <img
                        src={screenshotUrl}
                        alt="Trade Chart"
                        className="max-w-full max-h-full object-contain rounded-md transition-opacity group-hover:opacity-90"
                        onError={(e) => {
                           const tgt = e.target as HTMLImageElement;
                           tgt.style.display = 'none';
                        }}
                      />
                      {/* Expand hint overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-md">
                        <div className="bg-black/70 text-white text-xs font-mono px-3 py-1.5 rounded-full flex items-center gap-1.5">
                          <Expand size={12} /> Expand
                        </div>
                      </div>
                      {trade.outcomeScreenshotSource && (
                         <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono px-2 py-1 rounded text-white/70">
                           Source: {trade.outcomeScreenshotSource}
                         </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full min-h-[280px] text-muted-foreground gap-3">
                      <ImageIcon className="w-10 h-10 opacity-20" />
                      <p className="font-mono text-sm opacity-50">No screenshot attached.</p>
                    </div>
                  )}
                </div>

                {trade.notes && (
                  <div className="bg-muted/20 border border-white/5 rounded-xl p-4 shrink-0">
                    <h4 className="text-xs font-bold font-mono uppercase text-muted-foreground mb-3">
                      Notes
                    </h4>
                    <p className="text-sm whitespace-pre-wrap leading-relaxed text-foreground/90">
                      {trade.notes}
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
