import { userService } from "@/services/user.service";

export default async function AdminUsersPage() {
  const users = await userService.getUsers();

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold">Users Management</h1>
      {users.map((u) => (
        <div key={u.id} className="rounded-xl border bg-white p-3">
          <p>{u.name}</p>
          <p className="text-xs text-zinc-500">{u.email} | {u.role}</p>
        </div>
      ))}
    </div>
  );
}
