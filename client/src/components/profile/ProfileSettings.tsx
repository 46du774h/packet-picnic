
import { useState } from "react";
import {
  Bell,
  Shield,
  Lock,
  Eye,
  Trash2,
  ChevronRight,
} from "lucide-react";

interface ProfileSettingsProps {
  onChangePassword: () => void;
  onDeleteAccount: () => void;
}

const ProfileSettings = ({
  onChangePassword,
  onDeleteAccount,
}: ProfileSettingsProps) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  const Toggle = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          checked ? "left-5.5" : "left-0.5"
        }`}
      />
    </button>
  );

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Account Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your preferences and account security.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="border-b border-border p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/10 p-2.5">
              <Bell className="h-5 w-5 text-blue-500" />
            </div>

            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-xs text-muted-foreground">
                Manage how you receive updates.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-muted-foreground">
                Receive account and file activity updates.
              </p>
            </div>

            <Toggle
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
          </div>
        </div>

        <div className="border-b border-border p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-violet-500/10 p-2.5">
              <Eye className="h-5 w-5 text-violet-500" />
            </div>

            <div>
              <h3 className="font-medium">Privacy</h3>
              <p className="text-xs text-muted-foreground">
                Control your profile visibility.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Public Profile</p>
              <p className="text-xs text-muted-foreground">
                Allow others to view your public profile.
              </p>
            </div>

            <Toggle
              checked={publicProfile}
              onChange={setPublicProfile}
            />
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/10 p-2.5">
              <Shield className="h-5 w-5 text-emerald-500" />
            </div>

            <div>
              <h3 className="font-medium">Security</h3>
              <p className="text-xs text-muted-foreground">
                Keep your account protected.
              </p>
            </div>
          </div>

          <button
            onClick={onChangePassword}
            className="flex w-full items-center justify-between rounded-lg border border-border p-3 text-left transition hover:bg-muted"
          >
            <span className="flex items-center gap-3">
              <Lock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Change Password</span>
            </span>

            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <button
          onClick={onDeleteAccount}
          className="flex w-full items-center justify-between p-4 text-left transition hover:bg-destructive/5"
        >
          <span className="flex items-center gap-3">
            <Trash2 className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              Delete Account
            </span>
          </span>

          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </section>
  );
};

export default ProfileSettings;