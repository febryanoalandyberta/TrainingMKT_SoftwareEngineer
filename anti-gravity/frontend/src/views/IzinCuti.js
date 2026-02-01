import AbstractView from "./AbstractView.js";
import { AuthService } from "../services/AuthService.js";
import { AttendanceAPI } from "../services/AttendanceService.js";


export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Izin Cuti - PT Mega Kreasi Tech");
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
                    <h2 style="font-size: 1.3rem; margin: 0;">Form Cuti</h2>
                </div>

                <div style="background: white; padding: 15px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.8rem; color: #888;">Sisa Cuti Tahunan</div>
                        <div style="font-size: 1.5rem; font-weight: bold; color: #D32F2F;">12 Hari</div>
                    </div>
                    <span class="material-icons-round" style="font-size: 2.5rem; color: #ddd;">event_available</span>
                </div>

                <form id="cuti-form" style="display: flex; flex-direction: column; gap: 15px;">
                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Mulai Tanggal</label>
                        <input type="date" id="cuti-start" class="form-input" style="border-radius: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Sampai Tanggal</label>
                        <input type="date" id="cuti-end" class="form-input" style="border-radius: 8px;" required>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Keterangan Cuti</label>
                         <textarea id="cuti-desc" class="form-input" style="border-radius: 8px; height: 100px;" placeholder="Alasan cuti..." required></textarea>
                    </div>

                    <div class="form-group">
                        <label class="form-label" style="font-weight: 400;">Lampiran (Foto Dokumen Jika Ada)</label>
                        <input type="file" id="cuti-file" style="display: none;" accept="image/*">
                        <div id="cuti-dropzone" style="border: 2px dashed #ccc; padding: 20px; text-align: center; border-radius: 8px; background: white; color: #888; cursor: pointer;">
                            <span class="material-icons-round" style="font-size: 2rem;">cloud_upload</span>
                            <div id="cuti-file-label">Upload File atau Foto</div>
                        </div>
                    </div>

                    <button type="submit" id="btn-submit-cuti" class="btn-absen" style="margin-top: 20px; font-size: 1rem; padding: 12px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                        Ajukan Cuti
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
        const form = document.getElementById('cuti-form');
        const dropzone = document.getElementById('cuti-dropzone');
        const fileInput = document.getElementById('cuti-file');
        const fileLabel = document.getElementById('cuti-file-label');
        const submitBtn = document.getElementById('btn-submit-cuti');

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

                const start = document.getElementById('cuti-start').value;
                const end = document.getElementById('cuti-end').value;
                const desc = document.getElementById('cuti-desc').value;
                const file = fileInput.files[0];
                const user = AuthService.getUser();

                if (!start || !end || !desc) return alert('Silakan lengkapi formulir cuti.');

                // Basic validation
                if (new Date(start) > new Date(end)) {
                    return alert('Tanggal mulai tidak boleh lebih besar dari tanggal selesai.');
                }

                // UI Loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="material-icons-round animate-spin">refresh</span> Memproses...';
                submitBtn.style.opacity = '0.7';

                const permissionData = {
                    employeeId: user.employeeId,
                    userName: user.name,
                    type: 'Cuti',
                    startDate: start,
                    endDate: end,
                    description: desc,
                    attachment: null
                };

                // Convert file if exists
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
                            alert(`✅ Pengajuan Cuti berhasil dikirim!\nDari: ${start} s/d ${end}\nStatus: Menunggu Persetujuan Atasan.`);
                            window.location.href = '/home';
                        } else {
                            alert('Gagal mengirim pengajuan cuti. Silakan coba lagi.');
                            submitBtn.disabled = false;
                            submitBtn.innerHTML = 'Ajukan Cuti';
                            submitBtn.style.opacity = '1';
                        }
                    } catch (error) {
                        console.error('Error submitting leave:', error);
                        alert('Terjadi kesalahan teknis. Silakan coba lagi nanti.');
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Ajukan Cuti';
                        submitBtn.style.opacity = '1';
                    }
                }
            };
        }
    }
}
