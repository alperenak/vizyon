import React, { useContext, useEffect, useState } from "react";
import styles from "./docs.module.scss";
import {
  Folder,
  FolderImages,
  Trash,
  Txt,
  ArrowLeftSolid,
  Right,
} from "../../icons";
import { StorageContext } from "../../context/storageContext";
import { GetStorage, GetToken, IsAuth } from "../../actions/action";
import Loading from "../../components/Loading/loading";

export default function Docs() {
  const [order, setOrder] = useState(0);
  const [folderName, setFolderName] = useState("");
  const [history, setHistory] = useState([{ order: 0, folderName: "" }]);
  const [storageData, setStorageData] = useContext(StorageContext);
  const data = getData(order, folderName);
  const token = GetToken();
  console.log("storage", storageData ? storageData.data.data.length : "");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (IsAuth(token)) {
      if (!storageData) {
        setLoading(true);
        GetStorage(token)
          .then((data) => {
            setStorageData(data);
          })
          .then(() => setLoading(false))
          .catch((e) => window.location.reload());
      }
    } else {
      window.location.replace("/");
    }
  }, [storageData]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {storageData &&
          storageData.length !== 0 &&
          storageData !== null &&
          storageData.data.data &&
          storageData.data.data !== null &&
          storageData.data.data.length !== 0 ? (
            <div className={styles.docs}>
              <div className={styles.docsContainer}>
                <div className={styles.title}>Dosyalarım</div>
                {order !== 0 ? (
                  <div className={styles.topBar}>
                    <ArrowLeftSolid
                      className={styles.backIcon}
                      onClick={() => {
                        const data = history[history.length - 2];
                        setOrder(data.order);
                        if (data.folderName) {
                          setFolderName(data.folderName);
                        }
                        let arr = history;
                        arr.pop();
                        setHistory(arr);
                      }}
                    />
                    {history.slice(1).map((item) => {
                      return (
                        <div className={styles.path}>
                          <Right className={styles.rightIcon} />{" "}
                          {item.folderName}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
                <div className={styles.DocsGrid}>
                  {data.map((item, index) => {
                    return (
                      <div
                        onClick={() => {
                          setOrder(order + 1);
                          setFolderName(item);
                          setHistory([
                            ...history,
                            {
                              folderName: item,
                              order: order + 1,
                            },
                          ]);
                        }}
                        className={styles.renderDocs}
                      >
                        {item.includes(".txt") ? (
                          <RenderIcon
                            iconName={"txt"}
                            className={styles.icon}
                          />
                        ) : (
                          <RenderIcon
                            iconName={"normal"}
                            className={styles.icon}
                          />
                        )}

                        <div className={styles.DocsName}>{item}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div>data yok</div>
          )}
        </>
      )}
    </>
  );
}

function RenderIcon(props) {
  let { iconName } = props;
  if (iconName === "normal") return <Folder {...props} />;
  else if (iconName === "images") return <FolderImages {...props} />;
  else if (iconName === "trash") return <Trash {...props} />;
  else if (iconName === "txt") return <Txt {...props} />;
}

function getData(order, docName) {
  let data = fakeDocsData;
  let arr = [];

  if (order - 1 >= 0) {
    data = fakeDocsData.filter((item) => {
      return item.pathAsArray[order - 1] === docName;
    });
    console.log("sondata", data);
  }
  data.map((item) => {
    arr.push(item.pathAsArray[order]);
  });

  arr = arr.filter((item, index) => {
    return arr.indexOf(item) === index;
  });
  arr = arr.filter((item, index) => {
    return item !== undefined;
  });
  return arr;
}
const fakeDocsData = [
  {
    id: "5f6915d01ccf86464f3633fd//testRenamed.txt/1600866381859113",
    pathAsArray: ["", "testRenamed.txt"],
    path: "/testRenamed.txt",
    name: "testRenamed.txt",
    size: "1061",
  },
  {
    id:
      "5f6915d01ccf86464f3633fd/folder1Renamed/folder1Renamed/folder1Renamed/folder2/folder3/test.txt/1600871686127780",
    pathAsArray: [
      "folder1Renamed",
      "folder1Renamed",
      "folder1Renamed",
      "folder2",
      "folder3",
      "test.txt",
    ],
    path:
      "folder1Renamed/folder1Renamed/folder1Renamed/folder2/folder3/test.txt",
    name: "test.txt",
    size: "1061",
  },
  {
    id:
      "5f6915d01ccf86464f3633fd/folder1Renamed/folder1Renamed/folder1Renamed/folder2/test2.txt/1600871687430831",
    pathAsArray: [
      "folder1Renamed",
      "folder1Renamed",
      "folder1Renamed",
      "folder2",
      "test2.txt",
    ],
    path: "folder1Renamed/folder1Renamed/folder1Renamed/folder2/test2.txt",
    name: "test2.txt",
    size: "1061",
  },
  {
    id:
      "5f6915d01ccf86464f3633fd/folder1Renamed/folder1Renamed/folder1Renamed/folder2/testRenamed.txt/1600871689225040",
    pathAsArray: [
      "folder1Renamed",
      "folder1Renamed",
      "folder1Renamed",
      "folder2",
      "testRenamed.txt",
    ],
    path:
      "folder1Renamed/folder1Renamed/folder1Renamed/folder2/testRenamed.txt",
    name: "testRenamed.txt",
    size: "7",
  },
  {
    id: null,
    pathAsArray: ["folder1Renamed", "folder1Renamed", "folder1Renamed"],
    path: "folder1Renamed/folder1Renamed/folder1Renamed/",
    name: null,
    size: 0,
  },
  {
    id:
      "5f6915d01ccf86464f3633fd/folder1Renamed/folder1Renamed/folder1Renamed/test2.txt/1600871692279103",
    pathAsArray: [
      "folder1Renamed",
      "folder1Renamed",
      "folder1Renamed",
      "test2.txt",
    ],
    path: "folder1Renamed/folder1Renamed/folder1Renamed/test2.txt",
    name: "test2.txt",
    size: "221",
  },
  {
    id:
      "5f6915d01ccf86464f3633fd/folder1Renamed/folder1Renamed/folder1Renamed/test4.txt/1600871693832180",
    pathAsArray: [
      "folder1Renamed",
      "folder1Renamed",
      "folder1Renamed",
      "test4.txt",
    ],
    path: "folder1Renamed/folder1Renamed/folder1Renamed/test4.txt",
    name: "test4.txt",
    size: "221",
  },
  {
    id: "5f6915d01ccf86464f3633fd/testRenamed.txt/1600866783023079",
    pathAsArray: ["testRenamed.txt"],
    path: "testRenamed.txt",
    name: "testRenamed.txt",
    size: "1061",
  },
];
