export const email = (email) => {
  return new Promise((resolve, reject) => {
    const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const flag = regx.test(email);
    if (flag) {
      resolve(true);
    } else {
      reject({ msg: "Email invalid" });
    }
  });
};

export const password = (password) => {
  return new Promise((resolve, reject) => {
    const regx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const flag = regx.test(password);
    if (flag) {
      resolve(true);
    } else {
      reject({ msg: "Password invalid" });
    }
  });
};

export const nullValidation = (type, field) => {
  return new Promise((resolve, reject) => {
    if (field.length>0) {
      resolve(true);
    } else {
      reject({ msg: `${type} is empty` });
    }
  });
};
