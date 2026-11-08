
import { Camera, Pencil, ShieldCheck } from "lucide-react";

interface ProfileHeaderProps {
  name: string;
  email: string;
  avatar?: string;
  joinedDate: string;
  onEdit: () => void;
}

const ProfileHeader = ({
  name,
  email,
  avatar,
  joinedDate,
  onEdit,
}: ProfileHeaderProps) => {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-32 bg-linear-to-r from-blue-600 via-indigo-600 to-violet-600 sm:h-40" />

      <div className="px-5 pb-6 sm:px-8">
        <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="group relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-card bg-muted sm:h-28 sm:w-28">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-blue-100 text-3xl font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}

              <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>

            <div className="pb-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight">
                  {name}
                </h1>
                <ShieldCheck className="h-5 w-5 text-blue-500" />
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {email}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                Member since {joinedDate}
              </p>
            </div>
          </div>

          <button
            onClick={onEdit}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;