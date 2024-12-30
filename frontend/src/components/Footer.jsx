import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8 rounded-lg mt-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
                {/* Column 1: About Us */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">About Us</h2>
                    <p className="text-sm">
                        Fashion Store brings you the latest trends at the best prices. Our mission is to make fashion accessible for everyone.
                    </p>
                </div>

                {/* Column 2: Quick Links */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
                    <ul className="text-sm space-y-2">
                        <li>
                            <a href="/shop" className="hover:underline">Shop</a>
                        </li>
                        <li>
                            <a href="/about" className="hover:underline">About Us</a>
                        </li>
                        <li>
                            <a href="/contact" className="hover:underline">Contact Us</a>
                        </li>
                        <li>
                            <a href="/faq" className="hover:underline">FAQs</a>
                        </li>
                    </ul>
                </div>

                {/* Column 3: Follow Us */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <i className="fab fa-twitter"></i> Twitter
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8 text-sm border-t border-gray-700 pt-4">
                <p>© 2024 Fashion Store. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
