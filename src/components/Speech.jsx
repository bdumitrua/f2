import { useEffect, useState } from "react";

const Speech = () => {
    const input =
        "block text-xl mt-3 mb-6 w-full px-5 py-2 rounded-lg border-black border-2 outline-0";

    const [height, setHeight] = useState(0);
    const [age, setAge] = useState(0);
    const [type, setType] = useState("");
    const [treeState, setTreeState] = useState("");
    const [total, setTotal] = useState("");
    const [saidWord, setSaidWord] = useState([]);

    const [startRec, setStartRec] = useState(false);
    const [fieldId, setFieldId] = useState("");
    const [fieldText, setFieldText] = useState("");
    const [fieldType, setFieldType] = useState("");

    const [id, setId] = useState(1);

    const keyWords = ["высота", "возраст", "вид", "состояние", "вывод"];

    let allInputs = document.getElementsByTagName("input");
    let recognition = new window.webkitSpeechRecognition();

    // Настройки
    recognition.lang = "ru-RU";
    recognition.maxAlternatives = 1;
    recognition.continuous = true;
    recognition.interimResults = false;

    const clickHandler = () => {
        if (startRec === false) {
            setStartRec(true);
        } else if (startRec === true) {
            setStartRec(false);
            recognition.stop();
        }
    };

    useEffect(() => {
        if (startRec === false) {
            recognition.stop();
        } else if (startRec === true) {
            recognition.start();
        }
    }, [startRec]);

    useEffect(() => {
        if (fieldId && fieldText) {
            if (fieldType == "text") {
                let res = saidWord.filter((word) => {
                    if (keyWords.indexOf(word) == -1) {
                        return word;
                    }
                });

                if (
                    document.getElementById(`${fieldId}`).dataset.word === "вид"
                ) {
                    setType(res.join(" "));
                    setFieldId("");
                    return;
                } else if (
                    document.getElementById(`${fieldId}`).dataset.word ===
                    "состояние"
                ) {
                    setTreeState(res.join(" "));
                    setFieldId("");
                    return;
                } else if (
                    document.getElementById(`${fieldId}`).dataset.word ===
                    "вывод"
                ) {
                    setTotal(res.join(" "));
                    setFieldId("");
                    return;
                } else if (
                    document.getElementById(`${fieldId}`).dataset.word ===
                    "высота"
                ) {
                    setHeight(res.join(" "));
                    setFieldId("");
                    return;
                } else if (
                    document.getElementById(`${fieldId}`).dataset.word ===
                    "возраст"
                ) {
                    setAge(res.join(" "));
                    setFieldId("");
                    return;
                }
            }
        }
    }, [fieldText]);

    useEffect(() => {
        console.log(saidWord);

        if (!fieldId) {
            saidWord.forEach((word) => {
                if (keyWords.indexOf(word) != -1) {
                    for (let input of allInputs) {
                        if (input.dataset.word === word) {
                            setFieldId(input.id);
                            setFieldType(input.type);
                        }
                    }
                }
            });

            if (saidWord.join(" ").indexOf("отправить") != -1) {
                recognition.stop();
                postData();
                console.log("\nЯ отправил отчёт \n");
            }
            if (saidWord.join(" ").indexOf("прошлый") != -1) {
                getPrevious();
                console.log("\nЯ взял данные из прошлого отчёта \n");
            }
        } else if (fieldId) {
            setFieldText(saidWord);
        }
    }, [saidWord]);

    const speakHandler = (event) => {
        let resultsLength = event.results.length - 1;
        let ArrayLength = event.results[resultsLength].length - 1;

        setSaidWord(
            event.results[resultsLength][ArrayLength].transcript
                .toLowerCase()
                .trim()
                .split(" ")
        );
    };

    recognition.onresult = (e) => {
        speakHandler(e);
    };

    recognition.onerror = function (e) {
        console.log("error:", e);
    };

    const getId = async () => {
        let res = await fetch("http://localhost:4444/id");
        if (res.ok) {
            let json = await res.json();
            setId(json["id"]);
        }
    };
    const getPrevious = async () => {
        let res = await fetch("http://localhost:4444/previous");
        if (res.ok) {
            let json = await res.json();
            setId(json["id"] + 1);
            setHeight(json["height"]);
            setAge(json["age"]);
            setType(json["type"]);
            setTreeState(json["state"]);
            setTotal(json["totalInfo"]);
        }
    };
    const postData = async () => {
        const data = {
            id: id,
            height: height,
            age: age,
            type: type,
            state: treeState,
            totalInfo: total,
        };

        const json = JSON.stringify(data);

        const response = await fetch("http://localhost:4444/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Request-Method": "*",
                "Access-Control-Request-Headers":
                    "Origin, X-Requested-With, Content-Type, Accept",
            },
            body: json,
        });

        for (let input of allInputs) {
            input.value = "";
        }

        document.getElementById("treeId").value = id + 1;
    };

    useEffect(() => {
        getId();
    }, []);

    return (
        <section className="speech mt-8">
            <div className="container">
                <h1 className="text-center text-3xl mb-8">Ввод данных</h1>
                <form action="" className="flex flex-col items-center">
                    <label htmlFor="treeId" className="text-xl">
                        Номер
                    </label>
                    <input
                        className={input}
                        id="treeId"
                        type="number"
                        data-word="номер"
                        required
                        readOnly
                        value={id}
                        onChange={(event) => {
                            setId(event.target.value);
                        }}
                    />
                    <label htmlFor="treeHeight" className="text-xl">
                        Высота
                    </label>
                    <input
                        className={input}
                        id="treeHeight"
                        type="text"
                        data-word="высота"
                        required
                        value={height}
                        onChange={(event) => {
                            setHeight(event.target.value);
                        }}
                    />
                    <label htmlFor="treeAge" className="text-xl">
                        Возраст
                    </label>
                    <input
                        value={age}
                        className={input}
                        id="treeAge"
                        type="text"
                        data-word="возраст"
                        required
                        onChange={(event) => {
                            setAge(event.target.value);
                        }}
                    />
                    <label htmlFor="treeType" className="text-xl">
                        Вид
                    </label>
                    <input
                        value={type}
                        className={input}
                        id="treeType"
                        type="text"
                        data-word="вид"
                        required
                        onChange={(event) => {
                            setType(event.target.value);
                        }}
                    />
                    <label htmlFor="treeState" className="text-xl">
                        Состояние
                    </label>
                    <input
                        value={treeState}
                        className={input}
                        id="treeState"
                        type="text"
                        data-word="состояние"
                        required
                        onChange={(event) => {
                            setTreeState(event.target.value);
                        }}
                    />
                    <label htmlFor="treeTotal" className="text-xl">
                        Вывод
                    </label>
                    <input
                        value={total}
                        className={input}
                        id="treeTotal"
                        type="text"
                        data-word="вывод"
                        required
                        onChange={(event) => {
                            setTotal(event.target.value);
                        }}
                    />
                </form>
                <div className="w-full flex items-center justify-center">
                    <button
                        onClick={clickHandler}
                        className={`${
                            startRec === false ? "bg-green-500" : "bg-red-600"
                        } w-3/4 rounded-lg border-white border-2 py-3 text-white`}
                    >
                        {startRec === false
                            ? "Включить микрофон"
                            : "Выключить микрофон"}
                    </button>
                </div>
                <div className="w-full flex items-center justify-center">
                    <button
                        onClick={postData}
                        className={`bg-blue-600 mt-3 w-3/4 rounded-lg border-white border-2 py-3 text-white`}
                    >
                        Отправить отчёт
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Speech;
