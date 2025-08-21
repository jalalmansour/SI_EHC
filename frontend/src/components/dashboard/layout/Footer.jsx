import { Layout } from "antd";
import { HeartFilled } from "@ant-design/icons";

const Footer = () => {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter className="bg-gray-100 py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left side */}
        <div className="text-gray-600 text-sm flex items-center gap-1 mb-2 md:mb-0">
          © 2021, made with <HeartFilled className="text-red-500 mx-1" /> by{" "}
          <a
            href="#pablo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Creative Tim
          </a>{" "}
          for a better web.
        </div>

        {/* Right side */}
        <ul className="flex flex-wrap gap-4 text-gray-500 text-sm">
          <li>
            <a
              href="#pablo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
            >
              Creative Tim
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
            >
              Blog
            </a>
          </li>
          <li>
            <a
              href="#pablo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
            >
              License
            </a>
          </li>
        </ul>
      </div>
    </AntFooter>
  );
};

export default Footer;
