import {
  Box,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiCrop } from "react-icons/bi";
import Cropper from "react-easy-crop";
import { MdCancel } from "react-icons/md";
import getCroppedImg from "./utils/CropImage";
import { toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
const Crop = ({ photoURL, setOpenCrop, setPhotoURL, setFile, aspect }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const {
    isOpen: isOpenInner,
    onOpen: onOpenInner,
    onOpenChange: onOpenChangeInner,
  } = useDisclosure();
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };
  useEffect(() => {
    onOpenInner();
  });
  const cropImage = async () => {
    try {
      const { file, url } = await getCroppedImg(
        photoURL,
        croppedAreaPixels,
        rotation
      );
      setPhotoURL(url);
      setFile(file);
      setOpenCrop(false);
    } catch (error) {
      toast.error("¡Error al recortar la imágen!", {
        position: "bottom-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        autoClose: 2500,
      });
      
    }
  };
  const noCropImage = () => {
    setPhotoURL("");
    setFile("");
    setOpenCrop(false);
  };
  return (
    <>
      <Modal
        isOpen={isOpenInner}
        onOpenChange={onOpenChangeInner}
        isDismissable={false}
        size="4xl"
        hideCloseButton
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Recortar imagen
            </ModalHeader>
            <ModalBody>
              <DialogContent
                dividers
                sx={{
                  background: "#333",
                  position: "relative",
                  height: 400,
                  width: "auto",
                  minWidth: { sm: 500 },
                }}
              >
                <Cropper
                  image={photoURL}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={aspect}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropChange={setCrop}
                  onCropComplete={cropComplete}
                />
              </DialogContent>
              <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
                <Box sx={{ width: "100%", mb: 1 }}>
                  <Box>
                    <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                    <Slider
                      valueLabelDisplay="auto"
                      valueLabelFormat={zoomPercent}
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </Box>
                  <Box>
                    <Typography>Rotación: {rotation + "°"}</Typography>
                    <Slider
                      valueLabelDisplay="auto"
                      min={0}
                      max={360}
                      value={rotation}
                      onChange={(e, rotation) => setRotation(rotation)}
                    />
                  </Box>
                </Box>
              </DialogActions>
            </ModalBody>
            <ModalFooter>
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Button
                  color="danger"
                  onClick={noCropImage}
                  endContent={<MdCancel />}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  endContent={<BiCrop />}
                  onClick={cropImage}
                >
                  Recortar
                </Button>
              </Box>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Crop;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
