import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsTree } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <header className="w-full h-20 bg-green flex">
            <div className="content w-full m-auto px-10 flex items-center justify-between">
                <div className="logo">
                    <Link to="/">
                        <BsTree size={40} />
                    </Link>
                </div>
                <button
                    onClick={() => {
                        setIsVisible((prev) => !prev);
                    }}
                    className={`mobile-nav-button ${isVisible ? "hidden" : ""}`}
                >
                    <RxHamburgerMenu size={40} />
                </button>
            </div>
            <nav
                className={`mobile-nav absolute top-0 right-0 ${
                    isVisible ? "translate-x-0" : ""
                }`}
            >
                <ul className="flex w-full px-10 h-20 items-center justify-between bg-black text-white">
                    <li>
                        <Link to="/">Главная</Link>
                    </li>
                    <li>
                        <Link to="/">Карта</Link>
                    </li>
                    <li>
                        <Link to="/">Форма</Link>
                    </li>
                    <button
                        className=""
                        onClick={() => {
                            setIsVisible((prev) => !prev);
                        }}
                    >
                        <AiOutlineClose size={30} />
                    </button>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
