
import { useState } from "react";
import { X, Save, UserCircle } from "lucide-react";

import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import ProfileInformation from "@/components/profile/ProfileInformation";
import ProfileSettings from "@/components/profile/ProfileSettings";

interface UserProfile {
  name: string;
  email: string;
  username: string;
  location: string;
  joinedDate: string;
}

const initialUser: UserProfile = {
  name: "Abdullah",
  email: "abdullah@example.com",
  username: "abdullah",
  location: "Faisalabad, Pakistan",
  joinedDate: "November 2026",
};

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(initialUser);

  const openEditModal = () => {
    setFormData(user);
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSaveProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setUser(formData);
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    window.alert("Connect this action to your password management API.");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmed) {
      window.alert("Connect this action to your account deletion API.");
    }
  };

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
          joinedDate={user.joinedDate}
          onEdit={openEditModal}
        />

        {/* Account Statistics */}
        <ProfileStats
          totalFiles={24}
          totalUploads={18}
          totalDownloads={42}
          storageUsed="2.4"
          storageLimit="10"
        />

        {/* Personal Information */}
        <ProfileInformation
          name={user.name}
          email={user.email}
          username={user.username}
          location={user.location}
          joinedDate={user.joinedDate}
          onEdit={openEditModal}
        />

        {/* Account Settings */}
        <ProfileSettings
          onChangePassword={handleChangePassword}
          onDeleteAccount={handleDeleteAccount}
        />

      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
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

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium"
                >
                  Username
                </label>

                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-sm font-medium"
                >
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
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