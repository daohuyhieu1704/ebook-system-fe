let timeout;

let today = new Date();

export const debounce = (fn, delay) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    fn();
  }, delay);
};

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

export const convertDate = (str) => {
  const [dateComponents, timeComponents] = str.split(" ");
  const [day, month, year] = dateComponents.split("/");
  const [hours, minutes, seconds] = timeComponents.split(":");
  return Math.trunc(
    (today.getTime() -
      new Date(+year, +month - 1, +day, +hours, +minutes, +seconds).getTime()) /
      (1000 * 3600 * 24)
  );
};

export function formatFile(file) {
  const { originFileObj } = file;
  let clone;
  try {
    clone = new File([originFileObj], originFileObj.name.replaceAll(" ", "_"), {
      type: originFileObj.type,
    });
  } catch (e) {
    clone = new Blob([originFileObj], {
      type: originFileObj.type,
    });
    clone.name = originFileObj.name;
    clone.lastModifiedDate = new Date();
    clone.lastModified = new Date().getTime();
  }
  clone.uid = originFileObj.uid;
  return clone;
}
