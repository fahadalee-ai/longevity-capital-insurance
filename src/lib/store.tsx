import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { clearStorage, loadJson, readStorage, saveJson, writeStorage } from "./storage";
import {
  DEFAULT_PREFS,
  nextId,
  seedAppointments,
  seedClaims,
  seedDocuments,
  seedMessages,
  seedNotifications,
  seedPaymentMethods,
  seedPayments,
  seedPolicies,
  seedQuotes,
  seedUsers,
  todayIso,
  type Appointment,
  type AppDocument,
  type AppNotification,
  type ChatMessage,
  type Claim,
  type NotifPrefs,
  type Payment,
  type PaymentMethod,
  type Policy,
  type ProductSlug,
  type Quote,
  type User,
} from "./mock-data";

export type Toast = { id: number; title: string; body?: string };

export type QuoteDraft = {
  product: ProductSlug | "";
  personal: Record<string, string>;
  details: Record<string, string>;
  docs: string[];
};

const EMPTY_DRAFT: QuoteDraft = { product: "", personal: {}, details: {}, docs: [] };

type Store = {
  users: User[];
  user: User | null;
  guest: boolean;
  onboarded: boolean;
  markOnboarded: () => void;
  enterGuest: () => void;
  login: (email: string, password: string) => { ok: true } | { ok: false; reason: "invalid" };
  register: (input: { fullName: string; email: string; phone: string; password: string }) =>
    | { ok: true; email: string; phone: string }
    | { ok: false; reason: "exists" };
  completePendingAuth: () => void;
  pendingContact: string | null;
  setPendingContact: (v: string | null) => void;
  logout: () => void;
  updateUser: (patch: Partial<User>) => void;
  policies: Policy[];
  toggleReminder: (id: string) => void;
  toggleAutopay: (id: string) => void;
  quotes: Quote[];
  quoteDraft: QuoteDraft;
  setQuoteDraft: (patch: Partial<QuoteDraft>) => void;
  resetQuoteDraft: () => void;
  submitQuote: () => Quote;
  updateQuote: (id: string, patch: Partial<Quote>) => void;
  claims: Claim[];
  submitClaim: (input: Omit<Claim, "id" | "reference" | "submittedAt" | "status" | "notes">) => Claim;
  appointments: Appointment[];
  bookAppointment: (input: Omit<Appointment, "id" | "status">) => Appointment;
  updateAppointment: (id: string, patch: Partial<Appointment>) => void;
  documents: AppDocument[];
  addDocument: (doc: Omit<AppDocument, "id" | "addedAt">) => void;
  messages: ChatMessage[];
  sendMessage: (text: string, attachment?: string) => void;
  unreadMessages: number;
  notifications: AppNotification[];
  markAllRead: () => void;
  markNotificationRead: (id: string) => void;
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, "id">) => void;
  removePaymentMethod: (id: string) => void;
  setDefaultMethod: (id: string) => void;
  payments: Payment[];
  makePayment: (policyId: string, amount: number, product: ProductSlug) => Payment;
  prefs: NotifPrefs;
  togglePref: (key: keyof NotifPrefs) => void;
  referralCode: string;
  referralsSent: number;
  referralsConverted: number;
  sendReferral: () => void;
  toasts: Toast[];
  pushToast: (title: string, body?: string) => void;
  dismissToast: (id: number) => void;
};

const Ctx = createContext<Store | null>(null);

