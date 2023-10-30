import React, { useState, useEffect } from "react";
import {
    Modal,
    Button,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
} from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ModalUserInfo = ({ onClose, data }) => {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(true);

    const closeHandler = (response) => {
        setVisible(false);
        onClose(response);
    };

    useEffect(() => {
        console.log(data);
    }, [data]);


    return (
        <Modal
            size="md"
            isOpen={visible}
            aria-labelledby="modal-signup"
            onClose={closeHandler}
            backdrop="blur"
            isDismissable={false}
            scrollBehavior="inside"
            placement="auto"
        >
            <ModalContent>
                <>
                    <ModalHeader>

                    </ModalHeader>
                    <ModalBody >
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                        >
                            {t("profile.save")}
                        </Button>

                        <Button
                            color="danger"

                            onClick={closeHandler}
                        >
                            {t("profile.cancel")}
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default ModalUserInfo;
