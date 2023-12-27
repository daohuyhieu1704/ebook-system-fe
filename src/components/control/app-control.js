import AWS from "aws-sdk";
import React, { useRef, useState, useEffect, useCallback } from "react";
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";
import "./app-control.css";
import {
  degrees,
  PDFDocument,
  rgb,
  rotateRectangle,
  StandardFonts,
} from "pdf-lib";
import downloadFile from "downloadjs";
import AppConstant from "../../constants/AppConstant";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoaded,
  selectNumPages,
  selectScale,
  selectSrc,
  handleSetScale,
  handleSaveCanvas,
  setScale,
  selectNumPageCurrent,
  setSrc,
  setLoaded,
  setLoadedSrc,
  handleRemoveDataCanvasFromLocal,
} from "../../redux/AppSlice";
import {
  Button,
  Col,
  Dropdown,
  Input,
  InputNumber,
  Menu,
  Radio,
  Row,
  Select,
  Slider,
  Typography,
  Space,
  Tooltip,
  Upload,
  Spin,
} from "antd";
import {
  IoTriangleOutline,
  IoBrushOutline,
  IoSquareOutline,
} from "react-icons/io5";
import { BsSlash } from "react-icons/bs";
import { RiEraserLine, RiCheckboxBlankCircleLine } from "react-icons/ri";
import {
  AiOutlineUndo,
  AiOutlineRedo,
  AiOutlineColumnHeight,
  AiOutlineZoomIn,
  AiOutlineZoomOut,
  AiOutlineRead,
  AiOutlineSave,
  AiOutlineDownload,
  AiOutlineCompress,
  AiOutlineClear,
  AiOutlineFontSize,
} from "react-icons/ai";
import {
  ButtonControl,
  ButtonPicker,
  ModalControl,
  ModalControlTitle,
  ModalControlText,
  PagePerToTal,
  RadioButtonControl,
  SelectControl,
  SliderControl,
  SliderTextControl,
  DropdownControl,
  UploadPdf,
  ButtonUpload,
} from "./app-control.style";

