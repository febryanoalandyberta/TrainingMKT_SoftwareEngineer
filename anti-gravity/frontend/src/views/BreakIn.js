import AbstractView from "./AbstractView.js";
import { AttendanceAPI } from "../services/AttendanceService.js";
import { AuthService } from "../services/AuthService.js";


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Break In - PT Mega Kreasi Tech");
    }

    async getHtml() {
        const user = AuthService.getUser();
        const savedPhoto = localStorage.getItem('user_profile_photo') || null;

        return `
            <style>
                .slider-handle {
                    width: 52px; height: 52px; background: #2196F3; border-radius: 50%;
                    position: absolute; top: 3px; left: 3px; z-index: 100;
                    display: flex; align-items: center; justify-content: center;
                    color: white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                }
                .slider-container {
                    position: relative; height: 60px; border-radius: 30px;
                    background: rgba(200,200,200,0.2); border: 1px solid rgba(255,255,255,0.1);
                    margin-top: 20px;
                }
                .slider-text {
                    position: absolute; width: 100%; height: 100%; display: flex;
                    align-items: center; justify-content: center; font-weight: 500;
                    pointer-events: none; transition: opacity 0.1s;
                }
            </style>
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
                    <h2 style="font-size: 1.3rem; margin: 0;">Break In</h2>
                </div>

                <div class="clock-display">
                    <div class="time-big" id="live-clock">--:--:--</div>
                </div>

                <div class="camera-frame">
                    <!-- Live Camera Video -->
                    <video id="camera-stream" autoplay playsinline muted style="width: 100%; height: 100%; object-fit: cover; background: #000;"></video>
                    <canvas id="captured-photo" style="display: none;"></canvas>
                    
                    <!-- Switch Camera Button -->
                    <button class="btn-switch-cam" id="btn-switch-camera">
                        <span class="material-icons-round">flip_camera_ios</span>
                    </button>
                    
                    <div class="camera-overlay">
                        <div id="overlay-time">Loading time...</div>
                        <div id="overlay-location">Lokasi: Mencari Koordinat...</div>
                    </div>
                </div>

                <!-- Slider Button -->
                <div class="slider-container" id="slider-container">
                    <div class="slider-text">Geser ke kanan untuk Istirahat</div>
                    <div class="slider-handle" id="slider-handle">
                        <span class="material-icons-round">chevron_right</span>
                    </div>
                </div>
            </div>

             <div class="footer">
                <span>PT Mega Kreasi Tech</span>
                <span>Since 2016</span>
            </div>
        `;
    }

    execute() {
        // Elements
        const clockEl = document.getElementById('live-clock');
        const overlayTimeEl = document.getElementById('overlay-time');
        const locationEl = document.getElementById('overlay-location');
        const video = document.getElementById('camera-stream');
        const switchBtn = document.getElementById('btn-switch-camera');
        const sliderContainer = document.getElementById('slider-container');
        const sliderHandle = document.getElementById('slider-handle');

        let currentFacingMode = "user";
        let currentStream = null;

        // 1. Clock
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-GB', { hour12: false });
            if (clockEl) clockEl.innerText = timeString;
            if (overlayTimeEl) overlayTimeEl.innerText = `${timeString}`;
        };
        setInterval(updateClock, 1000);
        updateClock();

        // 2. Camera
        const startCamera = async (facingMode) => {
            if (currentStream) {
                currentStream.getTracks().forEach(t => t.stop());
                video.srcObject = null;
            }
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                if (locationEl) locationEl.innerHTML = `<span style="color:red">HTTPS Required</span>`;
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: facingMode } },
                    audio: false
                });
                currentStream = stream;
                video.srcObject = stream;
                video.play().catch(console.error);
                if (locationEl && locationEl.innerText.includes("Error")) locationEl.innerText = "Lokasi: Mencari Koordinat...";
            } catch (err) {
                console.error("Camera:", err);
                if (locationEl) locationEl.innerHTML = `<span style="color:red">Kamera Error</span>`;
            }
        };
        startCamera(currentFacingMode);

        if (switchBtn) {
            switchBtn.onclick = () => {
                currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
                startCamera(currentFacingMode);
            };
        }

        // 3. Location
        if ("geolocation" in navigator) {
            navigator.geolocation.watchPosition(
                pos => {
                    if (locationEl) locationEl.innerText = `Lokasi: ${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
                },
                err => {
                    if (locationEl) locationEl.innerText = "Lokasi: Izin Ditolak";
                },
                { enableHighAccuracy: true }
            );
        }

        // 4. ROBUST SLIDER LOGIC
        if (sliderHandle && sliderContainer) {
            let isDragging = false;
            let startX = 0;
            let maxSlide = 0;

            const getWidths = () => {
                const cw = sliderContainer.clientWidth || sliderContainer.getBoundingClientRect().width;
                const hw = sliderHandle.clientWidth || sliderHandle.getBoundingClientRect().width;
                return cw - hw - 6; // 6px padding
            };

            const onStart = (e) => {
                if (sliderContainer.classList.contains('loading')) return;
                isDragging = true;
                startX = (e.touches ? e.touches[0].clientX : e.clientX);
                maxSlide = getWidths(); // Re-calculate on every start
            };

            const onMove = (e) => {
                if (!isDragging) return;
                // e.preventDefault(); // Stop scroll if desired, but user might need scroll

                const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
                const diff = clientX - startX;

                if (maxSlide <= 0) maxSlide = getWidths(); // Try again

                let val = Math.max(0, Math.min(diff, maxSlide));
                sliderHandle.style.transform = `translateX(${val}px)`;

                // Fade text
                const ratio = maxSlide > 0 ? val / maxSlide : 0;
                const text = sliderContainer.querySelector('.slider-text');
                if (text) text.style.opacity = 1 - ratio;
            };

            const onEnd = async () => {
                if (!isDragging) return;
                isDragging = false;

                // Read current position from style
                const styleT = sliderHandle.style.transform;
                const match = styleT.match(/translateX\((.*)px\)/);
                const currentVal = match ? parseFloat(match[1]) : 0;

                // Threshold 50% for easier activation
                if (maxSlide > 0 && currentVal > (maxSlide * 0.5)) {
                    // Snap to end
                    sliderHandle.style.transform = `translateX(${maxSlide}px)`;
                    await performSubmit();
                } else {
                    // Snap back
                    sliderHandle.style.transform = `translateX(0px)`;
                    const text = sliderContainer.querySelector('.slider-text');
                    if (text) text.style.opacity = 1;
                }
            };

            // Mouse
            sliderHandle.addEventListener('mousedown', onStart);
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onEnd);

            // Touch
            sliderHandle.addEventListener('touchstart', onStart, { passive: true });
            window.addEventListener('touchmove', onMove, { passive: false });
            window.addEventListener('touchend', onEnd);
        }

        const performSubmit = async () => {
            // Check Camera
            if (!video.videoWidth) {
                if (!confirm("Kamera mati. Lanjut absen tanpa foto?")) {
                    resetSliderUI();
                    return;
                }
            }

            sliderContainer.classList.add('loading');

            try {
                // Capture Code
                const canvas = document.getElementById('captured-photo');
                const context = canvas.getContext('2d');
                let photoBase64 = null;

                if (video.videoWidth > 0 && video.videoHeight > 0) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    photoBase64 = canvas.toDataURL('image/jpeg', 0.7);
                } else {
                    canvas.width = 640; canvas.height = 480;
                    context.fillStyle = "#000"; context.fillRect(0, 0, 640, 480);
                    context.fillStyle = "#fff"; context.fillText("NO CAMERA", 320, 240);
                    photoBase64 = canvas.toDataURL('image/jpeg', 0.7);
                }

                const user = AuthService.getUser();
                const data = {
                    user: {
                        name: user.name,
                        employeeId: user.employeeId,
                        position: user.role,
                        division: user.division,
                        role: `${user.role} - ${user.division}`
                    },
                    timestamp: (() => {
                        const now = new Date();
                        const d = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/,/g, '');
                        const t = now.toLocaleTimeString('en-GB', { hour12: false });
                        return `${d} ${t}`;
                    })(),
                    location: locationEl.innerText.replace('Lokasi: ', ''),
                    photo: photoBase64
                };

                const response = await AttendanceAPI.submit('Mulai Istirahat', data);

                if (response.success) {
                    sliderContainer.classList.remove('loading');
                    sliderContainer.classList.add('success');
                    setTimeout(() => {
                        alert('✅ Berhasil Mulai Istirahat!');
                        window.history.back();
                    }, 500);
                } else {
                    throw new Error(response.error || 'Failed');
                }
            } catch (e) {
                console.error(e);
                alert("Gagal Absen: " + e.message);
                resetSliderUI();
            }
        };

        const resetSliderUI = () => {
            sliderHandle.style.transform = `translateX(0px)`;
            const text = sliderContainer.querySelector('.slider-text');
            if (text) text.style.opacity = 1;
            sliderContainer.classList.remove('loading');
            sliderContainer.classList.remove('success');
        };
    }
}
