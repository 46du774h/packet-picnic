
import {
  Files,
  UploadCloud,
  HardDrive,
  Download,
  TrendingUp,
} from "lucide-react";

interface ProfileStatsProps {
  totalFiles: number;
  totalUploads: number;
  storageUsed: string;
  storageLimit: string;
  totalDownloads: number;
}

const ProfileStats = ({
  totalFiles,
  totalUploads,
  storageUsed,
  storageLimit,
  totalDownloads,
}: ProfileStatsProps) => {
  const used = Number.parseFloat(storageUsed);
  const limit = Number.parseFloat(storageLimit);

  const percentage =
    Number.isFinite(used) && Number.isFinite(limit) && limit > 0
      ? Math.min((used / limit) * 100, 100)
      : 0;

  const stats = [
    {
      label: "Total Files",
      value: totalFiles.toLocaleString(),
      icon: Files,
      description: "Files in your account",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Uploads",
      value: totalUploads.toLocaleString(),
      icon: UploadCloud,
      description: "Successful uploads",
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
    {
      label: "Downloads",
      value: totalDownloads.toLocaleString(),
      icon: Download,
      description: "Files downloaded",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Account Overview</h2>
        <p className="text-sm text-muted-foreground">
          Your file activity and storage usage.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 transition hover:border-primary/40"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    {stat.value}
                  </h3>
                </div>

                <div className={`rounded-xl p-3 ${stat.bg}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>

              <p className="mt-3 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-500/10 p-3">
              <HardDrive className="h-5 w-5 text-orange-500" />
            </div>

            <div>
              <h3 className="font-semibold">Storage Usage</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your available storage.
              </p>
            </div>
          </div>

          <TrendingUp className="hidden h-5 w-5 text-muted-foreground sm:block" />
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium">
              {storageUsed} GB used
            </span>
            <span className="text-muted-foreground">
              {storageLimit} GB total
            </span>
          </div>

          <div
            className="h-2.5 overflow-hidden rounded-full bg-muted"
            role="progressbar"
            aria-valuenow={Math.round(percentage)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Storage used"
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            {(Math.max(limit - used, 0)).toFixed(1)} GB remaining
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileStats;