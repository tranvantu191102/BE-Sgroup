function validate(req, res, next) {
  const { fullname, gender, age } = req.body;

  if (!fullname || !gender || !age) {
    return res.status(400).json({
      message: "Missing input",
    });
  }
  const regexName =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  const regexChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  if (!regexName.test(fullname) || regexChar.test(fullname)) {
    return res.status(400).json({
      message: "Name is wrong",
    });
  }

  if (+age <= 0) {
    return res.status(400).json({
      message: "Age is wrong",
    });
  }
  next();
}

module.exports = {
  validate,
};
