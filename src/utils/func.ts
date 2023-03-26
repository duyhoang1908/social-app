export const TimeSince = (date: any) => {
  let milisecondsSum = Date.now() - date;

  let seconds = 1000;
  let minutes = 1000 * 60;
  let hours = 1000 * 60 * 60;
  let days = 1000 * 60 * 60 * 24;
  let months = 1000 * 60 * 60 * 24 * 30;
  let years = 1000 * 60 * 60 * 24 * 30 * 12;

  if (milisecondsSum < minutes) {
    return Math.floor(milisecondsSum / seconds) + " giây";
  } else if (milisecondsSum < hours) {
    return Math.floor(milisecondsSum / minutes) + " phút";
  } else if (milisecondsSum < days) {
    return Math.floor(milisecondsSum / hours) + " giờ";
  } else if (milisecondsSum < months) {
    return Math.floor(milisecondsSum / days) + " ngày";
  } else if (milisecondsSum < years) {
    return Math.floor(milisecondsSum / months) + " tháng";
  } else {
    return Math.floor(milisecondsSum / years) + " năm";
  }
};

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName: string) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName
    .toLowerCase()
    .split(" ")
    .filter((word) => word);

  const length = name.length;
  let flagArray: any[];
  flagArray = [];
  let result: any[];
  result = [];
  let stringArray: any[];
  stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name: any) => {
    let arrName: any[];
    arrName = [];
    let curName = "";
    name.split("").forEach((letter: any) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k: any) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(" "));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
