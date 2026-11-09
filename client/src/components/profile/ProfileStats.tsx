
import {
  Files,
  UploadCloud,
  Download,
} from "lucide-react";

interface ProfileStatsProps {
  totalFiles: number;
  totalUploads: number;
  totalDownloads: number;
}

const ProfileStats = ({
  totalFiles,
  totalUploads,
  totalDownloads,
}: ProfileStatsProps) => {
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
          Your file activity.
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

    </section>
  );
};

export default ProfileStats;