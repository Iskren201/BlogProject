import React from "react";

const NavBar = () => {
  const links = [
    {
      name: "About Us",
      link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
    {
      name: "Products",
      link: "https://www.youtube.com/watch?v=oHg5SJYRHA0",
    },
    {
      name: "Other Links",
      link: "https://www.youtube.com/watch?v=cvh0nX08nRw",
    },
    {
      name: "Contact Us",
      link: "https://bitly.com/98K8eH",
    },
  ];

  return (
    <nav className="bg-indigo-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <img
          src="https://media.discordapp.net/attachments/694834406493257762/729067815499202651/matthew_border.png"
          width="40"
          height="40"
          alt="Brand logo"
        />
        <ul className="flex space-x-4">
          {links.map((link, index) => (
            <li key={index}>
              <a
                className="text-white hover:text-indigo-300 transition duration-300"
                href={link.link}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
