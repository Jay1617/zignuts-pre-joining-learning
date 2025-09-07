'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectMergedUsers,
  removeUser,
  toggleLike,
  startEdit,
  stopEdit,
  saveEdit,
} from '@/store/usersSlice';
import UserCard from '@/components/UserCard';
import EditModal from '@/components/EditModal';

const fetchUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

export default function Page() {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const mergedUsers = useAppSelector((state) =>
    selectMergedUsers(state, data ?? [])
  );

  const [editId, setEditId] = useState<number | null>(null);
  const editingUser = useMemo(
    () => mergedUsers.find((u) => u.id === editId) ?? null,
    [mergedUsers, editId]
  );

  if (isLoading) return <div className="p-6">Loading users…</div>;
  if (isError)
    return (
      <div className="p-6 text-red-600">Error: {(error as Error).message}</div>
    );

  return (
    <main className="mx-auto max-w-7xl p-6">
      <header className="mb-6 flex items-baseline gap-2">
        <h1 className="text-2xl font-bold">Users</h1>
        <span className="text-gray-500">({mergedUsers.length})</span>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mergedUsers.map((u) => (
          <UserCard
            key={u.id}
            user={u}
            onLike={() => dispatch(toggleLike(u.id))}
            onEdit={() => {
              dispatch(startEdit(u.id));
              setEditId(u.id);
            }}
            onRemove={() => dispatch(removeUser(u.id))}
          />
        ))}
      </section>

      <EditModal
        isOpen={!!editingUser}
        user={editingUser}
        onClose={() => {
          dispatch(stopEdit());
          setEditId(null);
        }}
        onSave={(payload) => {
          dispatch(saveEdit(payload));
          setEditId(null);
        }}
      />
    </main>
  );
}
