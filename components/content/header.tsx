import Image from "next/image";

type SocialLink = {
    icon: string;
    url: string;
}

const socialLinks: SocialLink[] = [
    { icon: "/png/amazon.png", url: "https://www.amazon.com/dp/B0C9SF6CGR" },
    { icon: "/png/youtube.png", url: "https://www.youtube.com/channel/UCBFJVaKo_zJVuSpQASXbXbw" },
]

export const Header = () => {

    const navLinks = socialLinks.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
            <Image src={link.icon} alt="Social Link" width={30} height={30} />
        </a>
    ));

    return (
        <header className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Image src="/png/logo.png" alt="Logo" width={120} height={80} />
                    <h1 className="text-xl font-bold">संस्कृत प्रश्नमञ्च</h1>
                </div>
                <nav className="md:flex gap-6">
                    {navLinks}
                </nav>
            </div>
        </header>
    );
};
