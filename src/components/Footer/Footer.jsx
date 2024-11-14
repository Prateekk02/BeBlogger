



const Footer = () =>{
    return <>
        <footer className="bg-black text-white py-4">
        <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm">&copy; 2024 Your Brand. All rights reserved.</p>
            <div className="flex justify-center space-x-4 mt-2">
            <a href="#home" className="hover:text-gray-400">Home</a>
            <a href="#about" className="hover:text-gray-400">About</a>
            <a href="#contact" className="hover:text-gray-400">Contact</a>
            </div>
        </div>
        </footer>

    </>
}

export default Footer;