function loadSessionUser(users: User[]): User | null {
  const id = readStorage("session");
  if (!id) return null;
  return users.find((u) => u.id === id) ?? null;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(() => loadJson("users", seedUsers));
  const [user, setUser] = useState<User | null>(() => loadSessionUser(loadJson("users", seedUsers)));
  const [guest, setGuest] = useState(() => readStorage("guest") === "1" && !readStorage("session"));
  const [onboarded, setOnboarded] = useState(() => readStorage("onboarded") === "1");
  const [pendingContact, setPendingContact] = useState<string | null>(() => readStorage("pending"));
  const [policies, setPolicies] = useState<Policy[]>(() => loadJson("policies", seedPolicies));
  const [quotes, setQuotes] = useState<Quote[]>(() => loadJson("quotes", seedQuotes));
  const [quoteDraft, setDraft] = useState<QuoteDraft>(EMPTY_DRAFT);
  const [claims, setClaims] = useState<Claim[]>(() => loadJson("claims", seedClaims));
  const [appointments, setAppointments] = useState<Appointment[]>(() => loadJson("appointments", seedAppointments));
  const [documents, setDocuments] = useState<AppDocument[]>(() => loadJson("documents", seedDocuments));
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadJson("messages", seedMessages));
  const [notifications, setNotifications] = useState<AppNotification[]>(() =>
    loadJson("notifications", seedNotifications),
  );
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() =>
    loadJson("methods", seedPaymentMethods),
  );
  const [payments, setPayments] = useState<Payment[]>(() => loadJson("payments", seedPayments));
  const [prefs, setPrefs] = useState<NotifPrefs>(() => loadJson("prefs", DEFAULT_PREFS));
  const [referralsSent, setReferralsSent] = useState(() => Number(readStorage("refSent") ?? "3"));
  const [referralsConverted, setReferralsConverted] = useState(() => Number(readStorage("refConv") ?? "1"));
  const [toasts, setToasts] = useState<Toast[]>([]);

  const persistUsers = (next: User[]) => {
    setUsers(next);
    saveJson("users", next);
  };

  const value = useMemo<Store>(() => {
    const pushToast = (title: string, body?: string) => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, title, body }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
    };

    return {
      users,
      user,
      guest,
      onboarded,
      markOnboarded: () => {
        setOnboarded(true);
        writeStorage("onboarded", "1");
      },
      enterGuest: () => {
        setGuest(true);
        setUser(null);
        clearStorage("session");
        writeStorage("guest", "1");
        writeStorage("onboarded", "1");
        setOnboarded(true);
      },
      login: (email, password) => {
        const found =
          users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password) ??
          users[0] ??
          null;
        if (!found) return { ok: false, reason: "invalid" };
        setUser(found);
        setGuest(false);
        writeStorage("session", found.id);
        clearStorage("guest");
        writeStorage("onboarded", "1");
        setOnboarded(true);
        return { ok: true };
      },
      register: (input) => {
        if (users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
          return { ok: false, reason: "exists" };
        }
        const parts = input.fullName.trim().split(/\s+/);
        const firstName = parts[0] ?? "Member";
        const lastName = parts.slice(1).join(" ") || "Customer";
        const created: User = {
          id: nextId("u"),
          firstName,
          lastName,
          email: input.email.trim().toLowerCase(),
          phone: input.phone.trim(),
          password: input.password,
          dob: "",
          address: "",
          memberSince: todayIso(),
          language: "en",
          twoFactor: false,
          household: [],
        };
        persistUsers([...users, created]);
        writeStorage("pendingUser", created.id);
        writeStorage("pending", created.phone);
        setPendingContact(created.phone);
        writeStorage("onboarded", "1");
        setOnboarded(true);
        return { ok: true, email: created.email, phone: created.phone };
      },
      completePendingAuth: () => {
        const pendingId = readStorage("pendingUser");
        const found = users.find((u) => u.id === pendingId) ?? users[users.length - 1];
        if (found) {
          setUser(found);
          setGuest(false);
          writeStorage("session", found.id);
          clearStorage("guest");
        }
        clearStorage("pendingUser");
        clearStorage("pending");
        setPendingContact(null);
      },
      pendingContact,
      setPendingContact: (v) => {
        setPendingContact(v);
        if (v) writeStorage("pending", v);
        else clearStorage("pending");
      },
      logout: () => {
        setUser(null);
        setGuest(false);
        clearStorage("session");
        clearStorage("guest");
      },
      updateUser: (patch) => {
        if (!user) return;
        const next = { ...user, ...patch };
        setUser(next);
        persistUsers(users.map((u) => (u.id === next.id ? next : u)));
      },
      policies,
      toggleReminder: (id) => {
        const next = policies.map((p) => (p.id === id ? { ...p, reminder: !p.reminder } : p));
        setPolicies(next);
        saveJson("policies", next);
        pushToast("Renewal reminder updated");
      },
      toggleAutopay: (id) => {
        const next = policies.map((p) => (p.id === id ? { ...p, autopay: !p.autopay } : p));
        setPolicies(next);
        saveJson("policies", next);
        pushToast("Autopay updated");
      },
      quotes,
      quoteDraft,
      setQuoteDraft: (patch) => setDraft((d) => ({ ...d, ...patch })),
      resetQuoteDraft: () => setDraft(EMPTY_DRAFT),
      submitQuote: () => {
        const created: Quote = {
          id: nextId("q"),
          product: (quoteDraft.product || "auto") as ProductSlug,
          submittedAt: todayIso(),
          status: "Pending Review",
          step: 0,
          personal: quoteDraft.personal,
          details: quoteDraft.details,
          docs: quoteDraft.docs,
        };
        const next = [created, ...quotes];
        setQuotes(next);
        saveJson("quotes", next);
        setDraft(EMPTY_DRAFT);
        pushToast("Quote request submitted");
        return created;
      },
      updateQuote: (id, patch) => {
        const next = quotes.map((q) => (q.id === id ? { ...q, ...patch } : q));
        setQuotes(next);
        saveJson("quotes", next);
      },
      claims,
      submitClaim: (input) => {
        const created: Claim = {
          ...input,
          id: nextId("cl"),
          reference: `CLM-${Math.floor(10000 + Math.random() * 90000)}`,
          submittedAt: todayIso(),
          status: "Submitted",
          notes: [],
        };
        const next = [created, ...claims];
        setClaims(next);
        saveJson("claims", next);
        pushToast("Claim submitted", created.reference);
        return created;
      },
      appointments,
      bookAppointment: (input) => {
        const created: Appointment = { ...input, id: nextId("ap"), status: "Upcoming" };
        const next = [created, ...appointments];
        setAppointments(next);
        saveJson("appointments", next);
        pushToast("Appointment confirmed");
        return created;
      },
      updateAppointment: (id, patch) => {
        const next = appointments.map((a) => (a.id === id ? { ...a, ...patch } : a));
        setAppointments(next);
        saveJson("appointments", next);
      },
      documents,
      addDocument: (doc) => {
        const nextDoc: AppDocument = { ...doc, id: nextId("d"), addedAt: todayIso() };
        const next = [nextDoc, ...documents];
        setDocuments(next);
        saveJson("documents", next);
        pushToast("Document uploaded");
      },
      messages,
      sendMessage: (text, attachment) => {
        const yours: ChatMessage = {
          id: nextId("m"),
          from: "you",
          text,
          time: "Just now",
          attachment,
        };
        const reply: ChatMessage = {
          id: nextId("m"),
          from: "agent",
          text: "Thanks — I’ll review this and follow up shortly during business hours.",
          time: "Just now",
        };
        const next = [...messages, yours, reply];
        setMessages(next);
        saveJson("messages", next);
      },
      unreadMessages: 1,
      notifications,
      markAllRead: () => {
        const next = notifications.map((n) => ({ ...n, read: true }));
        setNotifications(next);
        saveJson("notifications", next);
      },
      markNotificationRead: (id) => {
        const next = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
        setNotifications(next);
        saveJson("notifications", next);
      },
      paymentMethods,
      addPaymentMethod: (method) => {
        const next = [...paymentMethods, { ...method, id: nextId("pm") }];
        setPaymentMethods(next);
        saveJson("methods", next);
        pushToast("Payment method added");
      },
      removePaymentMethod: (id) => {
        const next = paymentMethods.filter((m) => m.id !== id);
        setPaymentMethods(next);
        saveJson("methods", next);
      },
      setDefaultMethod: (id) => {
        const next = paymentMethods.map((m) => ({ ...m, default: m.id === id }));
        setPaymentMethods(next);
        saveJson("methods", next);
      },
      payments,
      makePayment: (policyId, amount, product) => {
        const created: Payment = {
          id: nextId("pay"),
          date: todayIso(),
          policyId,
          product,
          amount,
          status: "Paid",
        };
        const next = [created, ...payments];
        setPayments(next);
        saveJson("payments", next);
        pushToast("Payment successful");
        return created;
      },
      prefs,
      togglePref: (key) => {
        const next = { ...prefs, [key]: !prefs[key] };
        setPrefs(next);
        saveJson("prefs", next);
      },
      referralCode: user ? `${user.firstName.toUpperCase()}-LCI` : "GUEST-LCI",
      referralsSent,
      referralsConverted,
      sendReferral: () => {
        const next = referralsSent + 1;
        setReferralsSent(next);
        writeStorage("refSent", String(next));
        if (next % 3 === 0) {
          const conv = referralsConverted + 1;
          setReferralsConverted(conv);
          writeStorage("refConv", String(conv));
        }
        pushToast("Referral invite sent");
      },
      toasts,
      pushToast,
      dismissToast: (id) => setToasts((t) => t.filter((x) => x.id !== id)),
    };
  }, [
    users,
    user,
    guest,
    onboarded,
    pendingContact,
    policies,
    quotes,
    quoteDraft,
    claims,
    appointments,
    documents,
    messages,
    notifications,
    paymentMethods,
    payments,
    prefs,
    referralsSent,
    referralsConverted,
    toasts,
  ]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
