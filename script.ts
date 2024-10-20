interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    profilePicture?: string;
}

interface Education {
    education: string;
    year: string;
}

interface WorkExperience {
    workExperience: string;
    year: string;
}

interface Skills {
    skills: string[];
}

let profilePicture: string = ''; // Holds profile picture URL

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumePreview = document.getElementById('resume-preview') as HTMLElement;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;

    // Add event listeners for adding more sections
    document.getElementById('add-education-btn')?.addEventListener('click', addEducation);
    document.getElementById('add-experience-btn')?.addEventListener('click', addExperience);
    document.getElementById('add-skill-btn')?.addEventListener('click', addSkill);

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;

        const educationItems = document.querySelectorAll('.education-item');
        const educationData: Education[] = Array.from(educationItems).map(item => ({
            education: (item.querySelector('.education') as HTMLInputElement).value,
            year: (item.querySelector('.education-year') as HTMLInputElement).value,
        }));

        const experienceItems = document.querySelectorAll('.experience-item');
        const experienceData: WorkExperience[] = Array.from(experienceItems).map(item => ({
            workExperience: (item.querySelector('.experience') as HTMLInputElement).value,
            year: (item.querySelector('.experience-year') as HTMLInputElement).value,
        }));

        const skillsItems = document.querySelectorAll('.skills-item input');
        const skillsData: string[] = Array.from(skillsItems).map(item => item.value);

        if (profilePictureInput.files && profilePictureInput.files[0]) {
            profilePicture = URL.createObjectURL(profilePictureInput.files[0]);
        }

        if (!name || !email || !phone || educationData.length === 0 || experienceData.length === 0 || skillsData.length === 0) {
            alert("Please fill in all required fields.");
            return;
        }

        const personalInfo: PersonalInfo = {
            name,
            email,
            phone,
            profilePicture
        };

        generateResume(personalInfo, educationData, experienceData, skillsData);
    });

    function generateResume(
        personalInfo: PersonalInfo,
        education: Education[],
        workExperience: WorkExperience[],
        skills: string[]
    ) {
        const educationHtml = education.map(e => `<p>${e.education} (${e.year})</p>`).join('');
        const experienceHtml = workExperience.map(e => `<p>${e.workExperience} (${e.year})</p>`).join('');
        const skillsHtml = skills.map(s => `<p>${s}</p>`).join('');

        resumePreview.innerHTML = `
            <div class="resume-header">
                ${personalInfo.profilePicture ? `<img src="${personalInfo.profilePicture}" alt="Profile Picture">` : ''}
                <h3>${personalInfo.name}</h3>
            </div>
            <div class="resume-section">
                <p><strong>Email:</strong> ${personalInfo.email}</p>
                <p><strong>Phone:</strong> ${personalInfo.phone}</p>
            </div>
            <div class="resume-section">
                <h4>Education</h4>
                ${educationHtml}
            </div>
            <div class="resume-section">
                <h4>Work Experience</h4>
                ${experienceHtml}
            </div>
            <div class="resume-section">
                <h4>Skills</h4>
                ${skillsHtml}
            </div>
        `;
    }

    function addEducation() {
        const educationSection = document.getElementById('education-section') as HTMLElement;
        const newEducation = document.createElement('div');
        newEducation.classList.add('education-item');
        newEducation.innerHTML = `
            <input type="text" class="education" required placeholder="Your Education Background" />
            <input type="text" class="education-year" required placeholder="Year" />
        `;
        educationSection.insertBefore(newEducation, document.getElementById('add-education-btn'));
    }

    function addExperience() {
        const experienceSection = document.getElementById('experience-section') as HTMLElement;
        const newExperience = document.createElement('div');
        newExperience.classList.add('experience-item');
        newExperience.innerHTML = `
            <input type="text" class="experience" required placeholder="Your Work Experience" />
            <input type="text" class="experience-year" required placeholder="Year" />
        `;
        experienceSection.insertBefore(newExperience, document.getElementById('add-experience-btn'));
    }

    function addSkill() {
        const skillsSection = document.getElementById('skills-section') as HTMLElement;
        const newSkill = document.createElement('div');
        newSkill.classList.add('skills-item');
        newSkill.innerHTML = `
            <input type="text" class="skill" required placeholder="Your Key Skills" />
        `;
        skillsSection.insertBefore(newSkill, document.getElementById('add-skill-btn'));
    }
});
