
import { Mail, User, CalendarDays } from "lucide-react";

interface ProfileInformationProps {
  name: string;
  email: string;
  joinedDate: string;
}

const ProfileInformation = ({
  name,
  email,
  joinedDate,
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
      label: "Joined Date",
      value: joinedDate,
      icon: CalendarDays,
    },
  ];

  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-6">
        <div>
          <h2 className="text-lg font-semibold">
            Personal Information
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Your personal account details.
          </p>
        </div>
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