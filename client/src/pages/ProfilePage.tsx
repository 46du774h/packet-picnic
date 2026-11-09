
import { useEffect, useState } from "react";
import { X, Save, UserCircle } from "lucide-react";
import { toast } from "sonner";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileInformation from "@/components/profile/ProfileInformation";
import { useAuth } from "@/hooks/useAuth";
import { useFiles } from "@/hooks/useFiles";

interface UserProfile {
  name: string;
  email: string;
  joinedDate: string;
}

const ProfilePage = () => {
  const { user: authUser, updateProfile } = useAuth();
  const { allFiles, getAllFiles } = useFiles();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile | null>(null);

  const user: UserProfile | null = authUser
    ? {
        name: authUser.name,
        email: authUser.email,
        joinedDate: new Date(authUser.createdAt).toLocaleDateString(
          undefined,
          { month: "long", year: "numeric" }
        ),
      }
    : null;

  useEffect(() => {
    void getAllFiles().catch(() => {
      toast.error("Unable to load your file statistics");
    });
  }, []);

  const openEditModal = () => {
    if (user) {
      setFormData(user);
    }
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) =>
      previous
        ? {
            ...previous,
            [name]: value,
          }
        : previous
    );
  };

  const handleSaveProfile = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!formData) {
      return;
    }

    try {
      await updateProfile({
        name: formData.name,
      });
      setIsEditing(false);
      toast.success("Profile updated");
    } catch {
      toast.error("Unable to update your profile");
    }
  };

  if (!user) {
    return null;
  }

  const totalDownloads = allFiles.reduce(
    (total, file) => total + file.downloadCount,
    0
  );
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-6xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div>
          <div className="flex items-center gap-2">
            <UserCircle className="h-6 w-6 text-primary" />

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              My Profile
            </h1>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            Manage your personal information, storage and account settings.
          </p>
        </div>

        {/* Profile Header */}
        <ProfileHeader
          name={user.name}
          email={user.email}
          avatar={authUser?.picture ?? undefined}
          joinedDate={user.joinedDate}
          onEdit={openEditModal}
        />

        {/* Account Statistics */}
        <ProfileStats
          totalFiles={allFiles.length}
          totalUploads={allFiles.length}
          totalDownloads={totalDownloads}
        />

        {/* Personal Information */}
        <ProfileInformation
          name={user.name}
          email={user.email}
          joinedDate={user.joinedDate}
        />

      </div>

      {/* Edit Profile Modal */}
      {isEditing && formData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditModal();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
            className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="edit-profile-title"
                  className="text-xl font-bold"
                >
                  Edit Profile
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Update your personal information.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                aria-label="Close edit profile"
                className="rounded-lg p-2 transition hover:bg-muted"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;