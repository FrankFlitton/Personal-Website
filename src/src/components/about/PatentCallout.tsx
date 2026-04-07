import { mdiCertificate } from "@mdi/js";
import Icon from "@mdi/react";

export function PatentCallout() {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 flex gap-4 items-start mb-12">
      <div className="w-9 h-9 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon path={mdiCertificate} size={0.75} className="text-neutral-400" />
      </div>
      <div>
        <p className="text-xs tracking-widest uppercase text-neutral-400 mb-1">
          Canadian patent
        </p>
        <p className="font-medium text-sm mb-0.5">
          Real-time group financial reconciliation
        </p>
        <p className="text-xs font-mono text-neutral-400 mb-2">
          CA 3092840 · Named inventor
        </p>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Led the engineering initiative at TD Bank&apos;s Innovation Lab that turned
          user research findings, how people actually pool and manage shared
          money, into a patented system for real-time account-based group
          budgeting and reconciliation.
        </p>
      </div>
    </div>
  );
}
