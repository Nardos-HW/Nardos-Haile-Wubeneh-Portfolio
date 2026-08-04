const form = document.getElementById("profile-form");
const statusEl = document.getElementById("status");

document.addEventListener("DOMContentLoaded", loadCurrentProfile);

async function loadCurrentProfile() {
    try {
        const res = await fetch("/profile");
        if (!res.ok) throw new Error("Failed to load profile");

        const profile = await res.json();

        document.getElementById("name").value = profile.name || "";
        document.getElementById("bio").value = profile.bio || "";
        document.getElementById("coursework").value = profile.coursework || "";
    } catch (err) {
        showStatus("Could not load current profile data.", true);
        console.error(err);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    showStatus("Saving...", false);

    const updatedProfile = {
        name: document.getElementById("name").value.trim(),
        bio: document.getElementById("bio").value.trim(),
        coursework: document.getElementById("coursework").value.trim()
    };

    try {
        const res = await fetch("/profile", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProfile)
        });

        if (!res.ok) throw new Error("Save failed with status " + res.status);

        const saved = await res.json();
        showStatus("Saved successfully.", false);
        console.log("Updated profile:", saved);
    } catch (err) {
        showStatus("Failed to save changes. Check the server console.", true);
        console.error(err);
    }
});

function showStatus(message, isError) {
    statusEl.textContent = message;
    statusEl.className = isError ? "status-error" : "status-ok";
}
