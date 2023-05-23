// Copyright (C) 2022-present Daniel31x13 <daniel31x13@gmail.com>
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, version 3.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.

import { create } from "zustand";
import { User } from "@prisma/client";
import { AccountSettings } from "@/types/global";

type AccountStore = {
  account: User;
  setAccount: (email: string) => void;
  updateAccount: (user: AccountSettings) => Promise<boolean>;
};

const useAccountStore = create<AccountStore>()((set) => ({
  account: {} as User,
  setAccount: async (email) => {
    const response = await fetch(`/api/routes/users?email=${email}`);

    const data = await response.json();

    console.log(data);

    if (response.ok) set({ account: { ...data.response } });
  },
  updateAccount: async (user) => {
    const response = await fetch("/api/routes/users", {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) set({ account: data.response });

    return response.ok;
  },
}));

export default useAccountStore;