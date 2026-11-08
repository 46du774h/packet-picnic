
import { Mail, User, CalendarDays, MapPin, Pencil } from "lucide-react";

interface ProfileInformationProps {
  name: string;
  email: string;
  username: string;
  location: string;
  joinedDate: string;
  onEdit: () => void;
}

const ProfileInformation = ({
  name,
  email,
  username,
  location,
  joinedDate,
  onEdit,
}: ProfileInformationProps) => {
  const information = [
    {
      label: "Full Name",
      value: name,
      icon: User,
    },
    {
      label: "Email Address",
      value: email,
      icon: Mail,
    },
    {
      label: "Username",
      value: `@${username}`,
      icon: User,
    },
    {
      label: "Location",
      value: location || "Not provided",
      icon: MapPin,
    },
    {
      label: "Joined Date",
      value: joinedDate,
      icon: CalendarDays,
    },
  ];

  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your personal account details.
          </p>
        </div>

        <button
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium transition hover:bg-muted"
        >
          <Pencil className="h-4 w-4" />
          <span className="hidden sm:inline">Edit Details</span>
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {information.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-start gap-3">
              <div className="rounded-lg bg-muted p-2.5">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">
                  {item.label}
                </p>

                <p className="mt-1 wrap-break-word text-sm font-medium">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProfileInformation;