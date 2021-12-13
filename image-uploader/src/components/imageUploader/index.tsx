import Button from "../button";
import Container from "../container";
import "./imageUploader.scss";
import ImageUploaderSvg from "src/assets/img/imageUploader/image.svg";
import { DragEventHandler, useRef, useState } from "react";
import clsx from "clsx";
import LinearProgress from "../progress/linearProgress";
import { firebaseStorage } from "src/utils/firebase/index";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import Icon from "@mdi/react";
import { mdiCheckboxMarkedCircle } from "@mdi/js";

const ImageUploader = () => {
  const [status, setStatus] = useState<ImageUploadStatus>("init");
  const dragRef = useRef<HTMLDivElement>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const filesRef = useRef<File[]>([]);

  const copyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    console.log('copy')
  };

  const handleOnDragOver: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    if (!dragRef.current) return;
    const target = dragRef.current;
    target.classList.add("active-on-drag");
  };

  const handleOnDragLeave: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    if (!dragRef.current) return;
    const target = dragRef.current;
    target.classList.remove("active-on-drag");
  };

  const handleOnDrop: DragEventHandler<HTMLDivElement> = (evt) => {
    evt.preventDefault();
    if (!dragRef.current || !filesRef.current) return;
    dragRef.current.classList.remove("active-on-drag");
    if (evt.dataTransfer.items) {
      for (let key in evt.dataTransfer.items) {
        const item = evt.dataTransfer.items[key];
        if (item.kind !== "file" || !item.type.match(/image\//)) continue;
        const file = item.getAsFile();
        if (!file) continue;
        filesRef.current[0] = file;
        handleSubmit();
        break;
      }
    }
  };

  const handleSubmit = () => {
    if (!filesRef.current) return;
    if (!filesRef.current[0]) return;
    setStatus("update");
    const storeRef = ref(firebaseStorage, `images/${filesRef.current[0].name}`);
    uploadBytes(storeRef, filesRef.current[0]).then((snapshot) => {
      console.log(snapshot);
      setStatus("done");
      getDownloadURL(snapshot.ref).then((downloadUrl) => {
        console.log(downloadUrl);
        setDownloadUrl(downloadUrl);
      });
    });
  };

  return (
    <Container className={clsx("image-uploader", `upload-status-${status}`)}>
      <div className="image-uploader-init">
        <h3 className="image-uploader-title">Upload your image</h3>
        <p className="image-uploader-subtitle subtitle-text">
          File should be jpeg, Png...
        </p>
        <div
          ref={dragRef}
          className="image-upload-block"
          onDragOver={handleOnDragOver}
          onDragLeave={handleOnDragLeave}
          onDrop={handleOnDrop}
        >
          <img
            className="image-upload-indicator"
            src={ImageUploaderSvg}
            alt="upload here"
          />
          <span className="small-text">Drag & Drop your image here</span>
        </div>
        <p className="small-text image-upload-break">Or</p>
        <input className="image-upload-input" type="file" />
        <Button>Choose a file</Button>
      </div>
      <div className="image-uploader-update">
        <h3 className="image-uploader-title">Uploading...</h3>
        <div className="progress-wrapper">
          <LinearProgress />
        </div>
      </div>
      <div className="image-uploader-done">
        <Icon
          path={mdiCheckboxMarkedCircle}
          size={2}
          color="rgba(33, 150, 83, 1)"
        />
        <h3 className="image-uploader-title">Uploaded Successfully!</h3>
        <div className="image-uploaded-container">
          {downloadUrl !== "" && (
            <img src={downloadUrl} alt={filesRef.current[0].name} />
          )}
        </div>
        <div className="image-uploaded-url">
          <input type="text" disabled value={downloadUrl.toString()} />
          <Button onClick={copyLink}>Copy Link</Button>
        </div>
      </div>
    </Container>
  );
};

type ImageUploadStatus = "init" | "update" | "done" | "error";

export default ImageUploader;
