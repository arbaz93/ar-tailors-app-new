import { create } from 'zustand';

// export const useNotificationStore = create((set, get) => ({
//   notifications: [],

//   // Notifications template...
//   // timestamp is added automatically
//   // setNotifications({ message: `some message`, type: 'error || success' });
//   setNotifications: (newNotification) => {
//     const n = {...newNotification, timestamp: Date.now()}
//     set((state) => ({
//       notifications: [...state.notifications, n]
//     }));

//     // Schedule removal of this notification after 5 seconds
//     setTimeout(() => {
//       set((state) => ({
//         notifications: state.notifications.filter(
//           (notif) => notif.timestamp !== n.timestamp
//         )
//       }));
//     }, 5000); // 5 seconds
//   },
// }));

// export const useColorSchemeStore = create((set) => ({
//   colorScheme: localStorage.getItem('imageerColorScheme') || 'light',

//   setColorScheme: (newColor) => {
//     if(newColor) {
//       set({colorScheme: newColor})
//       return;
//     }
//     set(state => ({ colorScheme: (state.colorScheme === 'dark' ? 'light' : 'dark') }))
//   }
// }))


export const useLoginStore = create((set) => ({
  loginInfo: {
    username: "",
    password: "",
    status: "",
    statusMessage: "",
  },

  setLoginInfo: (fnOrObject) =>
    set((state) => ({
      loginInfo:
        typeof fnOrObject === "function"
          ? fnOrObject(state.loginInfo)
          : fnOrObject,
    })),
}));