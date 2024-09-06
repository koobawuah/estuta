import { User } from "@/types/user.type";

export const users: User[] = [
  {
    id: "1",
    name: "John Mensah",
    email: "admin@admin.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "j.smith@admin.com",
    role: "student",
  },
  {
    id: "3",
    name: "Cynthia Amoh",
    email: "c.amoh@admin.com",
    role: "student",
  },
  {
    id: "4",
    name: "Samuel Aryee",
    email: "s.aryee@admin.com",
    role: "tutor",
  },
  {
    id: "5",
    name: "Victor Koomson",
    email: "v.koomson@admin.com",
    role: "tutor",
  },
  {
    id: "6",
    name: "Kofi B",
    email: "a@admin.com",
    role: "student",
  },
];

export async function getUserById(id: User["id"]) {
  return users.find((u) => u.id === id);
}

export async function verifyLogin(email: User["email"]) {
  return users.find((u) => u.email === email);
}
