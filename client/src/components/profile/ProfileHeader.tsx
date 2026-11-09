
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
    <section className="rounded-xl border border-border bg-card p-5 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="group relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-muted sm:h-24 sm:w-24">
              {avatar ? (
                <img
                  src={avatar}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-3xl font-semibold text-foreground">
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
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
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
    </section>
  );
};

export default ProfileHeader;