import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Profile - PT Mega Kreasi Tech");
    }

    async getHtml() {
        const user = AuthService.getUser();
        const savedPhoto = localStorage.getItem('user_profile_photo') || null;

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
                         <span class="material-icons-round avatar">account_circle</span>
                    </div>
                 </div>
            </div>

            <div class="container" style="background: #F5F5F5;">
                 <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Profile</h2>
                </div>
                
                <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 40px;">
                    <div class="profile-photo-wrapper">
                        ${savedPhoto
                ? `<img src="${savedPhoto}" class="profile-img" id="profile-display-img">`
                : `<span class="material-icons-round profile-img" id="profile-display-icon" style="font-size: 8rem; color: #1a1a1a; display: flex; align-items: center; justify-content: center;">account_circle</span>`
            }
                        <div class="edit-photo-btn" id="btn-edit-photo">
                            <span class="material-icons-round" style="font-size: 1.2rem;">camera_alt</span>
                        </div>
                    </div>
                    <h2 style="font-size: 1.1rem; color: #555; font-weight: 500; margin-top: 10px;">${user.name}</h2>
                </div>

                <div style="display: grid; grid-template-columns: 100px 1fr; row-gap: 15px; font-size: 0.95rem; color: #333;">
                    <div>Jabatan</div>
                    <div style="font-weight: 400;">: ${user.role}</div>
                    <div>Divisi</div>
                    <div style="font-weight: 400;">: ${user.division}</div>
                    <div>ID</div>
                    <div style="font-weight: 400;">: ${user.employeeId}</div>
                    <div>No.Telfon</div>
                    <div style="font-weight: 400;">: 08161190241</div>
                    <div>Email</div>
                    <div style="font-weight: 400;">: ${user.email}</div>
                    <div>Alamat</div>
                    <div style="font-weight: 400;">: Jl. Bango III Pondok Labu</div>
                    <div>Office</div>
                    <div style="font-weight: 400;">: Jl. Lebak Bulus 1 No.1 Cilandak</div>
                </div>

                 <div class="footer" style="padding-top: 40px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>

            <!-- Profile Action Sheet -->
            <div class="action-sheet-overlay" id="action-sheet-overlay">
                <div class="action-sheet">
                    <div class="action-header">
                        <h3>Update Foto Profil</h3>
                    </div>
                    <div class="action-options">
                        <div class="action-item" id="opt-camera">
                            <span class="material-icons-round icon">photo_camera</span>
                            <span class="label">Ambil dari Kamera</span>
                        </div>
                        <div class="action-item" id="opt-gallery">
                            <span class="material-icons-round icon">collections</span>
                            <span class="label">Pilih dari Galeri</span>
                        </div>
                    </div>
                    <div class="action-close" id="btn-close-sheet">Batal</div>
                </div>
            </div>

            <!-- Camera Modal -->
            <div class="profile-cam-modal" id="profile-cam-modal">
                <div class="profile-cam-header">
                    <span class="material-icons-round" id="btn-close-cam" style="cursor: pointer;">close</span>
                    <span style="font-weight: 500;">Kamera Profil</span>
                    <span class="material-icons-round" id="btn-switch-profile-cam" style="cursor: pointer;">flip_camera_ios</span>
                </div>
                <div class="profile-cam-view">
                    <video id="profile-video" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
                </div>
                <div class="profile-cam-controls">
                    <button class="btn-capture" id="btn-capture-profile"></button>
                </div>
                <canvas id="profile-canvas" style="display: none;"></canvas>
            </div>

            <!-- Hidden File Input -->
            <input type="file" id="file-input-profile" accept="image/*" style="display: none;">
        `;
    }

    execute() {
        const editBtn = document.getElementById('btn-edit-photo');
        const overlay = document.getElementById('action-sheet-overlay');
        const closeSheetBtn = document.getElementById('btn-close-sheet');
        const optCamera = document.getElementById('opt-camera');
        const optGallery = document.getElementById('opt-gallery');
        const fileInput = document.getElementById('file-input-profile');

        const camModal = document.getElementById('profile-cam-modal');
        const closeCamBtn = document.getElementById('btn-close-cam');
        const captureBtn = document.getElementById('btn-capture-profile');
        const video = document.getElementById('profile-video');
        const switchCamBtn = document.getElementById('btn-switch-profile-cam');

        let currentStream = null;
        let currentFacingMode = "user";

        // 1. Action Sheet Logic
        if (editBtn) {
            editBtn.addEventListener('click', () => overlay.classList.add('active'));
        }

        const closeSheet = () => overlay.classList.remove('active');
        if (closeSheetBtn) closeSheetBtn.addEventListener('click', closeSheet);
        if (overlay) overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeSheet();
        });

        // 2. Photo Update Handler
        const updateProfileImg = (base64) => {
            localStorage.setItem('user_profile_photo', base64);
            // Refresh current view (simple way for SPA)
            const wrapper = document.querySelector('.profile-photo-wrapper');
            const editBtnHtml = wrapper.querySelector('.edit-photo-btn').outerHTML;
            wrapper.innerHTML = `
                <img src="${base64}" class="profile-img" id="profile-display-img">
                ${editBtnHtml}
            `;
            // Re-attach listener to the new edit button
            document.getElementById('btn-edit-photo').addEventListener('click', () => overlay.classList.add('active'));
            closeSheet();
        };

        // 3. Gallery Option
        if (optGallery) {
            optGallery.addEventListener('click', () => {
                fileInput.click();
            });
        }

        if (fileInput) {
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => updateProfileImg(event.target.result);
                    reader.readAsDataURL(file);
                }
            });
        }

        // 4. Camera Option
        const stopCamera = () => {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
                currentStream = null;
            }
            video.srcObject = null;
        };

        const startCamera = async () => {
            stopCamera();
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: { ideal: currentFacingMode } },
                    audio: false
                });
                currentStream = stream;
                video.srcObject = stream;
                camModal.style.display = 'flex';
            } catch (err) {
                alert('Tidak dapat mengakses kamera');
                console.error(err);
            }
        };

        if (optCamera) {
            optCamera.addEventListener('click', () => {
                closeSheet();
                startCamera();
            });
        }

        if (closeCamBtn) {
            closeCamBtn.addEventListener('click', () => {
                stopCamera();
                camModal.style.display = 'none';
            });
        }

        if (switchCamBtn) {
            switchCamBtn.addEventListener('click', () => {
                currentFacingMode = currentFacingMode === "user" ? "environment" : "user";
                startCamera();
            });
        }

        if (captureBtn) {
            captureBtn.addEventListener('click', () => {
                const canvas = document.getElementById('profile-canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                const base64 = canvas.toDataURL('image/jpeg', 0.8);
                updateProfileImg(base64);
                stopCamera();
                camModal.style.display = 'none';
            });
        }
    }
}
