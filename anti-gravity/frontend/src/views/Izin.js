import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";
import { AttendanceAPI } from "../services/AttendanceService.js";


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Izin - PT Mega Kreasi Tech");
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
                        <a href="/profile" data-link style="text-decoration: none; color: inherit; display: flex;">
                             ${savedPhoto
                ? `<img src="${savedPhoto}" class="avatar-img">`
                : `<span class="material-icons-round avatar">account_circle</span>`
            }
                        </a>
                    </div>
                 </div>
            </div>

            <div class="container" style="background: #F5F5F5;">
                 <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <a href="/home" class="nav-back" style="margin-bottom: 0px; margin-right: 15px; color: inherit; text-decoration: none;" data-link>
                        <span class="material-icons-round">arrow_back</span>
                    </a>
                    <h2 style="font-size: 1.3rem; margin: 0;">Form Izin</h2>
                </div>

                <form id="izin-form" style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Jenis Izin</label>
                        <select id="izin-type" class="form-input" style="border-radius: 8px;">
                            <option>Sakit</option>
                            <option>Keperluan Pribadi</option>
                            <option>Dinas Luar</option>
                            <option>Lainnya</option>
                        </select>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div class="form-group">
                            <label class="form-label" style="font-weight: 400;">Mulai Tanggal</label>
                            <input type="date" id="izin-start" class="form-input" style="border-radius: 8px;" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" style="font-weight: 400;">Sampai Tanggal</label>
                            <input type="date" id="izin-end" class="form-input" style="border-radius: 8px;" required>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Keterangan</label>
                        <textarea id="izin-desc" class="form-input" style="border-radius: 8px; height: 100px;" placeholder="Jelaskan alasan izin..."></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Lampiran (Foto Surat Dokter/Lainnya)</label>
                        <input type="file" id="izin-file" style="display: none;" accept="image/*">
                        <div id="file-dropzone" style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background: white; color: #888; cursor: pointer;">
                            <span class="material-icons-round" style="font-size: 2rem;">cloud_upload</span>
                            <div id="file-label">Upload File atau Foto</div>
                        </div>
                    </div>

                    <button type="submit" id="btn-submit-izin" class="btn-absen" style="margin-top: 20px; font-size: 1rem; padding: 12px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        Ajukan Izin
                    </button>
                </form>

                 <div class="footer" style="padding-top: 30px;">
                    <span>PT Mega Kreasi Tech</span>
                    <span>Since 2016</span>
                </div>
            </div>
        `;
    }

    execute() {
        const form = document.getElementById('izin-form');
        const dropzone = document.getElementById('file-dropzone');
        const fileInput = document.getElementById('izin-file');
        const fileLabel = document.getElementById('file-label');
        const submitBtn = document.getElementById('btn-submit-izin');

        if (dropzone && fileInput) {
            dropzone.onclick = () => fileInput.click();
            fileInput.onchange = (e) => {
                if (e.target.files.length > 0) {
                    fileLabel.innerText = e.target.files[0].name;
                    fileLabel.style.color = '#D32F2F';
                    fileLabel.style.fontWeight = 'bold';
                    dropzone.style.borderColor = '#D32F2F';
                }
            };
        }

        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();

                const type = document.getElementById('izin-type').value;
                const start = document.getElementById('izin-start').value;
                const end = document.getElementById('izin-end').value;
                const desc = document.getElementById('izin-desc').value;
                const file = fileInput.files[0];
                const user = AuthService.getUser();

                if (!start || !end) return alert('Silakan pilih rentang tanggal izin.');
                if (new Date(start) > new Date(end)) return alert('Tanggal mulai tidak boleh lebih besar dari tanggal selesai.');
                if (!desc) return alert('Silakan masukkan keterangan alasan izin.');

                // UI Loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="material-icons-round animate-spin">refresh</span> Memproses...';
                submitBtn.style.opacity = '0.7';

                const permissionData = {
                    employeeId: user.employeeId,
                    userName: user.name,
                    type: type,
                    startDate: start,
                    endDate: end,
                    description: desc,
                    attachment: null
                };

                // Convert file to Base64 if exists
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = async () => {
                        permissionData.attachment = reader.result;
                        await sendData(permissionData);
                    };
                    reader.readAsDataURL(file);
                } else {
                    await sendData(permissionData);
                }

                async function sendData(data) {
                    try {
                        const result = await AttendanceAPI.submitPermission(data);

                        if (result.success) {
                            alert(`✅ Pengajuan Izin ${type} berhasil dikirim!\nStatus: Menunggu Persetujuan Atasan.`);
                            window.location.href = '/home';
                        } else {
                            alert('Gagal mengirim pengajuan izin. Silakan coba lagi.');
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = 'Ajukan Izin';
                            submitBtn.style.opacity = '1';
                        }
                    } catch (error) {
                        console.error('Error submitting permission:', error);
                        alert('Terjadi kesalahan teknis. Silakan coba lagi nanti.');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Ajukan Izin';
                        submitBtn.style.opacity = '1';
                    }
                }
            };
        }
    }
}

