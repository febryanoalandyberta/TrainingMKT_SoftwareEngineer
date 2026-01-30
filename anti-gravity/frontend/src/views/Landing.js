import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor() {
        super();
        this.setTitle("Welcome - PT Mega Kreasi Tech");
    }

    async getHtml() {
        return `
            <div class="container" style="justify-content: space-between; padding: 20px; background: #EFEFEF;">
                
                <!-- Video Section -->
                <div style="background: #E0E0E0; border-radius: 20px 20px 0 0; padding: 40px 20px; text-align: center; margin: -20px -20px 20px -20px; border-bottom: 1px solid #999;">
                    <h2 style="font-weight: 400; font-size: 1.5rem; line-height: 1.4;">
                        Play Video<br>
                        Pengerjaan IT Dev &<br>
                        IT Technician
                    </h2>
                </div>

                <!-- Logo Section -->
                <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
                    <div style="background: #D32F2F; width: 250px; height: 180px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">
                         <!-- Abstract Logo representation -->
                         <svg width="150" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20 L40 50 L20 80" stroke="white" stroke-width="15" stroke-linecap="square"/>
                            <path d="M80 20 L60 50 L80 80" stroke="white" stroke-width="15" stroke-linecap="square"/>
                            <path d="M50 50 L50 90" stroke="white" stroke-width="15"/>
                            <circle cx="50" cy="35" r="10" fill="white"/>
                         </svg>
                    </div>
                </div>

                <!-- Buttons Section -->
                <div style="display: flex; gap: 20px; margin-bottom: 40px;">
                    <a href="/signup" class="btn" style="text-decoration: none; text-align: center; background: white; color: black; border: 1px solid black; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" data-link>Sign Up</a>
                    <a href="/login" class="btn" style="text-decoration: none; text-align: center; background: white; color: black; border: 1px solid black; box-shadow: 0 2px 5px rgba(0,0,0,0.1);" data-link>Log in</a>
                </div>

                <!-- Footer -->
                <div style="text-align: center; color: #666; font-size: 0.8rem;">
                    <p style="margin-bottom: 20px;">Versi 1.1.1</p>
                    <div style="display: flex; justify-content: space-between; padding: 0 20px;">
                        <span>PT Mega Kreasi Tech</span>
                        <span>Since 2016</span>
                    </div>
                </div>
            </div>
        `;
    }
}
