import Login from './views/Login.js';
import Home from './views/Home.js';
import Landing from './views/Landing.js';
import SignUp from './views/SignUp.js';
import ForgotPassword from './views/ForgotPassword.js';
import Attendance from './views/Attendance.js'; // Absen In
import AbsenOut from './views/AbsenOut.js';
import BreakIn from './views/BreakIn.js';
import BreakOut from './views/BreakOut.js';
import Task from './views/Task.js';
import Schedule from './views/Schedule.js';
import Support from './views/Support.js';
import Profile from './views/Profile.js';
import Settings from './views/Settings.js';
import UbahKataSandi from './views/UbahKataSandi.js';
import Kalibrasi from './views/Kalibrasi.js';
import Bahasa from './views/Bahasa.js';
import Notifikasi from './views/Notifikasi.js';
import Izin from './views/Izin.js';
import IzinCuti from './views/IzinCuti.js';

const routes = [
    { path: '/', view: Landing },
    { path: '/login', view: Login },
    { path: '/signup', view: SignUp },
    { path: '/forgot-password', view: ForgotPassword },
    { path: '/home', view: Home }, // Main authenticated home
    { path: '/attendance', view: Attendance }, // Absen In
    { path: '/absen-out', view: AbsenOut },
    { path: '/break-in', view: BreakIn },
    { path: '/break-out', view: BreakOut },
    { path: '/tasks', view: Task },
    { path: '/schedule', view: Schedule },
    { path: '/support', view: Support },
    { path: '/profile', view: Profile },
    { path: '/settings', view: Settings },
    { path: '/change-password', view: UbahKataSandi },
    { path: '/calibration', view: Kalibrasi },
    { path: '/language', view: Bahasa },
    { path: '/notifications', view: Notifikasi },
    { path: '/permission', view: Izin },
    { path: '/leave', view: IzinCuti }
];

export const router = async () => {
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    const view = new match.route.view();
    const app = document.querySelector("#app");
    app.innerHTML = await view.getHtml();

    // Allow views to execute scripts
    if (view.execute) view.execute();

    // Scroll to top
    window.scrollTo(0, 0);
};
