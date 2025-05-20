import Joi from "joi";

export class ValidateMiddleware {
  static validateId = async (req, res, next) => {
    try {
      const schema = Joi.object({
        id: Joi.string() // Kiểm tra id là số
          .pattern(/^[0-9]+$/)
          .required()
          .messages({
            "string.int": "ID phải là số nguyên hợp lệ",
            "any.required": "ID là bắt buộc"
          })
      });

      await schema.validateAsync(req.params);
      next();
    } catch (error) {
      const errors = error.details.map((err) => ({
        field: err.context.key,
        message: err.message
      }));
      console.log(errors);
      return res.status(400).json({ errors });
    }
  };

  // Validate dữ liệu khi tạo user mới
  static validateCreateUser = async (req, res, next) => {
    try {
      const schema = Joi.object({
        password: Joi.string()
          .min(8)
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
          .required()
          .messages({
            "string.min": "Mật khẩu phải có ít nhất 8 ký tự",
            "string.pattern.base":
              "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số",
            "any.required": "Mật khẩu là bắt buộc"
          }),

        email: Joi.string()
          .email()
          .required()
          .messages({
            "string.email": "Email không hợp lệ",
            "any.required": "Email là bắt buộc"
          })
      });

      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.details.map((err) => ({
        field: err.context.key,
        message: err.message
      }));
      console.log(errors);
      return res.status(400).json({ errors });
    }
  };

  // Validate dữ liệu khi cập nhật user
  static validateUpdateUser = async (req, res, next) => {
    try {
      const schema = Joi.object({
        password: Joi.string()
          .min(8)
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),

        email: Joi.string().email()
      }).min(1);

      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.details.map((err) => ({
        field: err.context.key,
        message: err.message
      }));
      console.log(errors);
      return res.status(400).json({ errors });
    }
  };

  // Validate tạo product mới
  static validateCreateProduct = async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string()
          .min(3)
          .max(30)
          .required()
          .messages({
            "string.min": "Tên sản phẩm phải có ít nhất 3 ký tự",
            "string.max": "Tên sản phẩm không quá 30 ký tự",
            "any.required": "Tên sản phẩm là bắt buộc"
          }),
        price: Joi.number()
          .positive()
          .required()
          .messages({
            "number.positive": "Giá sản phẩm phải là số dương",
            "any.required": "Giá sản phẩm là bắt buộc"
          }),
        quantity: Joi.number()
          .integer()
          .min(0)
          .required()
          .messages({
            "number.integer": "Số lượng sản phẩm phải là số nguyên",
            "number.min": "Số lượng sản phẩm không được âm",
            "any.required": "Số lượng sản phẩm là bắt buộc"
          }),
        description: Joi.string()
          .max(500)
          .messages({
            "string.max": "Mô tả sản phẩm không quá 500 ký tự"
          }),
        supplier: Joi.string()
        .max(100)
        .messages({
          "string.max": "Nhà cung cấp không quá 100 ký tự"
        })
      });
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.details.map((err) => ({
        field: err.context.key,
        message: err.message
      }));
      console.log(errors);
      return res.status(400).json({ errors });
    }
  };

  // Validate cập nhật product
  static validateUpdateProduct = async (req, res, next) => {
    try {
      const schema = Joi.object({
        name: Joi.string()
          .min(3)
          .max(30)
          .messages({
            "string.min": "Tên sản phẩm phải có ít nhất 3 ký tự",
            "string.max": "Tên sản phẩm không quá 30 ký tự"
          }),
        price: Joi.number()
          .positive()
          .messages({
            "number.positive": "Giá sản phẩm phải là số dương"
          }),
        quantity: Joi.number()
          .integer()
          .min(0)
          .messages({
            "number.integer": "Số lượng sản phẩm phải là số nguyên",
            "number.min": "Số lượng sản phẩm không được âm"
          }),
        description: Joi.string()
          .max(500)
          .messages({
            "string.max": "Mô tả sản phẩm không quá 500 ký tự"
          }),
        supplier: Joi.string()
          .max(100)
          .messages({
            "string.max": "Nhà cung cấp không quá 100 ký tự"
          }),
        createdAt: Joi.date().optional()
          .messages({
            "date.base": "Ngày tạo không hợp lệ"
          }),
        updatedAt: Joi.date().optional()
          .messages({
            "date.base": "Ngày cập nhật không hợp lệ"
          }),
      }).min(1);

      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const errors = error.details.map((err) => ({
        field: err.context.key,
        message: err.message
      }));
      console.log(errors);
      return res.status(400).json({ errors });
    }
  };
}