interface PersonalInfo {
    name: string;
    email: string;
    phone: string;
    profilePicture?: string;
}

interface Education {
    education: string;
}

interface WorkExperience {
    workExperience: string;
}

interface Skills {
    skills: string;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form') as HTMLFormElement;
    const resumePreview = document.getElementById('resume-preview') as HTMLElement;

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLInputElement).value;
        const workExperience = (document.getElementById('workExperience') as HTMLInputElement).value;
        const skills = (document.getElementById('skills') as HTMLInputElement).value;

        const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
        const profilePicture = profilePictureInput.files && profilePictureInput.files[0]
            ? URL.createObjectURL(profilePictureInput.files[0])
            : '';

        if (!name || !email || !phone || !education || !workExperience || !skills) {
            alert("Please fill in all required fields.");
            return;
        }

        const personalInfo: PersonalInfo = {
            name,
            email,
            phone,
            profilePicture
        };

        const educationInfo: Education = {
            education
        };

        const workExperienceInfo: WorkExperience = {
            workExperience
        };

        const skillsInfo: Skills = {
            skills
        };

        generateResume(personalInfo, educationInfo, workExperienceInfo, skillsInfo);
    });

    function generateResume(
        personalInfo: PersonalInfo,
        education: Education,
        workExperience: WorkExperience,
        skills: Skills
    ) {
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
                <p>${education.education}</p>
            </div>
            <div class="resume-section">
                <h4>Work Experience</h4>
                <p>${workExperience.workExperience}</p>
            </div>
            <div class="resume-section">
                <h4>Skills</h4>
                <p>${skills.skills}</p>
            </div>
        `;
    }
});
