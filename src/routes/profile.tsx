import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, CreditCard, FileText, HelpCircle, Lock, LogOut, MapPin, Phone, Shield } from "lucide-react";
import { useState } from "react";
import { LanguagePicker } from "@/components/LanguagePicker";
import { Logo } from "@/components/Logo";
import { Button, Card, Field, Input, LinkButton, Row, Screen } from "@/components/kit";
import { formatDate, initials } from "@/lib/mock-data";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  component: ProfileScreen,
});

function ProfileScreen() {
  const { user } = useApp();
  if (!user) {
    return (
      <div className="min-h-dvh bg-background px-4 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <Logo size={36} className="mx-auto mb-4" />
        <h1 className="font-display text-[22px] font-semibold">Profile</h1>
        <p className="mt-2 text-sm text-muted-foreground">Continue as a guest or create an account to manage coverage.</p>
        <div className="mt-6 space-y-2">
          <LinkButton to="/login" full>Log In</LinkButton>
          <LinkButton to="/register" variant="outline" full>Create Account</LinkButton>
        </div>
        <div className="mt-6 overflow-hidden rounded-lg">
          <Row icon={<HelpCircle size={18} />} label="FAQs" to="/faq" />
          <Row icon={<MapPin size={18} />} label="Contact Us" to="/contact" />
          <Row icon={<FileText size={18} />} label="Terms & Conditions" to="/terms" />
          <Row icon={<Shield size={18} />} label="Privacy Policy" to="/privacy" />
        </div>
        <p className="mt-8 text-center text-xs text-dim">App version 1.0.0</p>
      </div>
    );
  }
  return <ProfileInner />;
}

function ProfileInner() {
  const { user, updateUser, logout, prefs, togglePref, policies } = useApp();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: user!.firstName,
    lastName: user!.lastName,
    dob: user!.dob,
    email: user!.email,
    phone: user!.phone,
    address: user!.address,
  });

  return (
    <Screen padded={false} className="pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="px-4 pb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary font-display text-lg font-bold">
            {initials(user!.firstName, user!.lastName)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-display text-xl font-semibold">{user!.firstName} {user!.lastName}</p>
            <p className="text-xs text-dim">Member since {formatDate(user!.memberSince)}</p>
          </div>
          <button type="button" className="text-xs font-semibold text-primary" onClick={() => setEditing((e) => !e)}>
            {editing ? "Done" : "Edit"}
          </button>
        </div>

        <h2 className="mb-2 mt-7 font-display text-lg font-semibold">Customer Profile</h2>
        {editing ? (
          <Card>
            {([
              ["firstName", "First name"],
              ["lastName", "Last name"],
              ["dob", "Date of birth"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["address", "Address"],
            ] as const).map(([key, label]) => (
              <Field key={key} label={label}>
                <Input
                  type={key === "dob" ? "date" : key === "email" ? "email" : "text"}
                  value={form[key]}
                  onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                />
              </Field>
            ))}
            <Button full onClick={() => { updateUser(form); setEditing(false); }}>Save profile</Button>
          </Card>
        ) : (
          <Card className="space-y-1 text-sm">
            <p>{user!.email}</p>
            <p className="text-muted-foreground">{user!.phone}</p>
            <p className="text-muted-foreground">{user!.address || "Add your address"}</p>
          </Card>
        )}

        <h3 className="mb-2 mt-5 text-sm font-semibold text-muted-foreground">Household members</h3>
        <Card className="space-y-2">
          {user!.household.length === 0 && <p className="text-sm text-dim">No household members yet.</p>}
          {user!.household.map((h) => (
            <p key={h.id} className="text-sm">
              {h.name} · {h.relationship}
            </p>
          ))}
        </Card>

        <h2 className="mb-2 mt-7 font-display text-lg font-semibold">Notifications & Security</h2>
        <div className="overflow-hidden rounded-lg">
          {(Object.keys(prefs) as (keyof typeof prefs)[]).map((key) => (
            <label key={key} className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 capitalize">
              <span className="flex items-center gap-2 text-sm"><Bell size={16} className="text-primary" /> {key}</span>
              <input type="checkbox" checked={prefs[key]} onChange={() => togglePref(key)} className="accent-primary" />
            </label>
          ))}
          <Row icon={<Lock size={18} />} label="Change Password" to="/profile/password" />
          <label className="flex items-center justify-between border-b border-border bg-surface px-4 py-4">
            <span className="flex items-center gap-3 text-sm font-medium"><Shield size={18} className="text-primary" /> Two-Factor Authentication</span>
            <input type="checkbox" checked={user!.twoFactor} onChange={() => updateUser({ twoFactor: !user!.twoFactor })} className="accent-primary" />
          </label>
          <Row icon={<CreditCard size={18} />} label="Payment methods" to="/payments" />
        </div>

        <h3 className="mb-2 mt-5 text-sm font-semibold text-muted-foreground">Language</h3>
        <LanguagePicker value={user!.language} onChange={(id) => updateUser({ language: id })} />

        <h2 className="mb-2 mt-7 font-display text-lg font-semibold">Support</h2>
        <div className="overflow-hidden rounded-lg">
          <Row icon={<HelpCircle size={18} />} label="FAQs" to="/faq" />
          <Row icon={<Phone size={18} />} label="Contact Us" to="/contact" />
          <Row icon={<FileText size={18} />} label="Terms & Conditions" to="/terms" />
          <Row icon={<Shield size={18} />} label="Privacy Policy" to="/privacy" />
        </div>

        <p className="mt-4 text-xs text-dim">{policies.filter((p) => p.status === "Active").length} active policies on this account.</p>

        <Button
          variant="danger"
          full
          className="mt-6"
          onClick={() => {
            logout();
            navigate({ to: "/welcome" });
          }}
        >
          <LogOut size={16} /> Log Out
        </Button>
        <Logo size={28} className="mx-auto mt-8" />
        <p className="mt-3 text-center text-xs text-dim">App version 1.0.0</p>
      </div>
    </Screen>
  );
}
