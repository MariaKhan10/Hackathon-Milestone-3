document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resume-form');
    var resumePreview = document.getElementById('resume-preview');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var phone = document.getElementById('phone').value;
        var education = document.getElementById('education').value;
        var workExperience = document.getElementById('workExperience').value;
        var skills = document.getElementById('skills').value;
        var profilePictureInput = document.getElementById('profilePicture');
        var profilePicture = profilePictureInput.files && profilePictureInput.files[0]
            ? URL.createObjectURL(profilePictureInput.files[0])
            : '';
        if (!name || !email || !phone || !education || !workExperience || !skills) {
            alert("Please fill in all required fields.");
            return;
        }
        var personalInfo = {
            name: name,
            email: email,
            phone: phone,
            profilePicture: profilePicture
        };
        var educationInfo = {
            education: education
        };
        var workExperienceInfo = {
            workExperience: workExperience
        };
        var skillsInfo = {
            skills: skills
        };
        generateResume(personalInfo, educationInfo, workExperienceInfo, skillsInfo);
    });
    function generateResume(personalInfo, education, workExperience, skills) {
        resumePreview.innerHTML = "\n            <div class=\"resume-header\">\n                ".concat(personalInfo.profilePicture ? "<img src=\"".concat(personalInfo.profilePicture, "\" alt=\"Profile Picture\">") : '', "\n                <h3>").concat(personalInfo.name, "</h3>\n            </div>\n            <div class=\"resume-section\">\n                <p><strong>Email:</strong> ").concat(personalInfo.email, "</p>\n                <p><strong>Phone:</strong> ").concat(personalInfo.phone, "</p>\n            </div>\n            <div class=\"resume-section\">\n                <h4>Education</h4>\n                <p>").concat(education.education, "</p>\n            </div>\n            <div class=\"resume-section\">\n                <h4>Work Experience</h4>\n                <p>").concat(workExperience.workExperience, "</p>\n            </div>\n            <div class=\"resume-section\">\n                <h4>Skills</h4>\n                <p>").concat(skills.skills, "</p>\n            </div>\n        ");
    }
});
