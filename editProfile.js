const API_BASE_URL = "http://localhost:8080/api";
const token = "YOUR_JWT_TOKEN"; 

// Profil melumatlarini yukleyir
async function loadProfile() {
    try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) 
        {
            throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();

        // Melumatlari DOM elementlerine daxil edir
        document.getElementById("firstName").value = data.firstName;
        document.getElementById("lastName").value = data.lastName;
        document.getElementById("email").value = data.email;

        // Welcome mesajini yenileyir
        document.querySelector("h2 span").textContent = `${data.firstName} ${data.lastName}`;
    } 
    catch (error) 
    {
        console.error("Error loading profile:", error);
    }
}

// Profil melumatlarini yenileyir
async function saveProfile(event) {
    event.preventDefault(); 

    try {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;

        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ firstName, lastName, email })
        });

        if (!response.ok) {
            throw new Error("Failed to update profile");
        }

        
        const updatedData = await response.json();
        document.querySelector("h2 span").textContent = `${updatedData.firstName} ${updatedData.lastName}`;
        alert("Profile updated successfully!");
    } 
    catch (error) 
    {
        console.error("Error updating profile:", error);
        alert("There was an error updating your profile. Please try again.");
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", loadProfile); 
document.querySelector("form").addEventListener("submit", saveProfile);
