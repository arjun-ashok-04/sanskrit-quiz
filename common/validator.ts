
export function validateRegistration(name: string, email: string): string[] | null {
    const errors = [];
    const trimmedName = name.trim();
    if (trimmedName.length < 5) {
        errors.push("Name must be at least 5 characters long.");
    } else if (!/^[a-zA-Z\s]+$/.test(trimmedName)) { //check for only letters and spaces.
        errors.push("Name can only contain letters and spaces.")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push("Invalid email format.");
    }

    // Return errors or null if no errors
    return errors.length > 0 ? errors: null;
}