import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";
import { ScheduleAPI } from "../services/ScheduleAPI.js"; // Note: I named it ScheduleService.js but usually services are named like this


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Schedule - PT Mega Kreasi Tech");
        this.currentDate = new Date();

        // Daftar Libur Nasional Indonesia 2026 (Estimasi)
        this.holidays2026 = {
            0: { 1: "Tahun Baru 2026", 19: "Isra Mikraj" },
            1: { 17: "Tahun Baru Imlek" },
            2: { 19: "Hari Suci Nyepi", 20: "Hari Raya Idul Fitri", 21: "Hari Raya Idul Fitri" },
            3: { 3: "Wafat Isa Almasih" },
            4: { 1: "Hari Buruh", 14: "Kenaikan Isa Almasih", 31: "Hari Raya Waisak" },
            5: { 1: "Hari Lahir Pancasila", 27: "Hari Raya Idul Adha" },
            6: { 17: "Tahun Baru Islam" },
            7: { 17: "Hari Kemerdekaan RI" },
            8: { 25: "Maulid Nabi Muhammad SAW" },
            11: { 25: "Hari Raya Natal" }
        };
    }

    async getHtml() {
        const user = AuthService.getUser();
        const savedPhoto = localStorage.getItem('user_profile_photo') || null;

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        return `
            <div class="header">
                 <div class="header-content">
                     <div class="logo-section">
                        <div class="logo-box">M</div>
                        <span class="company-name">PT Mega Kreasi Tech</span>
                    </div>
                     <div class="user-profile">
                        <div class="user-info">
                            <h4>${user.name}</h4>
                            <p>${user.role}</p>
                        </div>
                        <a href="/profile" data-link style="text-decoration: none; color: inherit; display: flex;">
                             ${savedPhoto
                ? `<img src="${savedPhoto}" class="avatar-img">`
                : `<span class="material-icons-round avatar">account_circle</span>`
            }
                        </a>
                    </div>
                 </div>
            </div>

            <div class="container">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Schedule</h2>
                </div>

                <!-- Dynamic Calendar -->
                <div style="background: white; border-radius: 12px; padding: 15px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px; align-items: center;">
                        <span id="calendar-month-year" style="font-weight: bold; font-size: 1.1rem;">
                            ${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}
                        </span>
                        <div style="display: flex; gap: 10px;">
                            <span id="prev-month" class="material-icons-round" style="font-size: 1.5rem; cursor: pointer; color: #D32F2F;">chevron_left</span>
                            <span id="next-month" class="material-icons-round" style="font-size: 1.5rem; cursor: pointer; color: #D32F2F;">chevron_right</span>
                        </div>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 0.8rem; color: #888; margin-bottom: 10px;">
                        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
                    </div>

                    <div id="calendar-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); row-gap: 5px;">
                        <!-- Days will be injected here -->
                    </div>
                </div>

                <div id="holiday-info" style="margin-top: 15px; background: #FFF3E0; padding: 10px 15px; border-radius: 8px; font-size: 0.8rem; color: #E65100; display: none; align-items: center; gap: 10px;">
                    <span class="material-icons-round" style="font-size: 1.2rem;">event</span>
                    <span id="holiday-text"></span>
                </div>

                <div style="margin-top: 25px; background: white; padding: 15px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                    <h4 style="margin-top: 0; margin-bottom: 15px; font-size: 0.9rem; color: #555;">Keterangan Shift & Jam Kerja</h4>
                    <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                            <span class="shift-badge shift-pagi" style="position: static; width:35px; height:20px; border-radius:4px;">P</span>
                            <span style="flex:1"><b>Pagi</b> : 06:00 - 15:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                            <span class="shift-badge shift-siang" style="position: static; width:35px; height:20px; border-radius:4px;">S</span>
                            <span style="flex:1"><b>Siang</b> : 12:00 - 20:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                            <span class="shift-badge" style="position: static; width:35px; height:20px; border-radius:4px; background: #333; color:white; font-size:0.6rem;">M</span>
                            <span style="flex:1"><b>Malam</b> : 15:00 - 24:00</span>
                        </div>
                         <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                            <span class="shift-badge" style="position: static; width:35px; height:20px; border-radius:4px; background: #FF9800; color:white; font-size:0.6rem;">PH-P</span>
                            <span style="flex:1"><b>PH Pagi</b> : 06:00 - 15:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                            <span class="shift-badge" style="position: static; width:35px; height:20px; border-radius:4px; background: #E91E63; color:white; font-size:0.6rem;">PH-S</span>
                            <span style="flex:1"><b>PH Siang</b> : 12:00 - 20:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                            <span class="shift-badge" style="position: static; width:35px; height:20px; border-radius:4px; background: #673AB7; color:white; font-size:0.6rem;">PH-M</span>
                            <span style="flex:1"><b>PH Malam</b> : 15:00 - 24:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                            <span class="shift-badge" style="position: static; width:35px; height:20px; border-radius:4px; background: #2196F3; color:white; font-size:0.6rem;">NS</span>
                            <span style="flex:1"><b>No Shifting</b> : 11:00 - 20:00</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem;">
                            <span class="shift-badge shift-off" style="position: static; width:35px; height:20px; border-radius:4px;">Off</span>
                            <span style="flex:1"><b>Libur</b> : Off</span>
                        </div>
                    </div>
                </div>

                 <div class="footer" style="padding-top: 30px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }

    execute() {
        const monthYearLabel = document.getElementById('calendar-month-year');
        const prevBtn = document.getElementById('prev-month');
        const nextBtn = document.getElementById('next-month');
        const grid = document.getElementById('calendar-grid');
        const holidayInfo = document.getElementById('holiday-info');
        const holidayText = document.getElementById('holiday-text');

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        let manualEdits = {};

        const loadManualEdits = async () => {
            const res = await ScheduleAPI.getOverrides();
            if (res.success) {
                manualEdits = res.data;
            }
            renderCalendar();
        };

        const renderCalendar = () => {
            grid.innerHTML = '';
            const year = this.currentDate.getFullYear();
            const month = this.currentDate.getMonth();

            monthYearLabel.innerText = `${monthNames[month]} ${year}`;

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            if (this.holidays2026[month]) {
                const holidays = Object.entries(this.holidays2026[month])
                    .map(([day, name]) => `${day} ${monthNames[month]}: ${name}`)
                    .join(', ');
                holidayText.innerText = holidays;
                holidayInfo.style.display = 'flex';
            } else {
                holidayInfo.style.display = 'none';
            }

            for (let i = 0; i < firstDay; i++) {
                grid.appendChild(document.createElement('div'));
            }

            const today = new Date();
            const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

            for (let d = 1; d <= daysInMonth; d++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'calendar-day';

                const numSpan = document.createElement('span');
                numSpan.innerText = d;
                dayEl.appendChild(numSpan);

                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const dayOfWeek = new Date(year, month, d).getDay();
                const isHoliday = this.holidays2026[month] && this.holidays2026[month][d];

                if (isCurrentMonth && d === today.getDate()) {
                    dayEl.style.background = '#FEEBEB';
                    dayEl.style.border = '1px solid #D32F2F';
                    dayEl.style.color = '#D32F2F';
                    dayEl.style.fontWeight = 'bold';
                }

                if (isHoliday) {
                    dayEl.style.color = '#D32F2F';
                    dayEl.title = this.holidays2026[month][d];
                }

                const badge = document.createElement('span');
                badge.className = 'shift-badge';

                // Check for Manual Edit first (Supervisor override)
                if (manualEdits[dateStr]) {
                    badge.innerText = manualEdits[dateStr];
                    if (badge.innerText === 'IZIN' || badge.innerText === 'CUTI') {
                        badge.style.background = '#009688';
                    } else if (badge.innerText === 'OFF') {
                        badge.classList.add('shift-off');
                    } else if (badge.innerText === 'P') {
                        badge.classList.add('shift-pagi');
                    } else if (badge.innerText === 'S') {
                        badge.classList.add('shift-siang');
                    } else {
                        badge.style.background = '#333';
                    }
                    badge.style.color = 'white';
                } else if (isHoliday) {
                    const phPattern = d % 3;
                    if (phPattern === 0) {
                        badge.innerText = 'PH-P';
                        badge.style.background = '#FF9800';
                    } else if (phPattern === 1) {
                        badge.innerText = 'PH-S';
                        badge.style.background = '#E91E63';
                    } else {
                        badge.innerText = 'PH-M';
                        badge.style.background = '#673AB7';
                    }
                    badge.style.color = 'white';
                } else if (dayOfWeek === 0) {
                    badge.innerText = 'Off';
                    badge.classList.add('shift-off');
                } else {
                    const pattern = d % 4;
                    switch (pattern) {
                        case 0: badge.innerText = 'P'; badge.classList.add('shift-pagi'); break;
                        case 1: badge.innerText = 'S'; badge.classList.add('shift-siang'); break;
                        case 2: badge.innerText = 'M'; badge.style.background = '#333'; badge.style.color = 'white'; break;
                        case 3: badge.innerText = 'NS'; badge.style.background = '#2196F3'; badge.style.color = 'white'; break;
                    }
                }

                // Allow "Simulation" of Supervisor editing by clicking the day
                dayEl.onclick = async () => {
                    const user = AuthService.getUser();
                    // Mock check: in real app this would be restricted to supervisor roles
                    const newShift = prompt(`Change shift for ${dateStr}?\n(Options: P, S, M, NS, PH-P, PH-S, PH-M, OFF, IZIN, CUTI)`, badge.innerText);
                    if (newShift !== null) {
                        const res = await ScheduleAPI.updateOverride(dateStr, newShift.toUpperCase());
                        if (res.success) {
                            manualEdits = res.data; // Update local state with new overrides
                            renderCalendar();
                        } else {
                            alert('Failed to update schedule on server.');
                        }
                    }
                };

                dayEl.appendChild(badge);
                grid.appendChild(dayEl);
            }
        };

        if (prevBtn) prevBtn.onclick = () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            renderCalendar();
        };

        if (nextBtn) nextBtn.onclick = () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            renderCalendar();
        };

        loadManualEdits();
    }
}
