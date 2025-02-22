import {makeCall} from "@/common/apiCaller";

export async function validateRegistration(name: string, email: string): Promise<string[] | null> {
    const errors = [];
    const trimmedName = name.trim();
    if (trimmedName.length < 4) {
        errors.push("नाम न्यूनातिन्यूनं ४ अक्षराणि दीर्घं भवितुमर्हति । (Name must be at least 4 characters long.)");
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) { //check for only letters and spaces.
        errors.push("नाम केवलं अक्षराणि रिक्तस्थानानि च भवितुं शक्नुवन्ति । (Name can only contain letters and spaces.)")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push("अमान्य ईमेल । (Invalid email.)");
    }

    if (email.includes("+")) {
        errors.push("ईमेल् मध्ये + न भवति। (Email cannot contain +)");
    }

    const resp = await makeCall("/api/email", {email: email}, {
        method: "GET",
        cache: "no-store",
    })

    if (resp.status !== 200) {
        errors.push("Failed to validate email.");
    }

    const jsonResponse = await resp.json();
    if (!Boolean(jsonResponse["success"])) {
        errors.push("ईमेल् न प्राप्यते । (The email address is not deliverable.)");
    }

    // Return errors or null if no errors
    return errors.length > 0 ? errors: null;
}