
export function validateRegistration(name: string, email: string): string[] | null {
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

    // Return errors or null if no errors
    return errors.length > 0 ? errors: null;
}