import Modal from "antd/lib/modal/Modal";
import { CirclePicker, SketchPicker, CompactPicker } from "react-color";
import {
  selectColorB,
  selectColorG,
  selectColorR,
  selectFlagDraw,
  selectOpacity,
  selectRedoState,
  selectTypeDraw,
  selectUndoState,
  selectLineWidth,
  setColorB,
  setColorG,
  setColorR,
  setFlagDraw,
  setOpacity,
  setRedoState,
  setTypeDraw,
  setUndoState,
  setLineWidth,
  setClearAllState,
  selectClearAllState,
  selectTextContent,
  selectTextSpecify,
  selectTextMode,
  selectTextStart,
  selectTextEnd,
  selectTextSize,
  selectTextColor,
  selectTextBoundary,
  selectTextWH,
  setTextStart,
  setTextEnd,
  setTextMode,
  setTextSpecify,
  setTextContent,
  setTextSize,
  setTextColor,
  setTextBoundary,
} from "./app-controlSlice";
import { UploadOutlined } from "@ant-design/icons";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
const { Option } = Select;
const { Title } = Typography;
const { TextArea } = Input;
const albumBucketName = "vermuda-images";
const folderName = "images";
const accessKeyId = "AKIAJHCWISM3O4WMSPXA";
const secretAccessKey = "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";
const AppControl = () => {
  const srcState = useSelector(selectSrc);
  const src =
    localStorage.getItem("urls") !== null
      ? localStorage.getItem("urls")
      : srcState;
  const loaded = useSelector(selectLoaded);
  const numPages = useSelector(selectNumPages);
  const scale = useSelector(selectScale);
  const numPageCurrent = useSelector(selectNumPageCurrent);
  const colorR = useSelector(selectColorR);
  const colorG = useSelector(selectColorG);
  const colorB = useSelector(selectColorB);
  const opacity = useSelector(selectOpacity);
  const typeDraw = useSelector(selectTypeDraw);
  const flagDraw = useSelector(selectFlagDraw);
  const undoState = useSelector(selectUndoState);
  const redoState = useSelector(selectRedoState);
  const lineWidth = useSelector(selectLineWidth);
  const clearAllState = useSelector(selectClearAllState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [colorStateR, setColorStateR] = useState(colorR);
  const [colorStateG, setColorStateG] = useState(colorG);
  const [colorStateB, setColorStateB] = useState(colorB);
  const [colorOpacityState, setColorOpacityState] = useState(1);

  const textContent = useSelector(selectTextContent);
  const textSpecify = useSelector(selectTextSpecify);
  const textMode = useSelector(selectTextMode);
  const textStart = useSelector(selectTextStart);
  const textEnd = useSelector(selectTextEnd);
  const textSize = useSelector(selectTextSize);
  const textColor = useSelector(selectTextColor);
  const textBoundary = useSelector(selectTextBoundary);
  const [textMediate, setTextMediate] = useState("");
  const [textSizeMediate, setTextSizeMediate] = useState(3);
  const [colorTextR, setColorTextR] = useState(colorR);
  const [colorTextG, setColorTextG] = useState(colorG);
  const [colorTextB, setColorTextB] = useState(colorB);
  const [textBoundaryMediate, setTextBoundaryMediate] = useState({
    isHave: false,
    width: 1,
    style: "solid",
    color: "#000",
  });
  const [fileName, setFileName] = useState(
    localStorage.getItem("fileName") !== null
      ? localStorage.getItem("fileName")
      : "default"
  );
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    dispatch(setColorR(colorStateR));
    dispatch(setColorG(colorStateG));
    dispatch(setColorB(colorStateB));
    dispatch(setOpacity(colorOpacityState));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setColorOpacityState(opacity);
  };
  const handleChangeColor = (clr) => {
    setColorStateR(clr.rgb.r);
    setColorStateB(clr.rgb.b);
    setColorStateG(clr.rgb.g);
  };
  const handleChangeOpacity = (value) => {
    setColorOpacityState(value);
  };
  const zoomOut = () => {
    dispatch(handleSetScale(false));
  };

  const zoomIn = () => {
    dispatch(handleSetScale(true));
  };
  const zoomFullScreen = () => {};

  const saveCanvas = () => {
    dispatch(handleSaveCanvas());
  };

  const undo = () => {
    dispatch(setUndoState(!undoState));
  };

  const redo = () => {
    dispatch(setRedoState(!redoState));
  };

  const reLineWidth = (lineWidth) => {
    dispatch(setLineWidth(lineWidth));
  };
  const handleClearAll = () => {
    dispatch(setClearAllState(!clearAllState));
  };

  const download = async () => {
    dispatch(handleSaveCanvas());
    const existingPdfBytes = await fetch(src).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pages = pdfDoc.getPages();
    // const firstPage = pages[currentPage - 1];
    // const { width, height } = firstPage.getSize();

    for (let i = 1; i <= numPages; i++) {
      let pageItem = pages[i - 1];

      let canvas = document.getElementById("canvas-draw-" + i);
      var w = canvas.width;
      var h = canvas.height;
      var context = canvas.getContext("2d");

      context.globalCompositeOperation = "destination-over";
      context.fillStyle = "rgba(0, 0, 0, 0)";
      var imageData = canvas.toDataURL("image/png");

      const jpgImage = await pdfDoc.embedPng(imageData);
      const jpgDims = jpgImage.scale(AppConstant.CANVAS_SCALE);

      pageItem.drawImage(jpgImage, {
        x: 0,
        y: 0,
        width: jpgDims.width,
        height: jpgDims.height,
        // rotate: degrees(90),
        // opacity: 0.75,
      });
    }

    const pdfBytes = await pdfDoc.save();
    downloadFile(pdfBytes, "EDIT-" + fileName, "application/pdf");
  };

  const handleChange = (value) => {
    dispatch(setScale(value / 100));
  };
  const handleChangeDrawType = (e) => {
    dispatch(setTypeDraw(e.target.value));
    if (e.target.value === "drawFree") dispatch(setOpacity(1));
  };
  const handleTextMode = () => {
    dispatch(setTextMode(!textMode));
  };
  const handleDoneTextSpecify = () => {
    dispatch(setTextContent(textMediate));
    dispatch(setTextSize(textSizeMediate));
    dispatch(setTextSpecify(!textSpecify));
    dispatch(setTextColor({ R: colorTextR, G: colorTextG, B: colorTextB }));
    setTextMediate("");
    setTextSize(3);
    setColorTextR(colorR);
    setColorTextG(colorG);
    setColorTextB(colorB);
  };
  const handleCancelText = () => {
    dispatch(setTextSpecify(!textSpecify));
    dispatch(setUndoState(!undoState));
    setTextMediate("");
    setTextSize(3);
    setColorTextR(colorR);
    setColorTextG(colorG);
    setColorTextB(colorB);
  };
  const handleTextContent = (e) => {
    setTextMediate(e.target.value);
  };
  const handleChangeTextSize = (val) => {
    setTextSizeMediate(val);
  };
  const handleChangeTextColor = (clr) => {
    setColorTextR(clr.rgb.r);
    setColorTextG(clr.rgb.b);
    setColorTextB(clr.rgb.g);
  };
  const transformP = {
    transform: `translate(0px, -3px)`,
  };
  const transformM = {
    position: `absolute`,
    transform: `translate(0px, -300px)`,
  };
  const uploadProps = {
    // defaultFileList: [
    //   {
    //     uid: '2',
    //     name: 'yyy.png',
    //     status: 'done',
    //     url: 'http://www.baidu.com/yyy.png'
    //   }
    // ],
    accept: ".pdf",
    maxCount: 1,
    showUploadList: true,
    customRequest({
      action,
      data,
      file,
      filename,
      headers,
      onError,
      onProgress,
      onSuccess,
      withCredentials,
    }) {
      AWS.config.update({
        accessKeyId,
        secretAccessKey,
        // sessionToken: ''
      });
      const S3 = new AWS.S3();
      console.log("DEBUG filename", file.name);
      console.log("DEBUG file type", file.type);
      const current = new Date().getTime();
      const objParams = {
        Bucket: "vermuda-images",
        Key: folderName + "/" + current + "_" + file.name,
        Body: file,
        ACL: "public-read",
        // ContentType: file.type // TODO: You should set content-type because AWS SDK will not automatically set file MIME
      };
      S3.putObject(objParams)
        .on("httpUploadProgress", function ({ loaded, total }) {
          onProgress(
            {
              percent: Math.round((loaded / total) * 100),
            },
            file
          );
        })
        .send(function (err, data) {
          if (err) {
            onError();
            console.log("Something went wrong");
            console.log(err.code);
            console.log(err.message);
            dispatch(setLoadedSrc(false));
          } else {
            const urls = encodeURI(
              "https://" +
                albumBucketName +
                ".s3-ap-northeast-1.amazonaws.com/" +
                folderName +
                "/" +
                current +
                "_" +
                file.name
            );
            dispatch(handleRemoveDataCanvasFromLocal());

            onSuccess(urls);
            localStorage.setItem("urls", urls);
            dispatch(setSrc(urls));
            console.log("SEND FINISHED");
            dispatch(setLoadedSrc(false));
            setFileName(file.name);
            localStorage.setItem("fileName", file.name);
          }
        });
    },
    defaultFileList: () => {
      return localStorage.getItem("fileName") !== "default" &&
        localStorage.getItem("fileName") !== null
        ? [
            {
              uid: "1",
              name: localStorage.fileName,
              status: "done",
              response: "this pdf file", // custom error message to show
              url: localStorage.urls,
            },
          ]
        : null;
    },
    onChange(info) {
      console.log("dfdfd", info.file.name);
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        console.log("info", info);
        // message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
      if (info.fileList.length < 1) {
        dispatch(handleRemoveDataCanvasFromLocal());
        localStorage.setItem("urls", "./assets/LaserLevel.pdf");
        localStorage.setItem("fileName", "default");
        dispatch(setSrc("./assets/LaserLevel.pdf"));
      }
    },
  };
  // useEffect(() => {
  //   const colorPick = `rgba(${colorR},${colorB},${colorG},${opacity})`
  // }, [colorR, colorB, colorG, opacity])
  return (
    <>
      {loaded ? (
        <>
          <div className="menu-bar">
            <div className="control-bar">
              <div className="control-bar_up">
                <div className="control-bar-up-right">
                  <SelectControl
                    style={{ width: 120 }}
                    onChange={handleChange}
                    value={Math.round(scale * 100) + "%"}
                  >
                    <Option value={50}>50%</Option>
                    <Option value={100}>100%</Option>
                    <Option value={150}>150%</Option>
                    <Option value={200}>200%</Option>
                  </SelectControl>
                  <ButtonControl onClick={zoomIn}>
                    <AiOutlineZoomIn />
                  </ButtonControl>
                  <ButtonControl onClick={zoomOut}>
                    <AiOutlineZoomOut />
                  </ButtonControl>
                  <UploadPdf {...uploadProps}>
                    <ButtonUpload icon={<UploadOutlined />}>
                      Click to Upload
                    </ButtonUpload>
                  </UploadPdf>
                </div>

                <div className="control-bar-up-left">
                  <PagePerToTal>
                    <p style={transformP}>
                      {"Page: " + numPageCurrent + "/" + numPages}
                    </p>
                  </PagePerToTal>
                  <ButtonControl>
                    <AiOutlineCompress onClick={zoomFullScreen} />
                  </ButtonControl>
                  <ButtonControl onClick={saveCanvas}>
                    <AiOutlineSave />
                  </ButtonControl>
                  <ButtonControl onClick={download}>
                    <AiOutlineDownload />
                  </ButtonControl>
                </div>
              </div>
              <div className="control-bar_down">
                <Radio.Group
                  onChange={handleChangeDrawType}
                  defaultValue="drawFree"
                >
                  <RadioButtonControl value="drawFree">
                    <IoBrushOutline />
                  </RadioButtonControl>
                  <RadioButtonControl value="drawRect">
                    <IoSquareOutline />
                  </RadioButtonControl>
                  <RadioButtonControl value="drawCircle">
                    <RiCheckboxBlankCircleLine />
                  </RadioButtonControl>
                  <RadioButtonControl value="drawTri">
                    <IoTriangleOutline style={{ fontWeight: "bold" }} />
                  </RadioButtonControl>
                  <RadioButtonControl value="drawLine">
                    <BsSlash style={{ fontWeight: "bold" }} />
                  </RadioButtonControl>
                  <RadioButtonControl value="eraser">
                    <RiEraserLine style={{ fontWeight: "bold" }} />
                  </RadioButtonControl>
                  <RadioButtonControl onClick={handleTextMode} value="drawText">
                    <AiOutlineFontSize style={{ fontWeight: "bold" }} />
                  </RadioButtonControl>
                </Radio.Group>

                <ButtonPicker
                  onClick={showModal}
                  style={{
                    color: `rgba(${colorR},${colorG},${colorB},${opacity})`,
                    background: `rgba(${colorR},${colorG},${colorB},${opacity})`,
                  }}
                >
                  <span></span>
                </ButtonPicker>
                <ModalControl
                  title="SelectColor"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  zIndex={9999}
                >
                  {/* <SketchPicker
                    value={`rgba(${colorR},${colorG},${colorB},${opacity})`}
                    onChange={(clr) => handleChangeColor(clr)}
                  ></SketchPicker> */}
                  <CirclePicker
                    colors={[
                      "#f44336",
                      "#e91e63",
                      "#9c27b0",
                      "#673ab7",
                      "#3f51b5",
                      "#2196f3",
                      "#03a9f4",
                      "#00bcd4",
                      "#009688",
                      "#4caf50",
                      "#cddc39",
                      "#ffeb3b",
                      "#ffc107",
                      "#ff9800",
                      "#ff5722",
                      "#795548",
                      "#607d8b",
                      "#000000",
                    ]}
                    value={`rgba(${colorR},${colorG},${colorB},${opacity})`}
                    onChange={(clr) => handleChangeColor(clr)}
                  ></CirclePicker>
                  <SliderControl>
                    {typeDraw === "drawFree" ? null : (
                      <Row style={{ paddingBottom: "5px" }}>
                        <Col span={6}>
                          <Title level={5} style={{ color: "#909396" }}>
                            Opacity
                          </Title>
                        </Col>
                        <Col span={12}>
                          <Slider
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={handleChangeOpacity}
                            value={colorOpacityState}
                          />
                        </Col>
                        <Col span={2}>
                          <InputNumber
                            min={1}
                            max={20}
                            style={{ margin: "0 16px", width: "50px" }}
                            value={colorOpacityState}
                            onChange={handleChangeOpacity}
                          />
                        </Col>
                      </Row>
                    )}
                    <Row>
                      <Col span={6}>
                        <Title level={5} style={{ color: "#909396" }}>
                          Size
                        </Title>
                      </Col>
                      <Col span={12}>
                        <Slider
                          min={1}
                          max={30}
                          value={lineWidth}
                          style={{ width: "120px" }}
                          onChange={(value) => reLineWidth(value)}
                        />
                      </Col>
                      <Col span={2}>
                        <InputNumber
                          min={1}
                          max={20}
                          style={{ margin: "0 16px", width: "50px" }}
                          value={lineWidth}
                          onChange={(value) => reLineWidth(value)}
                        />
                      </Col>
                    </Row>
                  </SliderControl>
                </ModalControl>
                <ButtonControl onClick={undo}>
                  <AiOutlineUndo style={{ fontWeight: "bold" }} />
                </ButtonControl>
                <ButtonControl onClick={redo}>
                  <AiOutlineRedo style={{ fontWeight: "bold" }} />
                </ButtonControl>
                {/* <DropdownControl overlay={menu}>
                    <ClearOutlined />
                </DropdownControl> */}
                <ButtonControl onClick={handleClearAll}>
                  <AiOutlineClear />
                </ButtonControl>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2 style={{ textAlign: "center", fontSize: "40px" }}>
          <Spin size="large" />
        </h2>
      )}
    </>
  );
};

export default AppControl;
