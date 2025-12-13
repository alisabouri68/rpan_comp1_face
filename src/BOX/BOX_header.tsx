import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faSun,
  faGlobe,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";

import logo from "Asset/images/logo.png";
import avatar from "Asset/images/avatar.png";
import { Logout } from "iconsax-react";
import { logout } from "RDUX/env/HybSlice";
import AbsMan from "RACT/RACT_absMan";
import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";

function Header() {
  // const navigate = useNavigate();

  const dispatch = AbsMan.useAppDispatch();

  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex justify-between p-3 bg-white h-20">
      <div className="flex items-center">
        <div className="flex items-center">
          <img src={logo} />
          <span className="font-bold pl-2">Smart Comp</span>
        </div>
        <div className="pl-3 cursor-pointer" onClick={() => setOpenModal(true)}>
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </div>
      </div>
      <div className="flex gap-6 items-center">
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faSun} />
          <span className="px-2">Theme</span>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <div className="cursor-pointer">
          <FontAwesomeIcon icon={faGlobe} />
          <span className="px-2">English</span>
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
        <div className="flex cursor-pointer">
          <img src={avatar} />
          <div className="flex flex-col pl-2">
            <span className="font-bold">Hana Rezaei</span>
            <span className="text-sm text-gray-400">(Tehran)</span>
          </div>
        </div>
        <div
          className="pr-8 cursor-pointer"
          title="logout"
          onClick={() => {
            window.localStorage.removeItem("access_token");
            dispatch(logout());
            // navigate("/login");
          }}
        >
          <Logout size={24} color="black" />
        </div>
      </div>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>List of Service</ModalHeader>
        <ModalBody className="flex items-center justify-center">
          <ButtonGroup>
            <Button
              href={`${import.meta.env.VITE_BASE_PATH}:3000/`}
              color="alternative"
            >
              Bio Mate
            </Button>
            <Button 
		href={`${import.meta.env.VITE_BASE_PATH}:1000/`}
		color="default">Smart Component</Button>
            <Button
              href={`${import.meta.env.VITE_BASE_PATH}:2000/`}
              color="alternative"
            >
              Tripod
            </Button>
            <Button
              href={`${import.meta.env.VITE_BASE_PATH}:4000/`}
              color="alternative"
            >
              BioDemo
            </Button>
          </ButtonGroup>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Header;
