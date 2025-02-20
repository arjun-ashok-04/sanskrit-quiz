import Image from "next/image";

export const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 p-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Arjun&apos;s Website. सर्वे अधिकाराः सुरक्षिताः।.</p>
                <div className="flex items-center gap-3">
                    <Image src="/png/logo.png" alt="Logo" width={120} height={80}/>
                </div>
            </div>
        </footer>
    );
};
