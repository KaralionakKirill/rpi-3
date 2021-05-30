import {
    useEffect,
    useState,
    useRef
} from "react";

export default function DBLoader(jsonFile) {
    const [
        loaded,
        setLoaded
    ] = useState(false);
    const dbData = useRef(null);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + "/db/" + jsonFile)
            .then(res => res.json())
            .then(dat => {
                if (dat === undefined) throw new Error(jsonFile + " not found");
                if (!dat.hasOwnProperty("data")) throw new Error("Invalid file format " + jsonFile);
                dbData.current = dat.data;
                setLoaded(true);
            });
    }, [loaded, setLoaded, jsonFile]);

    function search(key = "", value = "", exact = false) {
        if (value === "") return dbData.current;
        let res = [];
        if (dbData.current !== null) {
            dbData.current.forEach(el => {
                let val = getKeyRecursive(el, key);
                if (val !== null) {
                    if ((exact === true && val === value) || (exact === false && val.toLowerCase().indexOf(value.toLowerCase()) !== -1)) {
                        res.push(el);
                    }
                }
            });
        }
        return res;
    }

    function getKeyRecursive(element, key) {
        let keys = key.split('.');
        let temp = element;
        keys.forEach(sub => {
            if (temp.hasOwnProperty(sub)) {
                temp = temp[sub];
            } else {
                temp = null;
                return;
            }
        });
        return temp;
    }

    return [loaded, search];
}